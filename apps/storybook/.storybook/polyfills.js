/** POLYFILLS
 *
 *  NOTE: Please ensure any polyfill added here is well documented in our docs
 *  If we need to polyfill for percy, there's a good chance consumers will too.
 */

/** RESIZE OBSERVER
 *  @documentation We throw a console.error when ResizeObserver is unavailable (useDimensions.tsx)
 */
(async () => {
  if (!('ResizeObserver' in window)) {
    const module = await import('@juggle/resize-observer');
    window.ResizeObserver = module.ResizeObserver;
  }
})();
