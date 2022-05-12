// build css and place it in root directory
// remove useless global styles

import { ExecutorContext } from '@nrwl/devkit';
import path from 'path';

import { BuildCssOptions, BuildPackageOptions } from '../../types';
import buildCss from '../build-css/impl';
import buildPackage from '../build-package/impl';
import { deleteDir, deleteFile } from '../utils';

type BuildPackageEsmOptions = BuildPackageOptions & Pick<BuildCssOptions, 'fontsOutputDir'>;

export default async function buildPackageEsm(
  options: BuildPackageEsmOptions,
  context: ExecutorContext,
) {
  const ssrOpts: BuildPackageEsmOptions = {
    ...options,
    envs: {
      ...options.envs,
      SSR_BUILD: 'true',
    },
  };

  const { destinationDir, fontsOutputDir } = ssrOpts;
  const tempBuildDestinationDir = path.join(destinationDir, 'temp-css');

  // build package with environment variable (no css files)
  let success = await buildPackage(ssrOpts, context);

  const tempWebOpts = {
    ...options,
    destinationDir: tempBuildDestinationDir,
  };

  // builds the web package with all of the component css in a temp directory
  success = success ? await buildPackage(tempWebOpts, context, true) : success;

  const cssOpts: BuildCssOptions = {
    fontsOutputDir,
    webOutputDir: tempBuildDestinationDir,
    outputDir: path.join(destinationDir, 'assets'),
    name: 'cds-web',
  };

  // concatenates all of the css from the temp build above
  success = success ? await buildCss(cssOpts, context) : success;

  await deleteDir(tempBuildDestinationDir);

  // remove global styles that aren't ssr specific
  await deleteFile(path.join(destinationDir, 'globalStyles.js'));
  await deleteFile(path.join(destinationDir, 'globalStyles.d.ts'));

  return {
    success,
  };
}
