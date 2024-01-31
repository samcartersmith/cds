import fs from 'fs';
import getFirst from 'lodash/first';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import path from 'path';
import semver from 'semver';

import { adopters } from '../../../data/__generated__/adoption/adopters';
import {
  Adopter,
  AdopterProjectVersionSummary,
  Adopters,
  AdopterStats,
  PillarProjectData,
  statsFallback,
  VersionMap,
} from '../types';

import { sanitizeVersion } from './getStats';

export const EXCLUDED_PILLARS = ['Other'];

type ProjectProps = { id: Adopter };
let statForLatestCdsVersionPublished3MonthsAgo = '';

// Get projects by pillar
export const getProjects = (pillar?: string) => {
  return adopters.filter((adopter) => adopter.pillar === pillar || !pillar);
};
// Get stats for each project
export const getStats = (project: ProjectProps) => {
  const statsFilePath = path.resolve(
    __dirname,
    `../../../static/data/__generated__/adoption/${project.id}/stats.json`,
  );

  if (!fs.existsSync(statsFilePath)) {
    throw new Error(`Stats file not found for project ${project.id} at path ${statsFilePath}`);
  }

  return require(statsFilePath) as AdopterStats;
};

// Get total number of component instances across all projects
export const getTotalInstancesLatest = (
  key: 'cds' | 'presentational' | 'totalCdsAndPresentational',
  pillar?: string,
  isUpToDateOnly?: boolean,
  excludedPillars?: string[],
) => {
  const projects = getProjects(pillar);
  return projects
    .filter((project) => {
      // Exclude the projects that belong to the excluded pillars, if any are specified
      return !(excludedPillars && excludedPillars.includes(project.pillar));
    })
    .reduce((acc, project) => {
      if (!isUpToDateOnly || (isUpToDateOnly && getStats(project).latest.upToDate)) {
        const stats = getStats(project);
        const latestStat = stats.latest ?? statsFallback?.latest;
        return acc + latestStat[key];
      }
      return acc;
    }, 0);
};

export const getTotalInstancesPrevious = (
  key: 'cds' | 'presentational' | 'totalCdsAndPresentational',
  pillar?: string,
  isUpToDateOnly?: boolean,
  excludedPillars?: string[],
) => {
  const projects = getProjects(pillar);
  return projects
    .filter(
      (project) =>
        // Exclude the projects that belong to the excluded pillars, if any are specified
        !(excludedPillars && excludedPillars.includes(project.pillar)),
    )
    .reduce((acc, project) => {
      if (!isUpToDateOnly || (isUpToDateOnly && getStats(project).latest.upToDate)) {
        const stats = getStats(project);
        const fallback = getFirst(stats.previous) ?? statsFallback?.latest;
        const previous =
          stats.previous
            .slice()
            .reverse()
            .find((prev) => Boolean(prev.period)) ?? fallback;

        return acc + previous[key];
      }
      return acc;
    }, 0);
};

export function getPercentageText(partial: number, total?: number) {
  let decimalPercent = partial;
  if (total) {
    decimalPercent = Number(partial / total);
  }
  if (decimalPercent === 0) {
    return `0%`;
  }
  if (decimalPercent === 1) {
    return '100%';
  }
  return `${(decimalPercent * 100).toFixed(2)}%`;
}
/**
   * Gets the adoption percentage for a given pillar.
   * Returns overall percentage if no pillar provided.
   *
   * @param pillar - Optional pillar name to get percentage for.
   * @param isUpToDateOnly - Optional boolean to consider only up-to-date projects.
  
   * @returns The percentage as a string formatted like "85%".
   */
