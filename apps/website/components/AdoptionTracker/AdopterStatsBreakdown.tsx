import { memo } from 'react';
import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { VStack } from '@cbhq/cds-web/alpha/VStack';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import { useAdopterComponents } from ':cds-website/components/AdoptionTracker/hooks/useAdopterComponents';

export const AdopterStatsBreakdownCell = memo(
  ({ title, detail }: { title: string; detail: number }) => {
    return (
      <HStack justifyContent="space-between" gap={1} spacingTop={1}>
        <TextLabel1 as="p" overflow="truncate">
          {title}
        </TextLabel1>
        <TextLabel2 as="p" align="end">
          {`${detail} instances`}
        </TextLabel2>
      </HStack>
    );
  },
);

export const AdopterStatsBreakdown = memo(() => {
  const groups = useAdopterComponents();
  return (
    <VStack spacingVertical={2} width={240} alignSelf="flex-end" position="absolute" top={140}>
      <AdopterStatsBreakdownCell title="CDS" detail={groups.cds.totalInstances} />
      <AdopterStatsBreakdownCell
        title="Presentational"
        detail={groups.presentational.totalInstances}
      />
      <AdopterStatsBreakdownCell
        title="Total"
        detail={groups.cds.totalInstances + groups.presentational.totalInstances}
      />
    </VStack>
  );
});
