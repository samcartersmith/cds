import { getBrowserGlobals } from './browser';
import { addMediaQueryListener, removeMediaQueryListener } from './mediaQueryListener';

type Callback = () => void;

const callbackByQueryMap: Map<string, Set<Callback>> = new Map();
const listenerByQueryMap: Map<string, Callback> = new Map();

// Registers a global event listener only once per media query
export function addMatchMediaListener(deviceQuery: string, cb: Callback) {
  // Adds the callback associated with the device query to the set
  const set: Set<Callback> = callbackByQueryMap.get(deviceQuery) ?? new Set();
  set.add(cb);
  callbackByQueryMap.set(deviceQuery, set);

  // if we don't have a global listener for device query then we can set it up
  if (!listenerByQueryMap.has(deviceQuery)) {
    // creates an event handler that fires all the callbacks associated with the query
    const listenerByQuery = () => {
      for (const fn of Array.from(callbackByQueryMap.get(deviceQuery) as Set<Callback>)) {
        fn();
      }
    };
    listenerByQueryMap.set(deviceQuery, listenerByQuery);
    // attach a single listener per query, and assign a single callback with will fire all callbacks associated with that query
    const mediaQuery = getBrowserGlobals()?.window.matchMedia(deviceQuery);
    addMediaQueryListener(mediaQuery, listenerByQuery);
  }
}

export function removeMatchMediaListener(deviceQuery: string, cb: Callback) {
  // find key of map for device query
  const set: Set<Callback> = callbackByQueryMap.get(deviceQuery) ?? new Set();
  // remove callback from the device query map
  if (set.has(cb)) {
    set.delete(cb);
  }

  // If there are no callbacks left we can remove global media query listener
  if (set.size === 0) {
    if (listenerByQueryMap.has(deviceQuery)) {
      const mediaQuery = getBrowserGlobals()?.window.matchMedia(deviceQuery);
      const handler = listenerByQueryMap.get(deviceQuery) as Callback;
      removeMediaQueryListener(mediaQuery, handler);
      listenerByQueryMap.delete(deviceQuery);
    }
  }
}
