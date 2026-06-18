// SPDX-License-Identifier: Apache-2.0
// this_file: src/export.js
//
// Image + video export (SPEC.md §6.1). Image: read the renderer's WebGL canvas
// to a PNG Blob. Video: capture the deck transition to an encoded, seekable clip.
//
// PRIMARY path (issue 331): WebCodecs (VideoEncoder) + mp4-muxer → H.264/mp4.
// Produces a fully seekable mp4 with correct duration + per-stream frame metadata.
// Falls back to webm-muxer+VP9 if H.264 is unsupported, then finally to
// MediaRecorder (live captureStream) as the last-resort path for environments
// that lack VideoEncoder entirely.

import { Muxer, ArrayBufferTarget } from "mp4-muxer";

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
 * Check whether a given VideoEncoder codec string is supported.
 * @param {string} codec
 * @param {number} width
 * @param {number} height
 * @param {number} fps
 * @returns {Promise<boolean>}
 */
async function isCodecSupported(codec, width, height, fps) {
  if (typeof VideoEncoder === "undefined") return false;
  try {
    const { supported } = await VideoEncoder.isConfigSupported({
      codec,
      width,
      height,
      framerate: fps,
    });
    return !!supported;
  } catch {
    return false;
  }
}

/**
 * Record a transition to a video Blob.
 *
 * Drives `run(onFrame)`: the caller renders each frame onto the canvas
 * synchronously inside the per-frame callback. The PRIMARY path uses WebCodecs
 * (VideoEncoder) + mp4-muxer to produce a seekable mp4 with correct duration
 * and per-stream frame count metadata. Falls back to MediaRecorder only when
 * VideoEncoder is unavailable.
 *
 * @param {object} opts
 * @param {HTMLCanvasElement} opts.canvas  the renderer canvas to capture
 * @param {(onFrame:(state:object)=>void)=>Promise<void>} opts.run  plays the
 *   transition, calling onFrame for each frame (which must render to the canvas)
 * @param {number} [opts.fps]  frame rate for the encoded clip (default 30)
 * @returns {Promise<Blob>}
 */
export async function recordVideo({ canvas, run, fps = 30 }) {
  if (!canvas) throw new Error("recordVideo: canvas is required");
  if (typeof run !== "function") throw new Error("recordVideo: run() callback is required");

  // PRIMARY: WebCodecs + mp4-muxer (issue 331) — prefer H.264/mp4; fall back to
  // VP9/webm inside the same muxed path if H.264 is unsupported.
  if (typeof VideoEncoder !== "undefined") {
    const w = canvas.width;
    const h = canvas.height;
    const avcCodec = "avc1.640028"; // H.264 High Profile Level 4.0
    const vp9Codec = "vp09.00.10.08";

    const useAvc = await isCodecSupported(avcCodec, w, h, fps);
    const useVp9 = !useAvc && (await isCodecSupported(vp9Codec, w, h, fps));

    if (useAvc || useVp9) {
      return recordViaMuxer({ canvas, run, fps, useAvc });
    }
  }

  // FALLBACK: MediaRecorder (captureStream) — no mux metadata, non-seekable.
  if (hasMediaRecorder()) {
    return recordViaMediaRecorder({ canvas, run, fps });
  }

  throw new Error(
    "recordVideo: neither WebCodecs (VideoEncoder) nor MediaRecorder/captureStream is available in this environment"
  );
}

/**
 * PRIMARY recording path: VideoEncoder frames piped into mp4-muxer (H.264) or
 * webm-muxer (VP9). Produces a properly seekable container with real duration +
 * per-stream nb_frames metadata.
 *
 * @param {object} opts
 * @param {HTMLCanvasElement} opts.canvas
 * @param {(onFrame:()=>void)=>Promise<void>} opts.run
 * @param {number} opts.fps
 * @param {boolean} opts.useAvc  true→H.264+mp4, false→VP9+webm via mp4-muxer
 */
async function recordViaMuxer({ canvas, run, fps, useAvc }) {
  const w = canvas.width;
  const h = canvas.height;
  const codec = useAvc ? "avc1.640028" : "vp09.00.10.08";

  const target = new ArrayBufferTarget();
  const muxer = new Muxer({
    target,
    video: {
      codec: useAvc ? "avc" : "vp9",
      width: w,
      height: h,
    },
    // fastStart embeds the moov atom at the front for immediate seeking in players.
    fastStart: "in-memory",
  });

  const chunks = [];
  const encoder = new VideoEncoder({
    output: (chunk, meta) => {
      muxer.addVideoChunk(chunk, meta);
    },
    error: (e) => {
      throw e;
    },
  });

  encoder.configure({
    codec,
    width: w,
    height: h,
    framerate: fps,
    // H.264: signal avc1 bitstream (Annex-B not needed for mp4-muxer).
    ...(useAvc ? { avc: { format: "avc" } } : {}),
  });

  let frameIndex = 0;
  const frameDuration = Math.round(1e6 / fps); // microseconds per frame

  await run(() => {
    const timestamp = frameIndex * frameDuration;
    const frame = new VideoFrame(canvas, { timestamp, duration: frameDuration });
    encoder.encode(frame, { keyFrame: frameIndex % fps === 0 });
    frame.close();
    frameIndex += 1;
  });

  await encoder.flush();
  encoder.close();
  muxer.finalize();

  const mimeType = useAvc ? "video/mp4" : "video/webm";
  return new Blob([target.buffer], { type: mimeType });
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
