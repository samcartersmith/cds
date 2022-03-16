import { NoopFn as NoopFnType } from '../types/Helpers';

// eslint-disable-next-line no-console
export const NoopFn: NoopFnType = () => console.log('fired');
