import { mapValues, noop, entries } from '@cbhq/cds-utils';
import { createContext } from 'react';

// Feature Flag tokens
export const frontierFeaturesOff = {
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
   * TBD
   * @default false
   */
  frontierSparkline: false,
};

export const frontierFeaturesOn = mapValues(frontierFeaturesOff, () => true);

export const defaultFeatureFlags = {
  /**
   * Replace Graphik & Inter with Coinbase Sans and Coinbase Display fonts.
   * @default false
   */
  fontMigration: false,
  /**
   * Conventiently toggle all the Frontier flags at once.
   * @default false
   */
  frontier: false,
  ...frontierFeaturesOff,
};

export const frontierFeatures = entries(frontierFeaturesOn).map(([key]) => key);

// Feature Flag types
export type FeatureFlags = typeof defaultFeatureFlags;
export type FeatureFlagsPartial = Partial<FeatureFlags>;
export type FeatureFlag = keyof FeatureFlags;
export type FeatureFlagUpdaterFnParams =
  | FeatureFlagsPartial
  | ((prev: FeatureFlagsPartial) => FeatureFlagsPartial);
export type FeatureFlagUpdaterFn = (val: FeatureFlagUpdaterFnParams) => void;

// Feature Flag contexts
export const FeatureFlagContext = createContext<FeatureFlags>(defaultFeatureFlags);
export const FeatureFlagUpdater = createContext<FeatureFlagUpdaterFn>(noop);
