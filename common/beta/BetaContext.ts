import {
  defaultFeatureFlags,
  FeatureFlagContext,
  FeatureFlags,
} from '../system/FeatureFlagContext';

export { frontierFeatures, frontierFeaturesOn } from '../system/FeatureFlagContext';

/** @deprecated DEFAULT_BETA_CONTEXT has been renamed to defaultFeatureFlags and moved to common/system/FeatureFlagContext. */
export const DEFAULT_BETA_CONTEXT = defaultFeatureFlags;

/** @deprecated BetaContextType has been renamed to FeatureFlags and moved to common/system/FeatureFlagContext. */
export type BetaContextType = FeatureFlags;

/** @deprecated BetaContext has been renamed to FeatureFlagContext and moved to common/system/FeatureFlagContext. */
export const BetaContext = FeatureFlagContext;
