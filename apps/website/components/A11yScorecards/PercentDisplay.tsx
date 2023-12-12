import { HStack } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';

import { A11yData } from './types';

export const PercentDisplayWithA11yScore = ({
  percentChange,
  entry,
}: {
  percentChange: string;
  entry: A11yData;
}) => {
  return (
    <HStack gap={1} justifyContent="space-between">
      <TextBody as="p"> {entry.automatedA11yScore}</TextBody>
      <TextBody as="p" color={percentChange.includes('-') ? 'negative' : 'positive'}>
        {percentChange.includes('-') ? `(${percentChange})` : `(+ ${percentChange})`}
      </TextBody>
    </HStack>
  );
};

export const PercentDisplayOnly = ({ percentChange }: { percentChange: string }) => {
  return (
    <TextBody
      align="end"
      as="p"
      color={percentChange.includes('-') ? 'negative' : 'positive'}
      overflow="truncate"
    >
      {percentChange.includes('-') ? `(${percentChange})` : `(+ ${percentChange})`}
    </TextBody>
  );
};
