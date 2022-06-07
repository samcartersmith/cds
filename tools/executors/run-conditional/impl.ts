import { ExecutorContext } from '@nrwl/devkit';
import { getAffectedProjects } from '@cbhq/mono-pipeline';

import { runLocalCommand } from '../utils';

type RunPercyOptions = {
  triggerProjects: string[];
  target: string;
};

export default async function runPercy(options: RunPercyOptions, context: ExecutorContext) {
  const { target, triggerProjects } = options;

  const affectedProjects = await getAffectedProjects("build");

  console.log("affectedProjects", JSON.stringify(affectedProjects, null, 2));
  console.log("triggerProjects", JSON.stringify(triggerProjects, null, 2));

  const affectedProjectSet = new Set<string>(affectedProjects);

  let shouldRun = false;
  for (const project of triggerProjects) {
    if (affectedProjectSet.has(project)) {
      console.log("found match", project);
      shouldRun = true;
      break;
    }
  }

  if (!shouldRun) {
    return undefined;
  }

  const bin = 'nx';

  const finalArguments = ['run', target];

  return runLocalCommand(context, bin, finalArguments, {}, context.root);
}
