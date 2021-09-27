import React, { memo, useContext, useMemo } from 'react';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextTitle1 } from '@cbhq/cds-web/typography';
import { IconButton } from '@cbhq/cds-web/buttons';
import { Tabs } from ':cds-website/components/Tabs';
import { StatsTextStack } from ':cds-website/components/StatsTextStack';
import { useAdopterProjectInfo } from './hooks/useAdopterProjectInfo';
import { useAdopterComponents } from './hooks/useAdopterComponents';
import { useAdoptionPercent } from './hooks/useAdoptionPercent';
import { AdopterComponentsList } from './AdopterComponentsList';
import { useOkrPlanningComponents } from './hooks/useOkrPlanningComponents';
import {
  AdopterTabContext,
  AdopterTabContextType,
  AdopterTabProvider,
} from './context/AdopterTabProvider';
import { AdopterSearchInput } from './search/AdopterSearchInput';
import { ComponentData } from './types';
import { AdopterSearchProvider } from './search/AdopterSearchProvider';
import { AdopterStatsBreakdown } from './AdopterStatsBreakdown';

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

  const { tabKey } = useContext(AdopterTabContext) as AdopterTabContextType;
  let searchComponents: ComponentData[];
  switch (tabKey) {
    case 'other':
      searchComponents = other.components;
      break;
    case 'presentational':
      searchComponents = presentational.components;
      break;
    case 'okr':
      searchComponents = okrPlanning;
      break;
    default:
      searchComponents = cds.components;
  }
  return (
    <>
      <AdopterSearchInput components={searchComponents} />
      <Tabs id={`adopter-${id}`} defaultTab="cds" values={values} />
    </>
  );
});

export const AdopterDetails = memo(() => {
  const { label } = useAdopterProjectInfo();

  return (
    <VStack>
      <VStack>
        <HStack alignItems="flex-start" justifyContent="space-between" spacingBottom={2}>
          <HStack alignItems="center">
            <IconButton transparent name="backArrow" to="/adoption/tracker/overview" />
            <TextTitle1 as="h1" spacingStart={4}>
              {label}
            </TextTitle1>
          </HStack>
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
