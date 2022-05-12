// build css and place it in root directory
// remove useless global styles

import { ExecutorContext } from '@nrwl/devkit';
import path from 'path';

import { BuildCssOptions, BuildPackageOptions } from '../../types';
import buildCss from '../build-css/impl';
import buildPackage from '../build-package/impl';
import { deleteDir, deleteFile, getFileSizeInKb } from '../utils';

type BuildPackageEsmOptions =  BuildPackageOptions &
  Pick<BuildCssOptions, 'fontsOutputDir'> & {
  maxFileSizeInKb: number;
};

export default async function buildPackageEsm(
  options: BuildPackageEsmOptions,
  context: ExecutorContext,
) {
  const esmOpts: BuildPackageEsmOptions = {
    ...options,
    envs: {
      ...options.envs,
      SSR_BUILD: 'true',
    },
  };

  const { destinationDir, fontsOutputDir, maxFileSizeInKb } = esmOpts;
  const tempBuildDestinationDir = path.join(destinationDir, 'temp-css');

  // build package with environment variable (no css files)
  let { success } = await buildPackage(esmOpts, context);

  const tempWebOpts = {
    ...options,
    destinationDir: tempBuildDestinationDir,
  };

  // builds the web package with all of the component css in a temp directory
  success = success ? (await buildPackage(tempWebOpts, context, true)).success : success;

  const distDir = path.join(destinationDir, 'assets');
  const cssOpts: BuildCssOptions = {
    fontsOutputDir,
    webOutputDir: tempBuildDestinationDir,
    outputDir: distDir,
    name: 'main',
  };

  // concatenates all of the css from the temp build above
  success = success ? (await buildCss(cssOpts, context)).success : success;

  await deleteDir(tempBuildDestinationDir);

  // remove global styles that aren't ssr specific
  await deleteFile(path.join(destinationDir, 'globalStyles.js'));
  await deleteFile(path.join(destinationDir, 'globalStyles.d.ts'));

  // validate file size
  const cssFile = path.join(distDir, 'main.css');
  const fileSize = await getFileSizeInKb(cssFile);
  console.log(`File size ${cssFile}: ${fileSize}kB, Max allowed: ${maxFileSizeInKb}kB`);
  success = fileSize < maxFileSizeInKb;

  return {
    success,
  };
}
