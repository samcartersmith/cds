/* eslint-disable no-restricted-globals */
import { routes } from '@cbhq/cds-mobile/examples/routes';

import config from './config';
import { getDevicePlatform } from './helpers';

const routeNames = Object.values(routes)
  .filter(
    ({ name }) => !config.playgroundRoutesToExclude.always.includes(name),
  ) /** Remove issue routes */
  .filter(
    ({ name }) => !config.playgroundRoutesToExclude[getDevicePlatform()].includes(name),
  ) /** Remove device issue routes */
  .map((route) => route.name);

/**
 * Gets non-blacklisted route names from the Mobile Playground
 */
export default function getPlaygroundRoutes() {
  const totalJobs = process?.env?.VISREG_TOTAL_JOBS as unknown as number;

  if (totalJobs === undefined) {
    throw Error('VISREG_TOTAL_JOBS environment variable is not defined.');
  }

  const jobNumber = process?.env?.VISREG_JOB_NUMBER as unknown as number;

  if (jobNumber === undefined) {
    throw Error('VISREG_JOB_NUMBER environment variable is not defined.');
  }

  const jobSize = Math.floor(routeNames.length / totalJobs);
  const startIndex = (jobNumber - 1) * jobSize;
  const endIndex = jobNumber === totalJobs ? routeNames.length : startIndex + jobSize;

  return routeNames.slice(startIndex, endIndex);
}
