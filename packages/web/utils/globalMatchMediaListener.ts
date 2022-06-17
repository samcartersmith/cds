import { NoopFn } from '@cbhq/cds-common/types/Helpers';

import { getBrowserGlobals } from './browser';

const callbackByQueryMap: Map<string, Set<NoopFn>> = new Map();
const listenerByQueryMap: Map<string, NoopFn> = new Map();

// Registers a global event listener only once per media query
export function addMatchMediaListener(deviceQuery: string, cb: NoopFn) {
  // Adds the callback associated with the device query to the set
  const set: Set<NoopFn> = callbackByQueryMap.get(deviceQuery) ?? new Set();
  set.add(cb);
  callbackByQueryMap.set(deviceQuery, set);

  // if we don't have a global listener for device query then we can set it up
  if (!listenerByQueryMap.has(deviceQuery)) {
    // creates an event handler that fires all the callbacks associated with the query
    const listenerByQuery = () => {
      for (const fn of Array.from(callbackByQueryMap.get(deviceQuery) as Set<NoopFn>)) {
        fn();
      }
    };
    listenerByQueryMap.set(deviceQuery, listenerByQuery);
    // attach a single listener per query, and assign a single callback with will fire all callbacks associated with that query
    getBrowserGlobals()
      ?.window.matchMedia(deviceQuery)
      ?.addEventListener('change', listenerByQuery);
  }
}

export function removeMatchMediaListener(deviceQuery: string, cb: NoopFn) {
  // find key of map for device query
  const set: Set<NoopFn> = callbackByQueryMap.get(deviceQuery) ?? new Set();
  // remove callback from the device query map
  if (set.has(cb)) {
    set.delete(cb);
  }

  // If there are no callbacks left we can remove global media query listener
  if (set.size === 0) {
    if (listenerByQueryMap.has(deviceQuery)) {
      getBrowserGlobals()
        ?.window.matchMedia(deviceQuery)
        ?.removeEventListener('change', listenerByQueryMap.get(deviceQuery) as NoopFn);
      listenerByQueryMap.delete(deviceQuery);
    }
  }
}
