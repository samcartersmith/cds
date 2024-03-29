/* eslint-disable no-param-reassign */
import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';

import { formatDate } from './utils/formatDate';
import { AdoptionStats, sanitizeVersion } from './utils/getStats';
import { generatedStaticDataDir } from './config';
import {
  AdopterConfig,
  AdoptersConfig,
  AdopterStats,
  AdopterStatsItem,
  ComponentData,
} from './types';

type StatsData = { latest: AdoptionStats; previous: AdoptionStats[] };

const cujOutputDir = path.join(generatedStaticDataDir.absolutePath, 'cuj/summary');
const cujDir = path.join(generatedStaticDataDir.absolutePath, 'cuj');
const highPlaceHolderVersion = '999.999.999';

function getLowestVersionBetweenTwo(v1: string, v2: string): string {
  // Using semver to compare versions properly
  const validV1 = semver.valid(semver.coerce(v1));
  const validV2 = semver.valid(semver.coerce(v2));

  if (!validV1) return validV2 || '';
  if (!validV2) return validV1;

  return semver.lt(validV1, validV2) ? validV1 : validV2;
}

/**
 * Helper for generateMergedCUJStatsSummary. Merge the stats.json files within the same CUJ Category
 * @param categoryItems
 * @returns merged stats.json data for cujs
 */
function mergeCategoryStats(categoryItems: (AdopterConfig | AdoptersConfig)[]) {
  if (categoryItems.length <= 1) {
    return null;
  }

  const mergedData = {
    latest: {
      date: '',
      cdsPercent: 0,
      cds: 0,
      presentational: 0,
      totalCdsAndPresentational: 0,
      totalOther: 0,
      cdsCommonVersion: highPlaceHolderVersion, // Start with impossibly high version
      cdsWebVersion: highPlaceHolderVersion,
      cdsMobileVersion: highPlaceHolderVersion,
      cdsLatestVersion: '',
      latestCdsVersionPublished3MonthsAgo: '',
      upToDate: true,
    } as AdopterStatsItem,
    previous: [],
  };

  categoryItems.forEach((item) => {
    const statsPath = path.join(cujDir, item.id || 'item id not found', 'stats.json');
    const rawData = fs.readFileSync(statsPath, 'utf8');
    const stats = JSON.parse(rawData) as AdopterStats;

    mergedData.latest.date = stats.latest.date; // Take the most recent date
    // mergedData.latest.cdsPercent += stats.latest.cdsPercent / categoryItems.length; // unweighted average
    mergedData.latest.cds += stats.latest.cds;
    mergedData.latest.presentational += stats.latest.presentational;
    mergedData.latest.totalCdsAndPresentational += stats.latest.totalCdsAndPresentational;
    mergedData.latest.totalOther += stats.latest.totalOther;
    mergedData.latest.cdsPercent =
      mergedData.latest.cds / mergedData.latest.totalCdsAndPresentational; // accounts for weighted avg

    // Find lowest versions for each package
    mergedData.latest.cdsCommonVersion = getLowestVersionBetweenTwo(
      sanitizeVersion(mergedData.latest.cdsCommonVersion),
      sanitizeVersion(stats.latest.cdsCommonVersion),
    );
    mergedData.latest.cdsWebVersion = getLowestVersionBetweenTwo(
      mergedData.latest.cdsWebVersion,
      sanitizeVersion(stats.latest.cdsWebVersion),
    );
    mergedData.latest.cdsMobileVersion = getLowestVersionBetweenTwo(
      mergedData.latest.cdsMobileVersion,
      sanitizeVersion(stats.latest.cdsMobileVersion),
    );

    mergedData.latest.cdsLatestVersion = stats.latest.cdsLatestVersion;
    mergedData.latest.latestCdsVersionPublished3MonthsAgo =
      stats.latest.latestCdsVersionPublished3MonthsAgo;

    // Check if any version is not up to date
    const upToDate = [
      mergedData.latest.cdsCommonVersion,
      mergedData.latest.cdsWebVersion,
      mergedData.latest.cdsMobileVersion,
    ].every((version) => {
      // Skip checking if the version is empty or undefined
      if (!version) return true;

      // Sanitize the version
      const sanitizedVersion = sanitizeVersion(version);
      const sanitizedLatestCdsVersionPublished3MonthsAgo = sanitizeVersion(
        mergedData.latest.latestCdsVersionPublished3MonthsAgo,
      );

      // Check if the version is valid and satisfies the condition
      return (
        semver.valid(sanitizedVersion) &&
        semver.gte(sanitizedVersion, sanitizedLatestCdsVersionPublished3MonthsAgo)
      );
    });

    mergedData.latest.upToDate = upToDate;
  });

  if (mergedData.latest.cdsCommonVersion === highPlaceHolderVersion)
    mergedData.latest.cdsCommonVersion = '';
  if (mergedData.latest.cdsWebVersion === highPlaceHolderVersion)
    mergedData.latest.cdsWebVersion = '';
  if (mergedData.latest.cdsMobileVersion === highPlaceHolderVersion)
    mergedData.latest.cdsMobileVersion = '';

  return mergedData;
}

