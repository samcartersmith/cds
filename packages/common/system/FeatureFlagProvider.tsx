import React, { memo, useMemo,useReducer } from 'react';
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

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = memo(
  ({
    children,
    frontier: frontierProp,
    frontierTypography: frontierTypographyProp,
    frontierButton: frontierButtonProp,
    frontierColor: frontierColorProp,
    frontierCard: frontierCardProp,
    frontierSparkline: frontierSparklineProp,
    onChange,
  }) => {
    const {
      frontier: frontierContext,
      frontierTypography: frontierTypographyContext,
      frontierButton: frontierButtonContext,
      frontierColor: frontierColorContext,
      frontierCard: frontierCardContext,
      frontierSparkline: frontierSparklineContext,
    } = useFeatureFlags();

    const [featureFlagsState, dispatch] = useReducer(featureFlagReducer, emptyObject);

    const contextValue = useMemo(() => {
      const { frontier, ...otherFeatureFlagsState } = featureFlagsState;
      const hasFrontier = frontier ?? frontierProp ?? frontierContext;
      return {
        frontier: hasFrontier,
        frontierTypography: frontierTypographyProp ?? (hasFrontier || frontierTypographyContext),
        frontierButton: frontierButtonProp ?? (hasFrontier || frontierButtonContext),
        frontierColor: frontierColorProp ?? (hasFrontier || frontierColorContext),
        frontierCard: frontierCardProp ?? (hasFrontier || frontierCardContext),
        frontierSparkline: frontierSparklineProp ?? (hasFrontier || frontierSparklineContext),
        ...otherFeatureFlagsState,
      };
    }, [
      featureFlagsState,
      frontierButtonContext,
      frontierButtonProp,
      frontierCardContext,
      frontierCardProp,
      frontierColorContext,
      frontierColorProp,
      frontierContext,
      frontierProp,
      frontierSparklineContext,
      frontierSparklineProp,
      frontierTypographyContext,
      frontierTypographyProp,
    ]);

    const dispatcherValue = useMemo(() => ({ onChange, dispatch }), [onChange]);

    return (
      <FeatureFlagDispatcherContext.Provider value={dispatcherValue}>
        <FeatureFlagContext.Provider value={contextValue}>{children}</FeatureFlagContext.Provider>
      </FeatureFlagDispatcherContext.Provider>
    );
  },
);