export const getPercentage = ({
  pillar,
  isUpToDateOnly,
  excludedPillars,
}: {
  pillar?: string;
  isUpToDateOnly?: boolean;
  targetAdoptionPercentage?: number;
  excludedPillars?: string[];
}) => {
  const totalCds = getTotalInstancesLatest('cds', pillar, isUpToDateOnly, excludedPillars);
  const totalCdsAndPresentational = getTotalInstancesLatest(
    'totalCdsAndPresentational',
    pillar,
    isUpToDateOnly,
    excludedPillars,
  );
  const percentage = totalCds / totalCdsAndPresentational;

  const percentageText = getPercentageText(percentage);

  return { percentageText, percentage } as const;
};

export function getLowestVersion(
  cdsCommonVersion: string,
  cdsWebVersion: string,
  cdsMobileVersion: string,
): { lowestVersion: string | null; lowestOriginalVersion: string | null; type: string } {
  // Map of original versions
  const originalVersions: VersionMap = {
    common: cdsCommonVersion,
    web: cdsWebVersion,
    mobile: cdsMobileVersion,
  };

  // sanitized versions
  const sanitizedVersions: VersionMap = {
    common: sanitizeVersion(cdsCommonVersion),
    web: sanitizeVersion(cdsWebVersion),
    mobile: sanitizeVersion(cdsMobileVersion),
  };

  let lowestVersion: string | null = null;
  let lowestOriginalVersion: string | null = null;
  let lowestType: keyof VersionMap = 'common';

  Object.entries(sanitizedVersions).forEach(([type, version]) => {
    if (
      version &&
      semver.valid(version) &&
      (lowestVersion === null || semver.lt(version, lowestVersion))
    ) {
      lowestVersion = version;
      lowestOriginalVersion = originalVersions[type as keyof VersionMap];
      lowestType = type as keyof VersionMap;
    }
  });

  return { lowestVersion, lowestOriginalVersion, type: lowestType };
}

// Get list of projects which are within latest CDS version range (last 3 months) for a pillar
export const getAllProjectCDSVersionsForPillar = (
  pillar?: string,
): AdopterProjectVersionSummary[] => {
  const projects = getProjects(pillar);

  return projects.reduce((acc: AdopterProjectVersionSummary[], project) => {
    const stats = getStats(project);
    const latestStat = stats.latest;

    const { lowestVersion } = getLowestVersion(
      latestStat.cdsCommonVersion,
      latestStat.cdsWebVersion,
      latestStat.cdsMobileVersion,
    );

    statForLatestCdsVersionPublished3MonthsAgo = latestStat.latestCdsVersionPublished3MonthsAgo;

    const sanitizedVersion = sanitizeVersion(lowestVersion || '');
    const version3MonthsAgo = sanitizeVersion(statForLatestCdsVersionPublished3MonthsAgo);

    if (
      sanitizedVersion &&
      version3MonthsAgo &&
      semver.valid(sanitizedVersion) &&
      semver.valid(version3MonthsAgo) &&
      semver.gte(sanitizedVersion, version3MonthsAgo)
    ) {
      acc.push({
        id: project.id,
        version: lowestVersion || '',
        pillar,
        upToDate: true,
        adopterStatsItem: latestStat,
      });
      return acc;
    }

    if (
      sanitizedVersion &&
      version3MonthsAgo &&
      semver.valid(sanitizedVersion) &&
      semver.valid(version3MonthsAgo)
    ) {
      acc.push({
        id: project.id,
        version: lowestVersion || '',
        pillar,
        upToDate: false,
        adopterStatsItem: latestStat,
      });
      return acc;
    }

    return acc;
  }, []);
};

