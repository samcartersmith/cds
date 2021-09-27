import { memo } from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';
import { BetaCell } from ':cds-website/components/BetaCell';
import { useAdopterComponents } from ':cds-website/components/AdoptionTracker/hooks/useAdopterComponents';

const AdopterStatsBreakdownCell = memo(({ title, detail }: { title: string; detail: string }) => {
  return (
    <BetaCell
      priority="end"
      offsetHorizontal={1}
      start={
        <TextLabel1 as="p" overflow="truncate">
          {title}
        </TextLabel1>
      }
      end={
        <TextLabel2 as="p" align="end">
          {detail}
        </TextLabel2>
      }
    />
  );
});

export const AdopterStatsBreakdown = memo(() => {
  const groups = useAdopterComponents();
  return (
    <VStack spacingVertical={2} width={240} alignSelf="flex-end" position="absolute" top={140}>
      <AdopterStatsBreakdownCell title="CDS" detail={`${groups.cds.totalInstances} instances`} />
      <AdopterStatsBreakdownCell
        title="Presentational"
        detail={`${groups.presentational.totalInstances} instances`}
      />
      <AdopterStatsBreakdownCell
        title="Total"
        detail={`${groups.cds.totalInstances + groups.presentational.totalInstances} instances`}
      />
    </VStack>
  );
});
