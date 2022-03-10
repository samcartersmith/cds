/**
 * Avoid having to deal with transitive version issues.
 * CDS common is dep of cds-web.
 * This allows consumers to pull directly from cds-web.
 */
export { FeatureFlagProvider } from '@cbhq/cds-common/system/FeatureFlagProvider';
export type { FeatureFlagProviderProps } from '@cbhq/cds-common/system/FeatureFlagProvider';
