import { memo } from 'react';
import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { VStack } from '@cbhq/cds-web/alpha/VStack';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import { useAdopterComponents } from ':cds-website/components/AdoptionTracker/hooks/useAdopterComponents';

export const AdopterStatsBreakdownCell = memo(
  ({ title, detail }: { title: string; detail: number }) => {
    return (
      <HStack gap={1} justifyContent="space-between" spacingTop={1}>
        <TextLabel1 as="p" overflow="truncate">
          {title}
        </TextLabel1>
        <TextLabel2 align="end" as="p">
          {`${detail} instances`}
        </TextLabel2>
      </HStack>
    );
  },
);

AdopterStatsBreakdownCell.displayName = 'AdopterStatsBreakdownCell';

export const AdopterStatsBreakdown = memo(() => {
  const groups = useAdopterComponents();
  return (
    <VStack alignSelf="flex-end" position="absolute" spacingVertical={2} top={140} width={240}>
      <AdopterStatsBreakdownCell detail={groups.cds.totalInstances} title="CDS" />
      <AdopterStatsBreakdownCell
        detail={groups.presentational.totalInstances}
        title="Presentational"
      />
      <AdopterStatsBreakdownCell
        detail={groups.cds.totalInstances + groups.presentational.totalInstances}
        title="Total"
      />
    </VStack>
  );
});

AdopterStatsBreakdown.displayName = 'AdopterStatsBreakdown';
