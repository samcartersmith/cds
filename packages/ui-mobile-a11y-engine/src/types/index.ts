export type { default as Help } from './Help';
export type { default as Result } from './Result';
export type { default as Rule } from './Rule';
export type { default as Violation } from './Violation';

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Matchers<R> {
      /**
       * Checks whether a component conforms to Accessibility A11y best practices.
       */
      toBeAccessible: () => R;
    }
  }
}
