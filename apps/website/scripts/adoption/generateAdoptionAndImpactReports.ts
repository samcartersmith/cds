import { parse } from 'date-fns';
import glob from 'fast-glob';
import fs from 'fs';
import getFirst from 'lodash/first';
import path from 'path';

import { OverallSummaryStats } from '../../components/AdoptionTracker/types';
import { hiddenAdopters } from '../../data/__generated__/adoption/adopters-hidden';

type Entry = {
  date: string;
  period?: string;
  cdsPercent: number;
  cds: number;
  totalCdsAndPresentational: number;
  upToDate: boolean;
};

type JSONData = {
  latest: Entry;
  previous: Entry[];
};

type StatsData = {
  cdsPercent: number;
  totalCdsAndPresentational: number;
  cds: number;
};

type HistoricalProjectData = {
  data: Record<string, Record<string, StatsData>>;
  sortedDates: string[];
};

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? '';
const ADOPTION_REPORTS_DIR = path.join(
  MONOREPO_ROOT,
  'apps/website/static/data/__generated__/adoption',
);

function saveToFile(data: string, fileName: string): void {
  fs.writeFileSync(fileName, data);
  console.log(`File "${fileName}" saved successfully.`);
}

function getExcludedProjects() {
  const excludedProjects: string[] = [];
  const overallSummaryStatsObj =
    require(`${ADOPTION_REPORTS_DIR}/adoption_overall_stats_summary.json`) as OverallSummaryStats[];

  const overallStatsSummary: OverallSummaryStats | undefined =
    getFirst(overallSummaryStatsObj) || undefined;

  if (overallStatsSummary?.totalProjectVersionsList) {
    overallStatsSummary.totalProjectVersionsList.forEach((entry) => {
      entry.allProjectVersions.forEach((project) => {
        if (project.pillar === 'Other') {
          excludedProjects.push(project.id);
        }
      });
    });
  }
  return excludedProjects;
}

async function getHistoricalData(
  statsPaths: string[],
  upToDate?: boolean,
): Promise<HistoricalProjectData> {
  const allHistoricalProjectData: HistoricalProjectData['data'] = {};

  await Promise.all(
    statsPaths.map(async (statsPath) => {
      // exclude stats from hidden adopters
      const projectName = path.basename(path.dirname(statsPath));
      const isHidden = hiddenAdopters.some((hiddenAdopter) => hiddenAdopter.id === projectName);
      if (isHidden) {
        return;
      }

      // Read the stats.json file to get data
      const jsonData = JSON.parse(fs.readFileSync(statsPath, 'utf8')) as JSONData;

      // If upToDate is true and jsonData.upToDate is false, skip this file
      if (upToDate && !jsonData.latest?.upToDate) {
        return;
      }

      // Handles latest data
      // if date a key in historical data, then add project & cdsPercent to it.
      // otherwise, create new date key then add project/cdsPercent to it
      const { latest, previous } = jsonData;
      const { date: adoptionDate, cdsPercent, cds, totalCdsAndPresentational } = latest;
      if (!allHistoricalProjectData[adoptionDate]) {
        allHistoricalProjectData[adoptionDate] = {
          [statsPath]: { cdsPercent, cds, totalCdsAndPresentational },
        };
      } else {
        allHistoricalProjectData[adoptionDate][statsPath] = {
          cdsPercent,
          cds,
          totalCdsAndPresentational,
        };
      }

      previous.forEach((entry) => {
        const {
          date,
          cdsPercent: percent,
          cds: numOfCmpts,
          totalCdsAndPresentational: totalCmpts,
        } = entry;
        if (!allHistoricalProjectData[date]) {
          allHistoricalProjectData[date] = {
            [statsPath]: {
              cdsPercent: percent,
              cds: numOfCmpts,
              totalCdsAndPresentational: totalCmpts,
            },
          };
        } else {
          allHistoricalProjectData[date][statsPath] = {
            cdsPercent: percent,
            cds: numOfCmpts,
            totalCdsAndPresentational: totalCmpts,
          };
        }
      });
    }),
  );

  // Sort keys of historical project data from oldest to latest date
  const sortedHistoricalProjectDataKeys = Object.keys(allHistoricalProjectData).sort((a, b) => {
    const dateA = parse(a, 'M/d/yyyy', new Date());
    const dateB = parse(b, 'M/d/yyyy', new Date());
    return dateA.getTime() - dateB.getTime();
  });

  return {
    data: allHistoricalProjectData,
    sortedDates: sortedHistoricalProjectDataKeys,
  };
}

