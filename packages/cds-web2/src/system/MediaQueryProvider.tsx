import React, { createContext, useState } from 'react';

import { media } from '../styles/media';
import { addMediaQueryListener, removeMediaQueryListener } from '../utils/mediaQueryListener';

/**
 * Creates a basic store for managing subscriptions to MediaQueryLists.  Useful for colocating all media query state to avoid issues with Suspense and partial hydration.
 *
 * First call `createMediaQueryStore()` at the module level, to create a single stable store reference. Then integrate with a context provider by calling `store.init()`, passing in options. The `store.init()` function should not be called again. It internally guards against re-initialization. Therefore it does not respond to changes in options.
 * @example ```
 * const mediaQueryStore = createMediaQueryStore()
 *
 * const MediaQueryProvider = ({ defaultValues }) => {
 *   // The store is never recreated or reinitialized.
 *   // It also guards against reinitialization internally.
 *   useState(() => store.init({ defaultValues }));
 *   return <MediaQueryContext.Provider value={store}>{children}</MediaQueryContext.Provider>
 * }
 * ```
 */
const createMediaQueryStore = () => {
  const mediaQueryLists: Record<string, MediaQueryList> = {};
  const subscribers: Record<string, (() => void)[]> = {};
  const defaultValues: Record<string, boolean> = {};
  let initialized = false;

  const init = (options: { defaultValues?: Record<string, boolean> }) => {
    if (initialized) return;
    initialized = true;
    if (options.defaultValues) Object.assign(defaultValues, options.defaultValues);
  };

  const getSnapshot = (query: string): boolean =>
    mediaQueryLists[query]?.matches ?? defaultValues[query] ?? false;

  const getServerSnapshot = (query: string): boolean => defaultValues[query] ?? false;

  const subscribe = (query: string, callback: () => void): (() => void) => {
    subscribers[query] ??= [];
    subscribers[query].push(callback);

    const handleChange = (query: string) => {
      subscribers[query]?.forEach((callback) => callback());
    };

    const listener = () => handleChange(query);

    if (!mediaQueryLists[query]) {
      mediaQueryLists[query] = window.matchMedia(query);
      addMediaQueryListener(mediaQueryLists[query], listener);
    }

    return () => {
      subscribers[query] = subscribers[query].filter((cb) => cb !== callback);
      if (subscribers[query]?.length === 0) {
        delete subscribers[query];
        removeMediaQueryListener(mediaQueryLists[query], listener);
        delete mediaQueryLists[query];
      }
    };
  };

  return {
    init,
    subscribe,
    getSnapshot,
    getServerSnapshot,
  };
};

export type MediaQueryContextValue = {
  subscribe: (query: string, callback: () => void) => () => void;
  getSnapshot: (query: string) => boolean;
  getServerSnapshot: (query: string) => boolean;
};

export const MediaQueryContext = createContext<MediaQueryContextValue | null>(null);

export type MediaQueryProviderProps = {
  children: React.ReactNode;
  defaultValues?: Record<string, boolean>;
};

const store = createMediaQueryStore();

// TO DO: Rework defaultValues with dynamic media query parsing and a config object `{ width, contrast, colorScheme }`, so the possible queries don't need to be known ahead of time
export const cdsDefaultValues = {
  [media.desktop]: true,
  [media.desktopLarge]: true,
  '(prefers-color-scheme: light)': true,
  '(prefers-contrast: no-preference)': true,
};

export const MediaQueryProvider = ({
  children,
  defaultValues = cdsDefaultValues,
}: MediaQueryProviderProps) => {
  useState(() => store.init(defaultValues));
  return <MediaQueryContext.Provider value={store}>{children}</MediaQueryContext.Provider>;
};
