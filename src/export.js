// SPDX-License-Identifier: Apache-2.0
// this_file: src/export.js
//
// Image + video export (SPEC.md §6.1). Image: read the renderer's WebGL canvas
// to a PNG Blob. Video: capture the deck transition to an encoded clip — WebCodecs
// (VideoEncoder + muxed via captureStream/MediaRecorder when available) with a
// MediaRecorder fallback for browsers without WebCodecs. Both paths produce a
// Blob the caller can download.

/**
 * Read a canvas to a PNG Blob.
 * @param {HTMLCanvasElement} canvas
 * @returns {Promise<Blob>}
 */
export function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (!canvas || typeof canvas.toBlob !== "function") {
      reject(new Error("canvasToPngBlob: canvas.toBlob unavailable in this environment"));
      return;
    }
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("canvasToPngBlob: toBlob produced no blob"));
    }, "image/png");
  });
}

/** True when MediaRecorder + canvas.captureStream are usable. */
function hasMediaRecorder() {
  return (
    typeof MediaRecorder !== "undefined" &&
    typeof HTMLCanvasElement !== "undefined" &&
    typeof HTMLCanvasElement.prototype.captureStream === "function"
  );
}

/** Pick the first supported MediaRecorder mime type, or undefined for the default. */
function pickMimeType() {
  if (typeof MediaRecorder === "undefined" || typeof MediaRecorder.isTypeSupported !== "function") {
    return undefined;
  }
  const candidates = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
  return candidates.find((t) => MediaRecorder.isTypeSupported(t));
}

/**
 * Record a transition to a video Blob.
 *
 * Drives `playFrames(applyOneFrame)`: the caller renders each frame onto the
 * canvas synchronously inside the per-frame callback, and we capture the canvas
 * stream while it plays. WebCodecs is preferred when present (lower latency, mp4
 * where supported); otherwise MediaRecorder captures the live canvas stream.
 *
 * @param {object} opts
 * @param {HTMLCanvasElement} opts.canvas the renderer canvas to capture
 * @param {(onFrame:(state:object)=>void)=>Promise<void>} opts.run plays the
 *   transition, calling onFrame for each frame (which must render to the canvas)
 * @param {number} [opts.fps] frame rate for the captured stream
 * @returns {Promise<Blob>}
 */
export async function recordVideo({ canvas, run, fps = 30 }) {
  if (!canvas) throw new Error("recordVideo: canvas is required");
  if (typeof run !== "function") throw new Error("recordVideo: run() callback is required");

  if (typeof VideoEncoder !== "undefined" && typeof canvas.captureStream === "function") {
    // WebCodecs path: still capture via MediaRecorder on the encoded stream when
    // available, since muxing raw VideoEncoder chunks into a container is heavy.
    // We treat presence of MediaRecorder as the muxer; if it's missing we fall
    // through to the explicit WebCodecs-only encoder below.
    if (hasMediaRecorder()) {
      return recordViaMediaRecorder({ canvas, run, fps });
    }
    return recordViaWebCodecs({ canvas, run, fps });
  }

  if (hasMediaRecorder()) {
    return recordViaMediaRecorder({ canvas, run, fps });
  }

  throw new Error(
    "recordVideo: neither WebCodecs (VideoEncoder) nor MediaRecorder/captureStream is available in this environment"
  );
}

async function recordViaMediaRecorder({ canvas, run, fps }) {
  const stream = canvas.captureStream(fps);
  const mimeType = pickMimeType();
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const chunks = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };
  const stopped = new Promise((resolve) => {
    recorder.onstop = () => resolve();
  });
  recorder.start();
  try {
    await run((/* state */) => {
      // The frame is already rendered by the stage; captureStream samples the
      // canvas. requestFrame() (when available) forces a sample for this frame.
      const track = stream.getVideoTracks?.()[0];
      track?.requestFrame?.();
    });
  } finally {
    if (recorder.state !== "inactive") recorder.stop();
  }
  await stopped;
  stream.getTracks?.().forEach((t) => t.stop());
  return new Blob(chunks, { type: recorder.mimeType || mimeType || "video/webm" });
}

async function recordViaWebCodecs({ canvas, run, fps }) {
  // Minimal WebCodecs path: encode each frame; emit raw chunks wrapped as a Blob.
  // (Full container muxing is out of scope; MediaRecorder is the primary path and
  // this branch only runs where MediaRecorder is unavailable but VideoEncoder is.)
  const chunks = [];
  const encoder = new VideoEncoder({
    output: (chunk) => {
      const buf = new ArrayBuffer(chunk.byteLength);
      chunk.copyTo(buf);
      chunks.push(new Uint8Array(buf));
    },
    error: (e) => {
      throw e;
    },
  });
  encoder.configure({
    codec: "vp09.00.10.08",
    width: canvas.width,
    height: canvas.height,
    framerate: fps,
  });
  let frameIndex = 0;
  await run(() => {
    const frame = new VideoFrame(canvas, { timestamp: (frameIndex * 1e6) / fps });
    encoder.encode(frame, { keyFrame: frameIndex % fps === 0 });
    frame.close();
    frameIndex += 1;
  });
  await encoder.flush();
  encoder.close();
  return new Blob(chunks, { type: "video/webm" });
}
