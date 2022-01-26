import React, { memo, useMemo, useReducer } from 'react';
import { emptyObject, entries, isProduction } from '@cbhq/cds-utils';

import {
  FeatureFlag,
  FeatureFlagContext,
  FeatureFlagDispatcherAction,
  FeatureFlagDispatcherContext,
  FeatureFlagsPartial,
  frontierFeaturesOn,
} from './FeatureFlagContext';
import { useFeatureFlags } from './useFeatureFlags';

export type FeatureFlagProviderProps = FeatureFlagsPartial;

export function getFrontierFlags(val: boolean | undefined) {
  if (val === undefined) return emptyObject;
  return val ? frontierFeaturesOn : emptyObject;
}

function featureFlagReducer(state: FeatureFlagsPartial, action: FeatureFlagDispatcherAction) {
  switch (action.type) {
    case 'update': {
      const newState = { ...state, ...action.value };
      action.updateLocalStorage?.(newState);
      return newState;
    }
    case 'toggle': {
      const newState = { ...state, [action.name]: !state[action.name] };
      action.updateLocalStorage?.(newState);
      return newState;
    }
    default: {
      if (isProduction()) {
        return state;
      }
      throw new Error('useFeatureFlagUpdater requires `type` to be provided');
    }
  }
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = memo(
  ({
    children,
    frontierTypography,
    frontierButton,
    frontierColor,
    frontierCard,
    frontierSparkline,
    frontier,
  }) => {
    const [featureFlagsState, dispatch] = useReducer(featureFlagReducer, emptyObject);
    // Deep merge if nesting FeatureFlagProviders
    const defaultFeatureFlags = useFeatureFlags();
    const value = useMemo(() => {
      let featureFlags = defaultFeatureFlags;
      const props: { [key in FeatureFlag]: boolean | undefined } = {
        frontier,
        frontierButton,
        frontierCard,
        frontierColor,
        frontierSparkline,
        frontierTypography,
      };
      // Shorthand to update all frontier flags to on/off if `frontier` is present in props or state
      if (frontier ?? featureFlagsState?.frontier) {
        featureFlags = { ...featureFlags, ...frontierFeaturesOn };
      }
      // Apply prop values
      for (const [prop, propValue] of entries(props)) {
        if (propValue !== undefined) {
          featureFlags[prop] = propValue;
        }
      }
      // Apply values which were updated imperatively
      return { ...featureFlags, ...featureFlagsState };
    }, [
      defaultFeatureFlags,
      featureFlagsState,
      frontier,
      frontierButton,
      frontierCard,
      frontierColor,
      frontierSparkline,
      frontierTypography,
    ]);

    return (
      <FeatureFlagDispatcherContext.Provider value={dispatch}>
        <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>
      </FeatureFlagDispatcherContext.Provider>
    );
  },
);
