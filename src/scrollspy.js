// SPDX-License-Identifier: Apache-2.0
// this_file: src/scrollspy.js
//
// Scroll-driven transition (SPEC.md §6.4). Maps scroll progress over a trigger
// region to transition progress [0,1]: IntersectionObserver activates the
// rAF/scroll loop only while the region is on screen, and computeScrollProgress
// turns the region's viewport rect into a [0,1] factor. Respects
// prefers-reduced-motion by snapping to the endpoints (no per-frame morph).
//
// computeScrollProgress is pure and exported for unit tests.

/**
 * Scroll progress [0,1] for a trigger region given its bounding-client rect and
 * the viewport height.
 *
 * Mapping (a common "scroll-through" model): progress is 0 while the top of the
 * region is at or below the bottom of the viewport, reaches 1 once the bottom of
 * the region has scrolled up to the top of the viewport, and lerps linearly in
 * between. This makes a tall trigger region drive the full morph as the user
 * scrolls past it.
 *
 * @param {{top:number, bottom:number, height:number}} rect getBoundingClientRect of the trigger
 * @param {number} viewportH window.innerHeight
 * @returns {number} progress in [0,1]
 */
export function computeScrollProgress(rect, viewportH) {
  const travel = rect.height + viewportH;
  if (travel <= 0) return 0;
  // distance scrolled = how far the region's top has moved above the viewport
  // bottom. At start top === viewportH (just below) → 0; at end bottom === 0
  // (just above) → travel.
  const scrolled = viewportH - rect.top;
  return Math.max(0, Math.min(1, scrolled / travel));
}

/** True when the OS/browser requests reduced motion. */
export function prefersReducedMotion() {
  if (typeof matchMedia !== "function") return false;
  try {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Drive a transition from scroll position over a trigger region.
 *
 * @param {object} opts
 * @param {Element} opts.trigger the region whose scroll-through drives progress
 * @param {(p:number)=>void} opts.onProgress called with progress [0,1] (already
 *   reduced-motion-aware: only endpoints when reduced motion is on)
 * @param {boolean} [opts.reducedMotion] override prefers-reduced-motion detection
 * @param {Window} [opts.win] injectable window (defaults to global window)
 * @returns {{disconnect:()=>void}} handle to stop observing
 */
export function attachScrollspy({ trigger, onProgress, reducedMotion, win } = {}) {
  if (!trigger) throw new Error("scrollspy: trigger element is required");
  if (typeof onProgress !== "function") throw new Error("scrollspy: onProgress callback is required");
  const w = win ?? (typeof window !== "undefined" ? window : undefined);
  if (!w) throw new Error("scrollspy: no window available");

  const reduced = reducedMotion ?? prefersReducedMotion();

  // Reduced motion: snap to the endpoints. We pick the endpoint by whether the
  // region's center has passed the middle of the viewport.
  const snap = () => {
    const rect = trigger.getBoundingClientRect();
    const p = computeScrollProgress(rect, w.innerHeight);
    onProgress(p < 0.5 ? 0 : 1);
  };

  if (reduced) {
    snap();
    const onScroll = () => snap();
    w.addEventListener("scroll", onScroll, { passive: true });
    w.addEventListener("resize", onScroll, { passive: true });
    return {
      disconnect() {
        w.removeEventListener("scroll", onScroll);
        w.removeEventListener("resize", onScroll);
      },
    };
  }

  let active = false;
  let rafHandle = null;
  let lastP = -1;

  const update = () => {
    rafHandle = null;
    const rect = trigger.getBoundingClientRect();
    const p = computeScrollProgress(rect, w.innerHeight);
    if (p !== lastP) {
      lastP = p;
      onProgress(p);
    }
  };

  const schedule = () => {
    if (rafHandle != null) return;
    rafHandle = (w.requestAnimationFrame ?? ((cb) => setTimeout(cb, 16)))(update);
  };

  const onScroll = () => {
    if (active) schedule();
  };

  // IntersectionObserver activates the scroll loop only while visible. When IO is
  // unavailable (older/headless contexts), fall back to always-active.
  let observer = null;
  if (typeof IntersectionObserver === "function") {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          active = entry.isIntersecting;
          if (active) schedule();
        }
      },
      { threshold: [0, 0.01, 0.99, 1] }
    );
    observer.observe(trigger);
  } else {
    active = true;
  }

  w.addEventListener("scroll", onScroll, { passive: true });
  w.addEventListener("resize", onScroll, { passive: true });
  // Prime the initial value.
  schedule();

  return {
    disconnect() {
      observer?.disconnect();
      w.removeEventListener("scroll", onScroll);
      w.removeEventListener("resize", onScroll);
      if (rafHandle != null) (w.cancelAnimationFrame ?? clearTimeout)(rafHandle);
    },
  };
}
