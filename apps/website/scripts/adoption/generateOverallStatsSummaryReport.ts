import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';

import { OverallSummaryStats, SummaryReport } from '../../components/AdoptionTracker/types';
import { adopters } from '../../data/__generated__/adoption/adopters';

import { formatDate } from './utils/formatDate';
import { getCDSCommonPackageJsonFromThreeMonthsAgo } from './utils/getOldCDSVersion';
import {
  EXCLUDED_PILLARS,
  getAllProjectCDSVersionsForPillar,
  getPercentage,
  getPercentageChange,
  getPercentProductsWithinCDS,
  getSortedProjectPairs,
} from './utils/getOverallSummaryStats';
import { PillarAdoptionData, PillarProjectData } from './types';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? '';
const ADOPTION_REPORTS_DIR = path.join(
  MONOREPO_ROOT,
  'apps/website/static/data/__generated__/adoption',
);

let cdsAdoptionByPillar: PillarAdoptionData[] = [];

function populateCDSAdoptionPercentageListByPillar() {
  const uniquePillars = new Set(adopters.map(({ pillar }) => pillar));
  cdsAdoptionByPillar = [];
  uniquePillars.forEach((pillar: string) => {
    const { percentageText } = getPercentage({ pillar, excludedPillars: EXCLUDED_PILLARS });
    const adoptionPercentageForPillarObj = getPercentage({
      pillar,
      isUpToDateOnly: true,
      excludedPillars: EXCLUDED_PILLARS,
    });

    cdsAdoptionByPillar.push({
      pillar,
      cdsPercentAdoption: percentageText,
      cdsPercentAdoptionWithinLatest3Months: adoptionPercentageForPillarObj.percentageText,
    });
  });
}

// Create Report for Overall Version % and PG Version %
async function generateOverallStatsSummaryReport(statsPaths: string[]) {
  populateCDSAdoptionPercentageListByPillar();

  // get @cbhq/cds-common version from 3 months ago using git show
  const cdsCommonsPackageFrom3MonthsAgo = await getCDSCommonPackageJsonFromThreeMonthsAgo();
  const cdsCommonsVersionFrom3MonthsAgo = cdsCommonsPackageFrom3MonthsAgo.version;

  const totalProjectVersionsList: PillarProjectData[] = [];
  getSortedProjectPairs(adopters).forEach(([pillar, projectsInPillar]) => {
    totalProjectVersionsList.push({
      pillar,
      allProjectVersions: getAllProjectCDSVersionsForPillar(
        statsPaths,
        cdsCommonsVersionFrom3MonthsAgo,
        pillar,
      ),
      totalProjectsCount: projectsInPillar.length,
    });
  });

  const summaryReport: SummaryReport = {
    companyWide: {
      cdsAdoption: '0',
      latestCDSAdoption: '0',
      getPercentageChangeAll: '0',
      getPercentageChangeLatest: '0',
    },
  };

  const { diff, changePercentageText: changePercentageTextAll } = getPercentageChange({
    excludedPillars: EXCLUDED_PILLARS,
  });

  const { diff: diffLatest, changePercentageText: changePercentageTextLatest } =
    getPercentageChange({
      excludedPillars: EXCLUDED_PILLARS,
      upToDate: true,
    });

  summaryReport.companyWide.cdsAdoption = getPercentage({
    excludedPillars: EXCLUDED_PILLARS,
  }).percentageText;

  summaryReport.companyWide.latestCDSAdoption = getPercentProductsWithinCDS({
    totalProjectVersionsList,
    excludedPillars: EXCLUDED_PILLARS,
  }).toFixed(2);

  summaryReport.companyWide.getPercentageChangeAll =
    diff !== '' ? changePercentageTextAll : 'No change';
  summaryReport.companyWide.getPercentageChangeLatest =
    diffLatest !== '' ? changePercentageTextLatest : 'No change';

  cdsAdoptionByPillar.forEach((entry) => {
    if (entry.pillar !== 'Other') {
      const { pillar, cdsPercentAdoption } = entry;
      const latestCDSAdoptionPercentage = getPercentProductsWithinCDS({
        totalProjectVersionsList,
        pillar,
        excludedPillars: EXCLUDED_PILLARS,
      });

      summaryReport[pillar] = {
        cdsAdoption: cdsPercentAdoption,
        latestCDSAdoption: `${latestCDSAdoptionPercentage.toFixed(2)}%`,
      };
    }
  });

  const fullSummaryReport = {
    date: formatDate(new Date(), {
      hour: undefined,
      minute: undefined,
    }),
    summaryReport,
    totalProjectVersionsList,
  };

  const filePath = `${ADOPTION_REPORTS_DIR}/adoption_overall_stats_summary.json`;
  const extractedFilePath = `${ADOPTION_REPORTS_DIR}/snowflake_adoption_stats.json`;

  let existingData: OverallSummaryStats[] = [];

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read and parse existing data
    const fileContent = fs.readFileSync(filePath, 'utf8');
    existingData = JSON.parse(fileContent) as OverallSummaryStats[];
  }

  // Append new data to the existing data
  existingData.unshift(fullSummaryReport);

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  // Write latest entry to new file for snowflake upload
  const firstEntry = existingData[0];
  fs.writeFileSync(extractedFilePath, JSON.stringify(firstEntry, null, 2));
}

export async function generateOverallStatsReport() {
  const statsPaths = await glob(`apps/website/static/data/__generated__/adoption/*/stats.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  // Search for files matching the pattern
  if (statsPaths.length === 0) {
    console.error(`No files found matching the pattern.`);
    process.exit(1);
  }

  // Create Report for Overall Version % and PG Version %
  await generateOverallStatsSummaryReport(statsPaths);
}

void generateOverallStatsReport();
