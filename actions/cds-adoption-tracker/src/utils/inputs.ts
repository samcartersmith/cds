import * as core from '@actions/core';

import type { ActionInputs } from '../types';

export function getInputs(): ActionInputs {
  return {
    projectName: core.getInput('project-name', { required: true }),
    tsconfigPath: core.getInput('tsconfig-path', { required: true }),
    packageJsonPath: core.getInput('package-json-path', { required: false }),
  };
}
