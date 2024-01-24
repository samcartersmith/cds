import { sumBy } from 'lodash';
import semver from 'semver';

import type { ProjectParser } from '../parsers/ProjectParser';

import { formatDate } from './formatDate';

export type AdoptionStats = ReturnType<typeof getStats>;
export type ComponentData = ProjectParser['components'];

export function sanitizeVersion(version: string) {
  if (version && version?.split(' ').length > 1) {
    throw Error('getStats sanitizeVersion detected unexpected semver range');
  }
  // Remove ^ and ~ only if they are at the start of the string
  return version.replaceAll(/^[><=~^]/gm, '');
}

export function getPackageVersion({
  packageName,
  dependencies,
  peerDependencies,
  resolutions,
  devDependencies,
}: {
  packageName: string;
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  resolutions: Record<string, string>;
  devDependencies: Record<string, string>;
}) {
  const depVersion = dependencies[packageName];
  const peerDepVersion = peerDependencies[packageName];
  const resolutionVersion = resolutions[packageName];
  const devDepVersion = devDependencies[packageName];

  // Check if version exists and is not '*'
  const isValidVersion = (version: string) => version && version !== '*';

  // Return the first valid version found in the order of dependencies -> peerDependencies -> resolutions -> devDependencies
  if (isValidVersion(depVersion)) return depVersion;
  if (isValidVersion(peerDepVersion)) return peerDepVersion;
  if (isValidVersion(resolutionVersion)) return resolutionVersion;
  return devDepVersion || '';
}

export function getStats({
  data,
  latestCdsVersionPublished3MonthsAgo,
  period,
  dependencies,
  peerDependencies,
  resolutions,
  cdsVersion,
  devDependencies,
}: {
  data: ComponentData;
  latestCdsVersionPublished3MonthsAgo: string;
  period?: string;
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  resolutions: Record<string, string>;
  devDependencies: Record<string, string>;
  cdsVersion?: string;
}) {
  const { cds, presentational, other } = data;
  const totalCds = sumBy(cds, 'totalInstances');
  const totalPresentational = sumBy(presentational, 'totalInstances');
  const totalCdsAndPresentational = totalCds + totalPresentational;
  const totalOther = sumBy(other, 'totalInstances');

  // Extract specific dependencies with version numbers
  // Use the getPackageVersion function to extract specific dependencies with version numbers
  const cdsCommonVersion = getPackageVersion({
    packageName: '@cbhq/cds-common',
    dependencies,
    peerDependencies,
    resolutions,
    devDependencies,
  });
  const cdsWebVersion = getPackageVersion({
    packageName: '@cbhq/cds-web',
    dependencies,
    peerDependencies,
    resolutions,
    devDependencies,
  });
  const cdsMobileVersion = getPackageVersion({
    packageName: '@cbhq/cds-mobile',
    dependencies,
    peerDependencies,
    resolutions,
    devDependencies,
  });

  // Check if any version is not up to date
  const upToDate = [cdsCommonVersion, cdsWebVersion, cdsMobileVersion].every((version) => {
    // Skip checking if the version is empty or undefined
    if (!version) return true;

    // Sanitize the version
    const sanitizedVersion = sanitizeVersion(version);
    const sanitizedLatestCdsVersionPublished3MonthsAgo = sanitizeVersion(
      latestCdsVersionPublished3MonthsAgo,
    );

    // Check if the version is valid and satisfies the condition
    return (
      semver.valid(sanitizedVersion) &&
      semver.gte(sanitizedVersion, sanitizedLatestCdsVersionPublished3MonthsAgo)
    );
  });

  return {
    date: formatDate(new Date(), {
      hour: undefined,
      minute: undefined,
    }),
    cdsPercent: totalCds / totalCdsAndPresentational,
    cds: totalCds,
    presentational: totalPresentational,
    period,
    totalCdsAndPresentational,
    totalOther,
    cdsCommonVersion,
    cdsWebVersion,
    cdsMobileVersion,
    cdsLatestVersion: cdsVersion,
    latestCdsVersionPublished3MonthsAgo,
    upToDate,
  };
}
