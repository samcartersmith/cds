import { memo } from 'react';
import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { VStack } from '@cbhq/cds-web/alpha/VStack';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import { useAdopterComponents } from ':cds-website/components/AdoptionTracker/hooks/useAdopterComponents';

import { useAdopterStats } from './hooks/useAdopterStats';

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

export const AdopterStatsVersionCell = memo(
  ({ title, detail }: { title: string; detail: string }) => {
    return (
      <HStack gap={1} justifyContent="space-between" spacingTop={1}>
        <TextLabel1 as="p" overflow="truncate">
          {title}
        </TextLabel1>
        <TextLabel2 align="end" as="p">
          {detail}
        </TextLabel2>
      </HStack>
    );
  },
);

AdopterStatsBreakdownCell.displayName = 'AdopterStatsBreakdownCell';

export const AdopterStatsBreakdown = memo(() => {
  const groups = useAdopterComponents();
  const { latest } = useAdopterStats();

  return (
    <VStack
      alignSelf="flex-end"
      position="absolute"
      spacingTop={2}
      spacingVertical={2}
      top={140}
      width="100%"
    >
      <HStack alignSelf="flex-end" justifyContent="space-between" width={635}>
        <VStack spacingVertical={1}>
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
        <VStack spacingVertical={1}>
          <AdopterStatsVersionCell detail={latest.cdsCommonVersion || 'Not Found'} title="Common" />
          <AdopterStatsVersionCell detail={latest.cdsWebVersion || 'Not Found'} title="Web" />
          <AdopterStatsVersionCell detail={latest.cdsMobileVersion || 'Not Found'} title="Mobile" />
        </VStack>
        <VStack spacingVertical={1}>
          <AdopterStatsVersionCell
            detail={latest.latestCdsVersionPublished3MonthsAgo || 'Not Found'}
            title="CDS 3 Months Ago"
          />
          <AdopterStatsVersionCell
            detail={latest.cdsLatestVersion || 'Not Found'}
            title="CDS Latest"
          />
          <AdopterStatsVersionCell
            detail={latest.upToDate ? 'Up to date' : 'Outdated'}
            title="Version Status"
          />
        </VStack>
      </HStack>
    </VStack>
  );
});
AdopterStatsBreakdown.displayName = 'AdopterStatsBreakdown';
