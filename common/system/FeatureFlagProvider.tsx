import { emptyObject } from '@cbhq/cds-utils';
import React, { useReducer, memo, useMemo } from 'react';
import {
  FeatureFlagContext,
  FeatureFlagDispatcherContext,
  FeatureFlagDispatcherAction,
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
      if (process.env.NODE_ENV === 'production') {
        return state;
      }
      throw new Error('useFeatureFlagUpdater requires `type` to be provided');
    }
  }
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = memo(
  ({ children, ...featureFlagProps }) => {
    const [featureFlagsState, dispatch] = useReducer(featureFlagReducer, emptyObject);
    // Deep merge if nesting FeatureFlagProviders
    const defaultFeatureFlags = useFeatureFlags();
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
      [defaultFeatureFlags, featureFlagProps, featureFlagsState],
    );

    return (
      <FeatureFlagDispatcherContext.Provider value={dispatch}>
        <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>
      </FeatureFlagDispatcherContext.Provider>
    );
  },
);
