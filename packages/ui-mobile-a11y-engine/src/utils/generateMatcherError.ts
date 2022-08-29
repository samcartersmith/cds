import { getLabelPrinter, matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import groupBy from 'lodash.groupby';

import type { Violation } from '../types';

const labelProblem = 'Problem';
const labelSolution = 'Solution';
const printLabel = getLabelPrinter(labelProblem, labelSolution);

export const generateMatcherError = (violations: Violation[], isNot?: boolean): string => {
  let errorString = '';

  const matcherName = `${isNot ? '.not' : ''}.toBeAccessible`;
  const hint = `${matcherHint(matcherName, 'component', '')}\n\n`;

  errorString += hint;

  // Each unique path represents a component in the component tree
  const violationsGroupedByPath = groupBy(violations, (violation) => violation.pathToComponent);

  for (const path in violationsGroupedByPath) {
    if (Object.prototype.hasOwnProperty.call(violationsGroupedByPath, path)) {
      // Prettify path to component
      errorString += `${path.split(',').join(' > ')}\n\n`;

      for (const violation of violationsGroupedByPath[path]) {
        const violationString = `${
          printLabel(labelProblem) + printReceived(violation.problem)
        }\n${printLabel(labelSolution)}${printExpected(violation.solution)}\n\n`;

        errorString += violationString;
      }
    }
  }

  return errorString;
};