function getPeriodString(date: string) {
  const month = date.split('/')[0];
  const year = date.split('/')[2];
  return `Q${Math.ceil(parseInt(month) / 3)}${year}`;
}

function getLastDateInPeriod(allHistoricalProjectData: HistoricalProjectData): string[] {
  // filter sorted dates for the last date in a period
  const lastDates = allHistoricalProjectData.sortedDates.filter((date, index) => {
    if (allHistoricalProjectData.sortedDates[index + 1]) {
      return (
        getPeriodString(date) !== getPeriodString(allHistoricalProjectData.sortedDates[index + 1])
      );
    }
    return true;
  });

  return lastDates;
}

function generateAdoptionTrackerCSVDataExcludingOther(
  allHistoricalProjectData: HistoricalProjectData,
  excludedProjects: string[],
) {
  const adoptionTrackerCSVDataExcludingOther: string[] = [];

  allHistoricalProjectData.sortedDates.forEach((date) => {
    const projects = allHistoricalProjectData.data[date];
    let sumCdsCmpts = 0;
    let sumTotalCmpts = 0;
    let projectCount = 0;

    Object.entries(projects).forEach(([projectPath, stats]) => {
      const projectName = path.basename(path.dirname(projectPath));
      if (!excludedProjects.includes(projectName)) {
        sumCdsCmpts += stats.cds;
        sumTotalCmpts += stats.totalCdsAndPresentational;
        projectCount++;
      }
    });
    const averageCdsPercent = sumCdsCmpts / sumTotalCmpts;

    if (projectCount >= 15) {
      adoptionTrackerCSVDataExcludingOther.push(
        `${date},${getPeriodString(date)},${averageCdsPercent}`,
      );
    }
  });

  return `Date,Period,Company-wide Adoption Rate\n${adoptionTrackerCSVDataExcludingOther.join(
    '\n',
  )}`;
}

function generateAdoptionTrackerCSVDataExcludingOtherLatest(
  allHistoricalProjectData: HistoricalProjectData,
  excludedProjects: string[],
) {
  const adoptionTrackerCSVDataExcludingOther: string[] = [];

  allHistoricalProjectData.sortedDates.forEach((date) => {
    const projects = allHistoricalProjectData.data[date];
    let sumCdsCmpts = 0;
    let sumTotalCmpts = 0;
    let projectCount = 0;

    Object.entries(projects).forEach(([projectPath, stats]) => {
      const projectName = path.basename(path.dirname(projectPath));
      if (!excludedProjects.includes(projectName)) {
        sumCdsCmpts += stats.cds;
        sumTotalCmpts += stats.totalCdsAndPresentational;
        projectCount++;
      }
    });
    const averageCdsPercent = sumCdsCmpts / sumTotalCmpts;

    if (projectCount >= 15) {
      adoptionTrackerCSVDataExcludingOther.push(
        `${date},${getPeriodString(date)},${averageCdsPercent}`,
      );
    }
  });

  return `Date,Period,Company-wide Adoption Rate\n${adoptionTrackerCSVDataExcludingOther.join(
    '\n',
  )}`;
}

