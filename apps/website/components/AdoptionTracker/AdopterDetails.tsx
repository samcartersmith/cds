import React, { memo, useCallback, useMemo } from 'react';
import Link from '@docusaurus/Link';
import { Button, IconButton } from '@cbhq/cds-web/buttons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextBody, TextTitle1 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

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
import { getCdsRecs } from './utils/getCdsRecs';
import { AdopterStatsBreakdown } from './AdopterStatsBreakdown';
import { ComponentData } from './types';

const AdopterTabs = memo(() => {
  const { id } = useAdopterProjectInfo();
  const { cds, presentational, other } = useAdopterComponents();
  const okrPlanning = useOkrPlanningComponents();

  const values = useMemo(() => {
    return [
      {
        label: 'CDS',
        id: 'cds',
        content: <AdopterComponentsList key="cds" type="cds" components={cds.components} />,
      },
      {
        label: 'Presentational',
        id: 'nonCds',
        content: (
          <AdopterComponentsList
            key="presentational"
            type="presentational"
            components={presentational.components}
          />
        ),
      },
      {
        label: 'Other',
        id: 'other',
        content: <AdopterComponentsList key="other" type="other" components={other.components} />,
      },
      {
        label: 'OKR Planning',
        id: 'okrPlanning',
        content: <AdopterComponentsList key="okr" type="okr" components={okrPlanning} />,
      },
    ];
  }, [cds.components, okrPlanning, other.components, presentational.components]);
  return <Tabs id={`adopter-${id}`} defaultTab="cds" values={values} />;
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

function downloadCSV(csvData: string, fileName: string) {
  // Creating a Blob for having a csv file format
  // and passing the data with type
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Creating an object for downloading url
  const url = getBrowserGlobals()?.window.URL.createObjectURL(blob);

  // Creating an anchor(a) tag of HTML
  const a = getBrowserGlobals()?.document.createElement('a');

  if (a) {
    // Passing the blob downloading url
    a.setAttribute('href', url ?? '');

    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', fileName);

    // Performing a download with click
    a.click();
  }
}

export const AdopterDetails = memo(() => {
  const { label } = useAdopterProjectInfo();
  const { latest } = useAdopterStats();
  const okrPlanning = useOkrPlanningComponents();

  const handleDownload = useCallback(() => {
    const csvData = convertArrayOfObjectsToCSV(okrPlanning);
    const fileName = `okr-planning-${label}.csv`;

    downloadCSV(csvData, fileName);
  }, [label, okrPlanning]);

  return (
    <VStack>
      <VStack>
        <HStack alignItems="flex-start" justifyContent="space-between" spacingBottom={2}>
          <VStack gap={1}>
            <HStack alignItems="center" gap={2}>
              <IconButton as={RouterLink} transparent name="backArrow" />
              <TextTitle1 as="h1">{label}</TextTitle1>
              <TextBody as="p">{`Last updated ${latest.date}`}</TextBody>
            </HStack>
            <Button variant="secondary" onPress={handleDownload}>
              Download OKR Planning
            </Button>
          </VStack>
          <HStack width={240} gap={6}>
            <StatsTextStack label="CDS" stat={useAdoptionPercent('cds')} />
            <StatsTextStack label="Product" stat={useAdoptionPercent('presentational')} />
          </HStack>
        </HStack>
        <AdopterStatsBreakdown />
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
