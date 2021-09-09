import React, { memo, useMemo } from 'react';
import { Tabs } from '@cbhq/cds-website/components/Tabs';
import { HStack } from '@cbhq/cds-web/layout';
import { TextTitle1 } from '@cbhq/cds-web/typography';
import { IconButton } from '@cbhq/cds-web/buttons';
import { StatsTextStack } from '@cbhq/cds-website/components/StatsTextStack';
import { useAdopterProjectInfo } from './hooks/useAdopterProjectInfo';
import { useAdopterComponents } from './hooks/useAdopterComponents';
import { useAdoptionPercent } from './hooks/useAdoptionPercent';
import { AdopterComponentsList } from './AdopterComponentsList';
import { useOkrPlanningComponents } from './hooks/useOkrPlanningComponents';

export const AdopterDetails = memo(() => {
  const { id, label } = useAdopterProjectInfo();
  const { cds, presentational, other } = useAdopterComponents();
  const okrPlanning = useOkrPlanningComponents();
  const values = useMemo(() => {
    return [
      {
        label: 'CDS',
        id: 'cds',
        content: <AdopterComponentsList key="cds" components={cds.components} />,
      },
      {
        label: 'Presentational',
        id: 'nonCds',
        content: (
          <AdopterComponentsList key="presentational" components={presentational.components} />
        ),
      },
      {
        label: 'Other',
        id: 'other',
        content: <AdopterComponentsList key="other" components={other.components} />,
      },
      {
        label: 'OKR Planning',
        id: 'okrPlanning',
        content: <AdopterComponentsList key="other" components={okrPlanning} />,
      },
    ];
  }, [cds.components, okrPlanning, other.components, presentational.components]);

  return (
    <>
      <HStack alignItems="flex-start" justifyContent="space-between" spacingBottom={2}>
        <HStack alignItems="center">
          <IconButton transparent name="backArrow" to="/adoption/tracker/overview" />
          <TextTitle1 as="h1" spacingStart={4}>
            {label}
          </TextTitle1>
        </HStack>
        <HStack gap={6}>
          <StatsTextStack label="CDS" stat={useAdoptionPercent('cds')} />
          <StatsTextStack label="Product" stat={useAdoptionPercent('presentational')} />
        </HStack>
      </HStack>
      <Tabs id={`adopter-${id}`} defaultTab="cds" values={values} />
    </>
  );
});
