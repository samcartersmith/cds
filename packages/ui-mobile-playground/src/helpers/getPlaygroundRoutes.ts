/* eslint-disable no-restricted-globals */
import { routes as codegenRoutes } from '@cbhq/cds-mobile/examples/newRoutes';

/**
 * Gets non-blacklisted route names from the Mobile Playground
 */
export function getPlaygroundRoutes({
  routes,
  disabledRoutes = [],
  iosDisabledRoutes = [],
  androidDisabledRoutes = [],
}: {
  routes: typeof codegenRoutes;
  disabledRoutes: string[];
  iosDisabledRoutes: string[];
  androidDisabledRoutes: string[];
}) {
  const routeNames = routes
    .filter(({ key }) => !disabledRoutes.includes(key)) /** Remove issue routes */
    .filter(
      ({ key }) =>
        !(device.getPlatform() === 'ios' ? iosDisabledRoutes : androidDisabledRoutes).includes(key),
    ) /** Remove device issue routes */
    .map((route) => route.key);

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