function generateAdoptionTrackerCSVData(allHistoricalProjectData: HistoricalProjectData) {
  const adoptionTrackerCSVData: string[] = [];

  // create adoption tracker csv data for each date in historical project data
  allHistoricalProjectData.sortedDates.forEach((date) => {
    const projects = allHistoricalProjectData.data[date];
    const projectCount = Object.keys(projects).length;
    const sumCdsCmpts = Object.values(projects).reduce((acc, curr) => acc + curr.cds, 0);
    const sumTotalCmpts = Object.values(projects).reduce(
      (acc, curr) => acc + curr.totalCdsAndPresentational,
      0,
    );
    const averageCdsPercent = sumCdsCmpts / sumTotalCmpts;

    // we have some stats data with only 1 or 2 stats files which skews the data (e.g. 100% adoption rate with 1 project)
    if (projectCount >= 15) {
      adoptionTrackerCSVData.push(`${date},${getPeriodString(date)},${averageCdsPercent}`);
    }
  });

  return `Date,Period,Company-wide Adoption Rate\n${adoptionTrackerCSVData.join('\n')}`;
}

function generateCollectiveProjectCSVData(allHistoricalProjectData: HistoricalProjectData) {
  // Date, Period, Project, CDS Adoption, Num of CDS components Used , Design Impact, Engineering Impact, Total Impact
  // get the last date in a period, then get the projects for that date. for each project, get cds cmpt data
  const lastDatesInPeriod = getLastDateInPeriod(allHistoricalProjectData);
  const collectiveProjectReportCSVData: string[] = [];

  lastDatesInPeriod.forEach((date) => {
    const projects = allHistoricalProjectData.data[date];
    Object.keys(projects).forEach((projectPath) => {
      const { cds, cdsPercent } = projects[projectPath];
      const projectName = path.basename(path.dirname(projectPath));

      // formula rationale: https://docs.google.com/document/d/19eMyf1Tkf42kFFup5Rx575r6ngs81wE1qwMwaCArkcY/edit#bookmark=id.tqtnsrv9usm5
      const designImpact = cds * 7; // 7 mins per component
      const engineeringImpact = cds * 7; // 7 mins per component

      // Convert mins to hours and round up
      const totalImpact = Math.ceil((designImpact + engineeringImpact) / 60);
      collectiveProjectReportCSVData.push(
        `${date},${getPeriodString(
          date,
        )},${projectName},${cdsPercent},${cds},${designImpact},${engineeringImpact},${totalImpact}`,
      );
    });
  });

  return `Date,Period,Project,CDS Adoption,Num of CDS components Used,Design Impact,Engineering Impact,Total Impact\n${collectiveProjectReportCSVData.join(
    '\n',
  )}`;
}

export async function generateAdoptionAndImpactReports() {
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

  // Generate collection of all data to easily parse for reports
  const allHistoricalProjectData = await getHistoricalData(statsPaths);

  // Create Adoption Rate CSV String
  const adoptionTrackerCSVData = generateAdoptionTrackerCSVData(allHistoricalProjectData);

  // Create Adoption Rate CSV String without excluded projects
  const adoptionTrackerCSVDataExcludeOther = generateAdoptionTrackerCSVDataExcludingOther(
    allHistoricalProjectData,
    getExcludedProjects(),
  );

  const adoptionTrackerCSVDataExcludeOtherLatest =
    generateAdoptionTrackerCSVDataExcludingOtherLatest(
      await getHistoricalData(statsPaths, true),
      getExcludedProjects(),
    );

  // Create Collective Project Report CSV String
  const collectiveProjectReportCSVData = generateCollectiveProjectCSVData(allHistoricalProjectData);

  // Create json file for both reports to be used in the website adoption page
  const adoptionAndImpactReports = {
    adoptionTrackerCSVData,
    collectiveProjectReportCSVData,
    adoptionTrackerCSVDataExcludeOther,
    adoptionTrackerCSVDataExcludeOtherLatest,
  };
  saveToFile(
    JSON.stringify(adoptionAndImpactReports, null, 2),
    `${ADOPTION_REPORTS_DIR}/adoption_and_impact_reports.json`,
  );
}

void generateAdoptionAndImpactReports();
