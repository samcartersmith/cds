/* eslint-disable global-require */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import { Button, IconButton } from '@cbhq/cds-web/buttons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextBody, TextTitle1 } from '@cbhq/cds-web/typography';
import { ChartData } from '@cbhq/cds-web-visualization';

import { StatsTextStack } from ':cds-website/components/StatsTextStack';
import { Tabs } from ':cds-website/components/Tabs';

import { AdopterComponentsList } from '../ComponentsList';

import { AdopterTabProvider } from './context/AdopterTabProvider';
import { useAdopterComponents } from './hooks/useAdopterComponents';
import { useAdopterProjectInfo } from './hooks/useAdopterProjectInfo';
import { useAdopterStats } from './hooks/useAdopterStats';
import { useAdoptionPercent } from './hooks/useAdoptionPercent';
import { useOkrPlanningComponents } from './hooks/useOkrPlanningComponents';
import { AdopterSearchProvider } from './search/AdopterSearchProvider';
import { downloadCSV } from './utils/downloadCSV';
import { getCdsRecs } from './utils/getCdsRecs';
import { AdopterStatsBreakdown } from './AdopterStatsBreakdown';
import { AdoptionChart } from './AdoptionChart';
import { ComponentData } from './types';

type AdoptionImpactReports = {
  adoptionTrackerCSVData: string;
  collectiveProjectReportCSVData: string;
};

const ADOPTION_AND_PROJECT_IMPACT_REPORT_DATA =
  require(`@site/static/data/__generated__/adoption/adoption_and_impact_reports.json`) as AdoptionImpactReports;

function formatWeekData(projectId: string): { value: number; date: Date }[] {
  const { collectiveProjectReportCSVData } = ADOPTION_AND_PROJECT_IMPACT_REPORT_DATA;

  // filter collectiveProjectReportCSVData to only include the rows for the current project
  // format the data to be in the format that the sparkline chart expects

  return collectiveProjectReportCSVData
    .split('\n')
    .slice(1) // removes header
    .filter((line) => {
      // only return rows that are not empty and are for the current project
      const project = line.split(',')[2];
      return line !== '' && project === projectId;
    })
    .map((line) => {
      // convert each row into an object with a date and value for JSON
      const lineArray = line.split(',');
      const adoptionRate = lineArray[3];
      const percent = Number(adoptionRate);
      return {
        date: new Date(lineArray[0]),
        value: Number(percent),
      };
    });
}

const AdopterTabs = memo(() => {
  const { id } = useAdopterProjectInfo();
  const { cds, presentational, other } = useAdopterComponents();
  const okrPlanning = useOkrPlanningComponents();

  const values = useMemo(() => {
    return [
      {
        label: 'CDS',
        id: 'cds',
        content: <AdopterComponentsList key="cds" components={cds.components} type="cds" />,
      },
      {
        label: 'Presentational',
        id: 'nonCds',
        content: (
          <AdopterComponentsList
            key="presentational"
            components={presentational.components}
            type="presentational"
          />
        ),
      },
      {
        label: 'Other',
        id: 'other',
        content: <AdopterComponentsList key="other" components={other.components} type="other" />,
      },
      {
        label: 'OKR Planning',
        id: 'okrPlanning',
        content: <AdopterComponentsList key="okr" components={okrPlanning} type="okr" />,
      },
    ];
  }, [cds.components, okrPlanning, other.components, presentational.components]);
  return <Tabs defaultTab="cds" id={`adopter-${id}`} values={values} />;
});

AdopterTabs.displayName = 'AdopterTabs';

const RouterLink = (props: React.ComponentProps<typeof Link>) => (
  <Link {...props} to="/adoption-tracker-overview" />
);

function convertArrayOfObjectsToCSV(data: ComponentData[]) {
  const csvHeader =
    'Custom Component Name,Suggested CDS Replacement,Call Site, Num of Instances Per Callsite';

  // iterate over all custom components and for each one, iterate over all call sites and create a row
  const csvRows = data.map((componentObject: ComponentData) => {
    const { name, callSites: potentialCallSites } = componentObject;
    const callSiteRecord = potentialCallSites ?? {};
    const callSites = Object.keys(callSiteRecord);
    const cdsRecommendations = getCdsRecs(name);

    const componentRows = callSites.map((callSite: string) => {
      return `${name},${cdsRecommendations.join('|')},${callSite},${callSiteRecord[callSite]}`;
    });

    return `${componentRows.join('\n')}`;
  });

  return `${csvHeader}\n${csvRows.join('\n')}`;
}

export const AdopterDetails = memo(() => {
  const { label, id } = useAdopterProjectInfo();
  const { latest } = useAdopterStats();
  const okrPlanning = useOkrPlanningComponents();
  const [sparklineData, setSparklineData] = useState<Record<string, ChartData> | undefined>();

  useEffect(() => {
    setSparklineData({
      week: formatWeekData(id),
    });
  }, [id]);

  const handleDownload = useCallback(() => {
    const csvData = convertArrayOfObjectsToCSV(okrPlanning);
    const fileName = `okr-planning-${label}.csv`;

    downloadCSV(csvData, fileName);
  }, [label, okrPlanning]);

  return (
    <VStack>
      <VStack gap={3} spacingBottom={6}>
        <HStack alignItems="flex-start" justifyContent="space-between" spacingBottom={2}>
          <VStack gap={1}>
            <HStack alignItems="center" gap={2}>
              <IconButton transparent as={RouterLink} name="backArrow" />
              <TextTitle1 as="h1">{label}</TextTitle1>
              <TextBody as="p">{`Last updated ${latest.date}`}</TextBody>
            </HStack>
            <Button onPress={handleDownload} variant="secondary">
              Download OKR Planning
            </Button>
          </VStack>
          <HStack gap={6} width={240}>
            <StatsTextStack label="CDS" stat={useAdoptionPercent('cds')} />
            <StatsTextStack label="Product" stat={useAdoptionPercent('presentational')} />
          </HStack>
        </HStack>
        <AdopterStatsBreakdown />
        {sparklineData && <AdoptionChart chartData={sparklineData} />}
      </VStack>
      <AdopterTabProvider>
        <AdopterSearchProvider>
          <AdopterTabs />
        </AdopterSearchProvider>
      </AdopterTabProvider>
    </VStack>
  );
});

AdopterDetails.displayName = 'AdopterDetails';