/**
 * Generate Merged Stats Summary for each CUJ
 * @param coreUserJourneyConfig
 */
export function generateMergedCUJStatsSummary(coreUserJourneyConfig: AdoptersConfig[]) {
  coreUserJourneyConfig.forEach((category) => {
    const mergedData = mergeCategoryStats(category.items);

    if (mergedData) {
      // Ensure the directory exists
      const outputPath = path.join(cujOutputDir, `${category.id}`);
      fs.mkdirSync(outputPath, { recursive: true });
      const statsFilePath = path.join(outputPath, 'stats.json');

      // Check if the stats.json file already exists
      if (fs.existsSync(statsFilePath)) {
        const existingStatsRaw = fs.readFileSync(statsFilePath, 'utf8');
        const existingStats = JSON.parse(existingStatsRaw) as AdopterStats;

        // Move the existing latest entry to the beginning of the previous array
        if (existingStats.latest) {
          existingStats.previous.unshift(existingStats.latest);
        }

        // Update the latest entry with the new merged data
        existingStats.latest = mergedData.latest;

        // Write the updated stats back to the file
        fs.writeFileSync(statsFilePath, JSON.stringify(existingStats, null, 2));
      } else {
        // If the file does not exist, write the new merged data
        fs.writeFileSync(statsFilePath, JSON.stringify(mergedData, null, 2));
      }
    } else if (category.items.length === 1) {
      // If there's only one item, copy it's stats.json to output directory
      const singleItemStatsPath = path.join(
        cujDir,
        category.items[0].id || 'not found',
        'stats.json',
      );
      if (fs.existsSync(singleItemStatsPath)) {
        const statsData = fs.readFileSync(singleItemStatsPath, 'utf8');

        const outputPath = path.join(cujOutputDir, category.id || 'not found');

        fs.mkdirSync(outputPath, { recursive: true });
        fs.writeFileSync(
          path.join(outputPath, 'stats.json'),
          JSON.stringify(JSON.parse(statsData), null, 2),
        );
      }
    }
  });
  console.log('CUJ Overall Stat Summary files created successfully.');
}

/**
 * Generates the CUJ average report for CDS Adoption across all CUJs and latest
 * @param coreUserJourneyConfig
 */
export function generateCUJAverageReport(coreUserJourneyConfig: AdoptersConfig[]) {
  let totalCdsPercent = 0;
  let totalUpToDateCdsPercent = 0;
  let numUpToDate = 0;
  let latestCdsVerPublished3MonthsAgo;
  const totalProjects = coreUserJourneyConfig.length;

  coreUserJourneyConfig.forEach((project) => {
    const statsPath = path.join(cujOutputDir, project.id || 'default', 'stats.json');

    if (fs.existsSync(statsPath)) {
      const rawData = fs.readFileSync(statsPath, 'utf8');
      const stats = JSON.parse(rawData) as StatsData;

      const { cdsPercent, upToDate, latestCdsVersionPublished3MonthsAgo } = stats.latest;
      totalCdsPercent += cdsPercent;
      latestCdsVerPublished3MonthsAgo = latestCdsVersionPublished3MonthsAgo;

      if (upToDate) {
        totalUpToDateCdsPercent += cdsPercent;
        numUpToDate++;
      }
    } else {
      console.error(`Stats file not found for CUJ project ID: ${project.id}`);
    }
  });

  const summaryReportPath = path.join(cujOutputDir, 'cujSummaryReport.json');
  let previousReports: AdoptionStats[] = [];

  if (fs.existsSync(summaryReportPath)) {
    const existingDataRaw = fs.readFileSync(summaryReportPath, 'utf8');
    const existingData = JSON.parse(existingDataRaw) as StatsData;
    previousReports = existingData.previous;
    // Add the current latest to the previous reports array
    previousReports.unshift(existingData.latest);
  }

  const latestReport = {
    date: formatDate(new Date(), {
      hour: undefined,
      minute: undefined,
    }),
    overallCDSPercent: totalCdsPercent / totalProjects,
    overallLatestCDSPercent: numUpToDate > 0 ? totalUpToDateCdsPercent / numUpToDate : 0,
    numUpToDate,
    total: totalProjects,
    latestCdsVersionPublished3MonthsAgo: latestCdsVerPublished3MonthsAgo,
    totalUpToDateProjectPercentage: numUpToDate / totalProjects,
  };

  // Create the new data structure
  const newData = {
    latest: latestReport,
    previous: previousReports,
  };

  // Write the new data to the file
  fs.writeFileSync(summaryReportPath, JSON.stringify(newData, null, 2));

  console.log('CUJ Summary Report updated successfully.');
}

/**
 * Helper for generateMergedCUJComponentSummary. Merge the components.json files within the same CUJ Category
 * @param categoryItems
 * @returns merged components.json data for cujs
 */
