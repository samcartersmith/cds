import groupBy from 'lodash.groupby';

import type { Violation } from '../types';

export const generateCheckError = (violations: Violation[]): string => {
  let errorString = '\n';

  // Each unique path represents a component in the component tree
  const violationsGroupedByPath = groupBy(violations, (violation) => {
    return violation.pathToComponent;
  });

  for (const [path, violationsAtPath] of Object.entries(violationsGroupedByPath)) {
    // Prettify path to component
    errorString = `${path.split(',').join(' > ')}\n\n`;

    for (const violation of violationsAtPath) {
      errorString += ` · ${violation.problem}\n   ↳  ${violation.solution}\n`;
    }
  }

  return errorString;
};
