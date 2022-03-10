import React, { Children, createContext, ReactNode, useContext, useMemo } from 'react';

import flattenNodes from '../utils/flattenNodes';

type TrackIndexContextValue = {
  // A null index value indicates the child is not wrapped with TrackIndexProvider
  index: number | null;
  isFirst: boolean;
  isLast: boolean;
};

type TrackIndexProviderProps<T extends ReactNode> = {
  children: T;
};

export const TrackIndexContext = createContext<TrackIndexContextValue>({
  index: null,
  isFirst: false,
  isLast: false,
});

/**
 * Wrap this around children so you can access a child's index and determine it is the first or last child
 */
export const TrackIndexProvider = <T extends ReactNode>({
  children,
}: TrackIndexProviderProps<T>) => {
  const mappedChildren = useMemo(() => {
    const flatNodes = flattenNodes(children);
    const arrayLength = flatNodes.length;
    return (
      <>
        {Children.map(flatNodes, (child, index) => (
          <TrackIndexContext.Provider
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop,react/jsx-no-constructed-context-values
            value={{ index, isFirst: index === 0, isLast: index === arrayLength - 1 }}
          >
            {child}
          </TrackIndexContext.Provider>
        ))}
      </>
    );
  }, [children]);

  return mappedChildren;
};

/**
 * This assumes the child using this is wrapped in TrackIndexProvider
 */
export const useIndexTracker = () => {
  return useContext(TrackIndexContext);
};