function mergeCategoryComponents(
  categoryItems: (AdopterConfig | AdoptersConfig)[],
): Record<'cds' | 'presentational' | 'other', ComponentData[]> {
  const mergedComponents: Record<'cds' | 'presentational' | 'other', ComponentData[]> = {
    cds: [],
    presentational: [],
    other: [],
  };

  function findComponent(
    componentList: ComponentData[],
    name: string,
    sourceFile: string,
  ): ComponentData | undefined {
    return componentList.find((c) => c.name === name && c.sourceFile === sourceFile);
  }

  function mergePropsWithCallSites(
    existingProps: Record<string, Record<string, number>>,
    newProps: Record<string, Record<string, number>>,
  ): void {
    Object.keys(newProps).forEach((prop) => {
      if (!existingProps[prop]) {
        existingProps[prop] = { ...newProps[prop] };
      } else {
        Object.keys(newProps[prop]).forEach((callSite) => {
          existingProps[prop][callSite] =
            (existingProps[prop][callSite] || 0) + newProps[prop][callSite];
        });
      }
    });
  }

  function mergeCallSites(
    existingCallSites: Record<string, number>,
    newCallSites: Record<string, number>,
  ): void {
    Object.keys(newCallSites).forEach((callSite) => {
      existingCallSites[callSite] = (existingCallSites[callSite] || 0) + newCallSites[callSite];
    });
  }

  function mergeAliasedCdsComponents(
    existingAliases: ComponentData['aliasedCdsComponents'],
    newAliases: ComponentData['aliasedCdsComponents'],
  ): void {
    const existing = existingAliases || [];
    const newAliasesArray = newAliases || [];

    newAliasesArray.forEach((newAlias) => {
      const existingAlias = existing.find((alias) => alias.aliasPath === newAlias.aliasPath);
      if (existingAlias) {
        newAlias.callSites.forEach((newCallSite) => {
          if (!existingAlias.callSites.includes(newCallSite)) {
            existingAlias.callSites.push(newCallSite);
          }
        });
      } else {
        existing.push(newAlias);
      }
    });
  }

  function mergeIndividualComponent(
    mergedComponent: ComponentData,
    component: ComponentData,
  ): void {
    mergedComponent.totalInstances += component.totalInstances;
    mergedComponent.totalCallSites += component.totalCallSites;

    if (component.propsWithCallSites) {
      mergedComponent.propsWithCallSites = mergedComponent.propsWithCallSites || {};
      mergePropsWithCallSites(mergedComponent.propsWithCallSites, component.propsWithCallSites);
    }

    if (component.callSites) {
      mergedComponent.callSites = mergedComponent.callSites || {};
      mergeCallSites(mergedComponent.callSites, component.callSites);
    }

    if (component.aliasedCdsComponents) {
      mergedComponent.aliasedCdsComponents = mergedComponent.aliasedCdsComponents || [];
      mergeAliasedCdsComponents(
        mergedComponent.aliasedCdsComponents,
        component.aliasedCdsComponents,
      );
    }
  }

  categoryItems.forEach((item) => {
    const componentsPath = path.join(cujDir, item.id || 'default', 'components.json');
    if (fs.existsSync(componentsPath)) {
      const rawData = fs.readFileSync(componentsPath, 'utf8');
      const components: Record<'cds' | 'presentational' | 'other', ComponentData[]> = JSON.parse(
        rawData,
      ) as Record<'cds' | 'presentational' | 'other', ComponentData[]>;
      const categories: ('cds' | 'presentational' | 'other')[] = ['cds', 'presentational', 'other'];

      categories.forEach((category) => {
        components[category]?.forEach((component) => {
          const existingComponent = findComponent(
            mergedComponents[category],
            component.name,
            component.sourceFile,
          );
          if (existingComponent) {
            mergeIndividualComponent(existingComponent, component);
          } else {
            mergedComponents[category].push({ ...component });
          }
        });
      });
    }
  });

  return mergedComponents;
}

/**
 * Generate Merged Stats Summary for each CUJ
 * @param coreUserJourneyConfig
 */
export function generateMergedCUJComponentSummary(coreUserJourneyConfig: AdoptersConfig[]) {
  coreUserJourneyConfig.forEach((category) => {
    const mergedData = mergeCategoryComponents(category.items);

    if (mergedData) {
      // Ensure the directory exists
      const outputPath = path.join(cujOutputDir, `${category.id}`);
      fs.mkdirSync(outputPath, { recursive: true });
      const componentsFilePath = path.join(outputPath, 'components.json');

      // If the file does not exist, write the new merged data
      fs.writeFileSync(componentsFilePath, JSON.stringify(mergedData, null, 2));
    } else if (category.items.length === 1) {
      // If there's only one item, copy it's components.json to output directory
      const singleItemComponentsPath = path.join(
        cujDir,
        category.items[0].id || 'not found',
        'components.json',
      );
      if (fs.existsSync(singleItemComponentsPath)) {
        const componentsData = fs.readFileSync(singleItemComponentsPath, 'utf8');

        const outputPath = path.join(cujOutputDir, category.id || 'not found');

        fs.mkdirSync(outputPath, { recursive: true });
        fs.writeFileSync(
          path.join(outputPath, 'components.json'),
          JSON.stringify(JSON.parse(componentsData), null, 2),
        );
      }
    }
  });
  console.log('CUJ Overall Components Summary files created successfully.');
}
