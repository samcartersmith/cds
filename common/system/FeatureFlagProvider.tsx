import { emptyObject } from '@cbhq/cds-utils';
import React, { useCallback, useState, memo, useMemo } from 'react';
import {
  FeatureFlagContext,
  FeatureFlagUpdater,
  FeatureFlagUpdaterFnParams,
  FeatureFlagsPartial,
  defaultFeatureFlags,
  frontierFeaturesOn,
  frontierFeaturesOff,
} from './FeatureFlagContext';

export type FeatureFlagProviderProps = FeatureFlagsPartial;

export function getFrontierFlags(val: boolean | undefined) {
  if (val === undefined) return emptyObject;
  return val ? frontierFeaturesOn : frontierFeaturesOff;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = memo(
  ({ children, ...featureFlagProps }) => {
    const [featureFlagsState, setFeatureFlags] = useState<FeatureFlagsPartial>(emptyObject);

    // Allow imperative updates via debug menu, an experiment check lower in tree or some user action.
    const handleFeatureFlagsUpdate = useCallback((params: FeatureFlagUpdaterFnParams) => {
      if (typeof params === 'function') {
        setFeatureFlags((prev) => {
          // Pass previous featureFlagsState in callback
          const newParams = params(prev);
          // In case consumer forgets to merge with old values
          return { ...prev, ...newParams };
        });
      } else {
        setFeatureFlags((prev) => ({ ...prev, ...params }));
      }
    }, []);

    const value = useMemo(
      () => ({
        // Fallbacks
        ...defaultFeatureFlags,
        // Shorthand to update all frontier flags to on/off if `frontier` is present in props or state
        ...getFrontierFlags(featureFlagProps?.frontier ?? featureFlagsState?.frontier),
        // Passed in via props
        ...featureFlagProps,
        // Updated imperatively
        ...featureFlagsState,
      }),
      [featureFlagProps, featureFlagsState],
    );

    return (
      <FeatureFlagUpdater.Provider value={handleFeatureFlagsUpdate}>
        <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>
      </FeatureFlagUpdater.Provider>
    );
  },
);
