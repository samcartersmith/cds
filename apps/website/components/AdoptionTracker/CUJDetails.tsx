import React, { memo, useMemo } from 'react';
import Link from '@docusaurus/Link';
import { IconButton } from '@cbhq/cds-web/buttons';
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { TextBody, TextTitle1, TextTitle2 } from '@cbhq/cds-web/typography';

import { StatsTextStack, StatsVersionStatusStack } from ':cds-website/components/StatsTextStack';

import { AdopterComponentsList } from '../ComponentsList';
import { Tabs } from '../Tabs';

import { AdopterTabProvider } from './context/AdopterTabProvider';
import { useAdopterComponents } from './hooks/useAdopterComponents';
import { useAdopterStats } from './hooks/useAdopterStats';
import { useAdoptionPercent } from './hooks/useAdoptionPercent';
import { useOkrPlanningComponents } from './hooks/useOkrPlanningComponents';
import { AdopterSearchProvider } from './search/AdopterSearchProvider';
import { AdopterStatsBreakdown } from './AdopterStatsBreakdown';
import { getLowestVersion } from './AdopterVersionCell';
import { PercentChange } from './AdoptionTrackerOverview';
import { CUJBreakdownByRepo, DetailStatCUJCell } from './CUJOverview';

const RouterLink = (props: React.ComponentProps<typeof Link>) => (
  <Link {...props} to="/cuj-overview" />
);

const AdopterCUJTabs = memo(({ id }: { id: string }) => {
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

export const CUJDetails = memo(({ id, title }: { id: string; title: string }) => {
  const { latest, previous } = useAdopterStats();

  const { lowestVersion } = getLowestVersion(
    latest.cdsCommonVersion,
    latest.cdsWebVersion,
    latest.cdsMobileVersion,
  );

  return (
    <VStack>
      <VStack gap={3} spacingBottom={6}>
        <HStack alignItems="flex-start" justifyContent="space-between" spacingBottom={2}>
          <VStack gap={1} width="35%">
            <HStack alignItems="center" gap={1}>
              <IconButton transparent as={RouterLink} name="backArrow" />
              <TextTitle1 as="h1">{title}</TextTitle1>
              <TextBody align="end" as="p">{`Last updated ${latest.date}`}</TextBody>
            </HStack>
          </VStack>
          <HStack gap={6} width={550}>
            <StatsTextStack label="CDS" stat={useAdoptionPercent('cds')} />
            <StatsTextStack label="Product" stat={useAdoptionPercent('presentational')} />
            <StatsTextStack label="CUJ Version" stat={lowestVersion || 'No Data'} />
            <StatsVersionStatusStack label="Status" updated={latest.upToDate} />
          </HStack>
        </HStack>
        <AdopterStatsBreakdown />
      </VStack>
      <VStack gap={2} spacingTop={6}>
        <Divider />
        <TextTitle2 as="h4">Previous Stats</TextTitle2>
        <TextBody as="p">See the previous stats for {title} CUJ.</TextBody>
      </VStack>
      <VStack maxHeight="500px" overflow="scroll" spacing={2}>
        {previous.map((prev) => (
          <VStack spacingTop={2}>
            <DetailStatCUJCell percentChange={<PercentChange showParenthesis />} {...prev} />
          </VStack>
        ))}
      </VStack>
      <VStack gap={2} spacingTop={6}>
        <Divider />
        <TextTitle2 as="h4">Stat Breakdown by Repo</TextTitle2>
        <TextBody as="p">See the breakdown for {title} CUJ by repo and CUJ entry.</TextBody>
      </VStack>
      <VStack maxHeight="500px" overflow="scroll" spacing={2}>
        <CUJBreakdownByRepo activeProjectLabel={title} />
      </VStack>
      <Divider />
      <VStack gap={2} spacingTop={2}>
        <TextTitle2 as="h4">Component Breakdown</TextTitle2>
        <TextBody as="p">See the CUJ component breakdown for {title}.</TextBody>
      </VStack>
      <AdopterTabProvider>
        <AdopterSearchProvider>
          <AdopterCUJTabs id={id} />
        </AdopterSearchProvider>
      </AdopterTabProvider>
    </VStack>
  );
});

CUJDetails.displayName = 'CUJDetails';
