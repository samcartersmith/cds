/**
 * Avoid having to deal with transitive version issues.
 * CDS common is dep of cds-mobile.
 * This allows consumers to pull directly from cds-mobile.
 */
export type { FeatureFlagProviderProps } from '@cbhq/cds-common/system/FeatureFlagProvider';
export { FeatureFlagProvider } from '@cbhq/cds-common/system/FeatureFlagProvider';
