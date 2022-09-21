import type { ReactElement } from 'react';

import check from '../engine';
import { generateMatcherError } from '../utils';

export default function toBeAccessible(this: jest.MatcherContext, received: ReactElement) {
  const violations = check(received, {
    returnViolations: true,
  });

  if (violations.length) {
    const message = generateMatcherError(violations, this.isNot);
    return {
      pass: false,
      message: () => message,
    };
  }

  return {
    pass: true,
    message() {
      return 'Component is accessible.\nDoes it make sense to test a component for NOT being accessible?';
    },
  };
}
