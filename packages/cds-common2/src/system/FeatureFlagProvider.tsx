import React, { memo, useMemo, useReducer } from 'react';
import { emptyObject, isProduction } from '@cbhq/cds-utils';

import {
  FeatureFlagContext,
  FeatureFlagDispatcherAction,
  FeatureFlagDispatcherContext,
  FeatureFlagsOnChange,
  FeatureFlagsPartial,
} from './FeatureFlagContext';
import { useFeatureFlags } from './useFeatureFlags';

export type FeatureFlagProviderProps = FeatureFlagsPartial & { onChange?: FeatureFlagsOnChange };

function featureFlagReducer(state: FeatureFlagsPartial, action: FeatureFlagDispatcherAction) {
  switch (action.type) {
    case 'update': {
      const newState = { ...state, ...action.value };
      action.onChange?.(newState);
      return newState;
    }
    case 'toggle': {
      const newState = { ...state, [action.name]: !state[action.name] };
      action.onChange?.(newState);
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

export const FeatureFlagProvider: React.FC<React.PropsWithChildren<FeatureFlagProviderProps>> =
  memo(({ children, flexGap: flexGapProp, fabric: fabricProp, onChange }) => {
    const { flexGap: flexGapContext, fabric: fabricContext } = useFeatureFlags();

    const [featureFlagsState, dispatch] = useReducer(featureFlagReducer, emptyObject);

    const contextValue = useMemo(() => {
      return {
        flexGap: flexGapProp ?? flexGapContext,
        fabric: fabricProp ?? fabricContext,
        ...featureFlagsState,
      };
    }, [fabricContext, fabricProp, featureFlagsState, flexGapContext, flexGapProp]);

    const dispatcherValue = useMemo(() => ({ onChange, dispatch }), [onChange]);

    return (
      <FeatureFlagDispatcherContext.Provider value={dispatcherValue}>
        <FeatureFlagContext.Provider value={contextValue}>{children}</FeatureFlagContext.Provider>
      </FeatureFlagDispatcherContext.Provider>
    );
  });
