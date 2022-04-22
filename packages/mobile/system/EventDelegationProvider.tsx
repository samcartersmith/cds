/**
 * Avoid having to deal with transitive version issues.
 * CDS common is dep of cds-mobile.
 * This allows consumers to pull directly from cds-mobile.
 */
export type { EventDelegationProviderProps } from '@cbhq/cds-common/system/EventDelegationProvider';
export { EventDelegationProvider } from '@cbhq/cds-common/system/EventDelegationProvider';
