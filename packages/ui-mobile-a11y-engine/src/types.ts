import type { ReactTestInstance } from 'react-test-renderer';

export type Help = {
  problem: string;
  solution: string;
  link: string;
};

export type Result = {
  id: string;
  didPassAssertion: boolean;
  ruleId: string;
};

export type Rule = {
  id: string;
  matcher: (node: ReactTestInstance) => boolean;
  assertion: (node: ReactTestInstance) => boolean;
  help: Help;
};

export type Violation = {
  pathToComponent: string[];
} & Help;
declare global {
  namespace jest {
    // this is required based on the jest test structure
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Matchers<R> {
      /**
       * Checks whether a component conforms to Accessibility A11y best practices.
       */
      toBeAccessible: () => R;
    }
  }
}