export const getSortedProjectPairs = (adoptersJson: Adopters) =>
  toPairs(groupBy(adoptersJson, 'pillar'))
    .sort(([pillarA], [pillarB]) => {
      // Check if either pillar is 'Other', and sort accordingly

      // Force 'Other' to be at the bottom
      if (pillarA === 'Other') return 1;
      if (pillarB === 'Other') return -1;

      // Sort projects by their total adoption percentage
      const { percentage: percentageA } = getPercentage({ pillar: pillarA });
      const { percentage: percentageB } = getPercentage({ pillar: pillarB });

      return percentageA - percentageB;
    })
    .map(([pillar, projectsInPillar]) => {
      return [
        pillar,
        (projectsInPillar as ProjectProps[]).sort((a, b) => {
          // Sort projects by their total adoption percentage
          const statsA = getStats(a);
          const statsB = getStats(b);
          const latestStatA = statsA.latest ?? statsFallback?.latest;
          const latestStatB = statsB.latest ?? statsFallback?.latest;

          return latestStatA.cdsPercent - latestStatB.cdsPercent;
        }),
      ] as const;
    });

/**
 * Calculates the percentage change for a given pillar from the adoption stats.
 * Returns overall percentage change if no pillar provided.
 *
 * @param pillar - The pillar to calculate percentage change for.
 * @param isUpToDateOnly - Optional boolean to consider only up-to-date projects.
 * @returns The percentage change as a string formatted like "+10%" or "-5%".
 */
export const getPercentageChange = ({
  pillar,
  upToDate,
  excludedPillars,
}: {
  pillar?: string;
  upToDate?: boolean;
  excludedPillars?: string[];
}) => {
  const { percentage: latestPercentage } = getPercentage({
    pillar,
    isUpToDateOnly: upToDate,
    excludedPillars,
  });
  const totalCdsPrevious = getTotalInstancesPrevious('cds', pillar, upToDate, excludedPillars);
  const totalCdsAndPresentationalPrevious = getTotalInstancesPrevious(
    'totalCdsAndPresentational',
    pillar,
    upToDate,
  );
  const previousPercentage = totalCdsPrevious / totalCdsAndPresentationalPrevious;

  const change = latestPercentage - previousPercentage;
  let diff = '';
  let changePercentageText = getPercentageText(change);

  if (change > 0) {
    diff = 'positive';
    changePercentageText = `+${getPercentageText(change)}`;
  }
  if (change < 0) {
    diff = 'negative';
    changePercentageText = getPercentageText(change);
  }
  if (change === 0) {
    changePercentageText = 'No change';
  }

  return { diff, changePercentageText } as const;
};

/**
 * Calculates the percentage of projects that are up-to-date with the latest CDS guidance.
 * It can calculate this percentage either for a specific pillar or across all pillars.
 *
 * @param totalProjectVersionsList - An array of objects, each representing a pillar with its associated project versions.
 * @param pillar - Optional string parameter to specify a pillar for which to calculate the percentage. If omitted, calculates for all pillars.
 * @returns The percentage of projects that are up-to-date, either within the specified pillar or across all pillars.
 */
export function getPercentProductsWithinCDS({
  totalProjectVersionsList,
  pillar,
  excludedPillars,
}: {
  totalProjectVersionsList: PillarProjectData[];
  pillar?: string;
  excludedPillars?: string[];
}) {
  const percentPGProjectsUpToDate = totalProjectVersionsList
    .filter((project) => !(excludedPillars && excludedPillars.includes(project.pillar)))
    .reduce(
      (count, entry) =>
        count +
        entry.allProjectVersions.filter(
          (projectEntry) => (!pillar || projectEntry.pillar === pillar) && projectEntry.upToDate,
        ).length,
      0,
    );

  const percentPGProjectsAll = totalProjectVersionsList
    .filter(
      (project) =>
        // Exclude the projects that belong to the excluded pillars, if any are specified
        !(excludedPillars && excludedPillars.includes(project.pillar)),
    )
    .reduce(
      (count, entry) =>
        count +
        entry.allProjectVersions.filter((projectEntry) => !pillar || projectEntry.pillar === pillar)
          .length,
      0,
    );

  // Check to prevent division by zero when calculating percentage
  if (percentPGProjectsAll === 0) return 0;
  return (percentPGProjectsUpToDate / percentPGProjectsAll) * 100;
}
