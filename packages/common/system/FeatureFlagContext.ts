import { createContext } from 'react';
import { noop } from '@cbhq/cds-utils';

// Feature Flag tokens
export const defaultFeatureFlags = {
  /**
   * Conventiently toggle all the Frontier flags at once.
   * @default false
   */
  frontier: false,
  /**
   * Reduce Display2 fontSize/lineHeight. Add Display3 and Title4 components.
   * @default false
   */
  frontierTypography: false,
  /**
   * Replace rounded border radius with pill style.
   * @default false
   */
  frontierButton: false,
  /**
   * Change secondary palette from gray0 to gray60 at 10%.
   * @default false
   */
  frontierColor: false,
  /**
   * Remove rounded border radius and elevation.
   * @default false
   */
  frontierCard: false,
  /**
   * Dotted sparkline fills
   * @default false
   */
  frontierSparkline: false,
  /** Web only - Leverages the CSS flex 'gap' property instead of inserting extra DOM nodes.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/gap
   */
  flexGap: false,
  /** Mobile only - Consumers can enable this flag if they are using the new Fabric renderer
   * @link https://reactnative.dev/architecture/fabric-renderer
   */
  fabric: false,
};

export const frontierFeaturesOn = {
  frontier: true,
  frontierTypography: true,
  frontierButton: true,
  frontierColor: true,
  frontierCard: true,
  frontierSparkline: true,
};

// Feature Flag types
export type FeatureFlags = typeof defaultFeatureFlags;
export type FeatureFlagsPartial = Partial<FeatureFlags>;
export type FeatureFlag = keyof FeatureFlags;
export type FeatureFlagsOnChange = (newState: FeatureFlagsPartial) => void;
export type FeatureFlagDispatcherAction =
  | {
      type: 'update';
      value: FeatureFlagsPartial;
      onChange?: FeatureFlagsOnChange;
    }
  | { type: 'toggle'; name: FeatureFlag; onChange?: FeatureFlagsOnChange };
export type FeatureFlagDispatcherContextType = {
  dispatch: React.Dispatch<FeatureFlagDispatcherAction>;
  onChange?: FeatureFlagsOnChange;
};
// Feature Flag contexts
export const FeatureFlagContext = createContext<FeatureFlags>(defaultFeatureFlags);
export const FeatureFlagDispatcherContext = createContext<FeatureFlagDispatcherContextType>({
  dispatch: noop,
});
