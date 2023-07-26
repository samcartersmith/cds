/* eslint-disable global-require */
import React, { useCallback } from 'react';
import { Button, ButtonGroup } from '@cbhq/cds-web/buttons';
import { HStack, VStack } from '@cbhq/cds-web/layout';

import { downloadCSV } from './utils/downloadCSV';
import { AdoptionChart } from './AdoptionChart';
import { ImpactChart } from './ImpactChart';

type AdoptionImpactReports = {
  adoptionTrackerCSVData: string;
  collectiveProjectReportCSVData: string;
};

const ADOPTION_AND_PROJECT_IMPACT_REPORT_DATA =
  require(`@site/static/data/__generated__/adoption/adoption_and_impact_reports.json`) as AdoptionImpactReports;

function formatWeekData(): { value: number; date: Date }[] {
  const { adoptionTrackerCSVData } = ADOPTION_AND_PROJECT_IMPACT_REPORT_DATA;

  return adoptionTrackerCSVData
    .split('\n') // split into array of lines
    .slice(1) // remove csv header, just keep the data
    .filter((line) => line !== '') // remove any empty lines
    .map((line) => {
      // convert each line into an object with a date and value for JSON
      const lineArray = line.split(',');
      const adoptionRate = lineArray[2];
      const percent = Number(adoptionRate);
      return {
        date: new Date(lineArray[0]),
        value: Number(percent),
      };
    });
}

function formatAggregateImpactData(): { value: number; date: Date }[] {
  const { collectiveProjectReportCSVData } = ADOPTION_AND_PROJECT_IMPACT_REPORT_DATA;
  const adoptionTrackerCSVDataArray = collectiveProjectReportCSVData
    .split('\n') // split into array of lines
    .slice(1) // remove csv header, just keep the data
    .filter((line) => line !== ''); // remove any empty lines

  // aggregate the data by date and Total Impact value
  const aggregateImpactData = adoptionTrackerCSVDataArray.reduce(
    (acc: Record<string, number>, line: string) => {
      const lineArray = line.split(',');
      const date = lineArray[0];
      const impact = Number(lineArray[7]);
      if (acc[date]) {
        acc[date] += impact;
      } else {
        acc[date] = impact;
      }
      return acc;
    },
    {},
  );
  return Object.keys(aggregateImpactData).map((impactDate) => {
    return {
      value: aggregateImpactData[impactDate],
      date: new Date(impactDate),
    };
  });
}

const sparklineDataWithTime = {
  week: formatWeekData(),
};

const sparklineDataForAggregateImapct = {
  week: formatAggregateImpactData(),
};

export const HistoricalCharts = () => {
  const handleAdoptionDataDownload = useCallback(async () => {
    const fileName = `adoption_rate.csv`;

    downloadCSV(ADOPTION_AND_PROJECT_IMPACT_REPORT_DATA.adoptionTrackerCSVData, fileName);
  }, []);

  const handleImpactReportDownload = useCallback(async () => {
    const fileName = `project_impact_reports.csv`;

    downloadCSV(ADOPTION_AND_PROJECT_IMPACT_REPORT_DATA.collectiveProjectReportCSVData, fileName);
  }, []);

  return (
    <VStack gap={8}>
      <HStack width="300px">
        <ButtonGroup>
          <Button block variant="primary" onPress={handleAdoptionDataDownload} compact>
            Download Adoption Data
          </Button>
          <Button block variant="secondary" onPress={handleImpactReportDownload} compact>
            Download Impact Report
          </Button>
        </ButtonGroup>
      </HStack>
      <AdoptionChart chartData={sparklineDataWithTime} />
      <ImpactChart chartData={sparklineDataForAggregateImapct} />
    </VStack>
  );
};

HistoricalCharts.displayName = 'HistoricalCharts';
