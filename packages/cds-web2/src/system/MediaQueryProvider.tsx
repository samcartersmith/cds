import React, { createContext, useState } from 'react';

import { breakpoints } from '../styles/media';
import { addMediaQueryListener, removeMediaQueryListener } from '../utils/mediaQueryListener';

type MediaSettings = {
  width?: number;
  height?: number;
  fontSize?: number;
  colorScheme?: 'light' | 'dark';
  contrast?: 'more' | 'less';
};

const getMediaPixelValue = (value: string, fontSize = 16): number => {
  const numericValue = parseInt(value.slice(0, -2), 10);
  const isPx = value.endsWith('px');
  const isEm = value.endsWith('em') || value.endsWith('rem');
  if (isNaN(numericValue) || (!isPx && !isEm))
    throw Error(`getPixelValue failed to parse value: "${value}`);
  if (isEm) return numericValue * fontSize;
  return numericValue;
};

const mediaQueryDefaultSolutions: Record<
  string,
  (value: string, defaultValues: MediaSettings) => boolean
> = {
  width: (width, defaultValues) => {
    if (typeof defaultValues.width === 'undefined') return false;
    return Boolean(defaultValues.width === getMediaPixelValue(width, defaultValues.fontSize));
  },
  'min-width': (minWidth, defaultValues) => {
    if (typeof defaultValues.width === 'undefined') return false;
    return Boolean(defaultValues.width >= getMediaPixelValue(minWidth, defaultValues.fontSize));
  },
  'max-width': (maxWidth, defaultValues) => {
    if (typeof defaultValues.width === 'undefined') return false;
    return Boolean(defaultValues.width <= getMediaPixelValue(maxWidth, defaultValues.fontSize));
  },
  height: (height, defaultValues) => {
    if (typeof defaultValues.height === 'undefined') return false;
    return Boolean(defaultValues.height === getMediaPixelValue(height, defaultValues.fontSize));
  },
  'min-height': (minHeight, defaultValues) => {
    if (typeof defaultValues.height === 'undefined') return false;
    return Boolean(defaultValues.height >= getMediaPixelValue(minHeight, defaultValues.fontSize));
  },
  'max-height': (maxHeight, defaultValues) => {
    if (typeof defaultValues.height === 'undefined') return false;
    return Boolean(defaultValues.height <= getMediaPixelValue(maxHeight, defaultValues.fontSize));
  },
  'prefers-color-scheme': (colorScheme, defaultValues) => {
    // If defaultValues.colorScheme is undefined, mimic browser default behavior for prefers-color-scheme, e.g.
    // window.matchMedia("(prefers-color-scheme: light)") is true when the user does not specify a preference
    if (typeof defaultValues.colorScheme === 'undefined') return colorScheme === 'light';
    return Boolean(defaultValues.colorScheme && defaultValues.colorScheme === colorScheme);
  },
  'prefers-contrast': (contrast, defaultValues) => {
    // If defaultValues.contrast is undefined, mimic browser default behavior for prefers-contrast, e.g.
    // window.matchMedia("(prefers-contrast: no-preference)") is true when the user does not specify a preference
    if (typeof defaultValues.contrast === 'undefined') return contrast === 'no-preference';
    return defaultValues.contrast === contrast;
  },
};

/**
 *
 * @param query
 * @param defaultValues
 * @returns
 */
const solveMediaQueryDefaults = (query: string, defaultValues: MediaSettings) => {
  const queryString = query.match(/\((.*)\)/)?.[1].trim();
  if (!queryString) return false;
  const queryParts = queryString.split(' and ');
  let matching = true;
  for (const queryPart of queryParts) {
    const queryPartString = queryPart.match(/\((.*)\)/)?.[1].trim();
    if (!queryPartString) {
      matching = false;
      continue;
    }
    const [condition, value] = queryPartString.split(':');
    const result = mediaQueryDefaultSolutions[condition.trim()]?.(value.trim(), defaultValues);
    if (!result) matching = false;
  }
  return matching;
};

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
  let defaultValues: MediaSettings | null = null;
  let initialized = false;

  const init = (options: { defaultValues?: MediaSettings }) => {
    if (initialized) return;
    initialized = true;
    if (options.defaultValues) defaultValues = options.defaultValues;
  };

  const getSnapshot = (query: string): boolean => mediaQueryLists[query]?.matches ?? false;

  const getServerSnapshot = (query: string): boolean => {
    if (!defaultValues) return false;
    return solveMediaQueryDefaults(query, defaultValues);
  };

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
  defaultValues?: MediaSettings;
};

const store = createMediaQueryStore();

export const cdsDefaultValues = {
  width: breakpoints.desktop,
  colorScheme: 'light' as const,
};

export const MediaQueryProvider = ({
  children,
  defaultValues = cdsDefaultValues,
}: MediaQueryProviderProps) => {
  useState(() => store.init({ defaultValues }));
  return <MediaQueryContext.Provider value={store}>{children}</MediaQueryContext.Provider>;
};
