import { memo } from 'react';
import { HStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

export const A11yStatsBreakdownCell = memo(
  ({ title, detail }: { title: string; detail: string | number }) => {
    return (
      <HStack gap={1} justifyContent="space-between" spacingTop={1}>
        <TextLabel1 as="p" overflow="truncate">
          {title}
        </TextLabel1>
        <TextLabel2 align="end" as="p">
          {`${detail || 'Data Not Found'}`}
        </TextLabel2>
      </HStack>
    );
  },
);
