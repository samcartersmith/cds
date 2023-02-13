/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
import { message, schedule } from 'danger';
import { codeCoverage } from '@cbhq/danger-plugin-code-coverage';

// Output test coverage
if (process.env.NX_TEST_COVERAGE_DIRECTORY) {
  schedule(
    codeCoverage({
      title: `Test coverage: ${process.env.NX_PROJECT_NAME}`,
      coverageDirectory: process.env.NX_TEST_COVERAGE_DIRECTORY,
    }),
  );
} else {
  message('No coverage directory found');
}
