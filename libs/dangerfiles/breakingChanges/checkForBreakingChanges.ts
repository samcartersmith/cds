/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'node:fs';
import { Project } from 'ts-morph';

import { MONOREPO_ROOT } from '../utils';

const warningMessage = [
  'This is a breaking change (see go/cds-breaking-change) and requires the following: ',
  '1. Move your breaking change to the release candidate branch. See: go/cds-release-candidate',
  '2. Create a PR and request a review from #ask-ui-systems',
  '3. Schedule a bug bash. See bug bash template: go/cds-bugbash-template',
].join('\n');

export type CheckFnParams = {
  project: Project;
  warningMessage: string;
};

export default async function checkForBreakingChanges({
  files,
  checkFn,
}: {
  files: string[];
  checkFn: (params: CheckFnParams) => Promise<void>;
}) {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    useInMemoryFileSystem: true,
  });

  if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

  // add the file to the ts-morph project instance
  files.forEach((file) => {
    const sourceContent = fs.readFileSync(`${MONOREPO_ROOT}/${file}`, 'utf-8');
    project.createSourceFile(file, sourceContent, {
      overwrite: true,
    });
  });

  await checkFn({ project, warningMessage });
}
