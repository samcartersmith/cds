/**
 * Avoid having to deal with transitive version issues.
 * CDS common is dep of cds-web.
 * This allows consumers to pull directly from cds-web.
 */
export { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
