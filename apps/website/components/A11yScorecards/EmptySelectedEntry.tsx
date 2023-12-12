import { Pictogram } from '@cbhq/cds-web/illustrations';
import { VStack } from '@cbhq/cds-web/layout';
import { TextBody, TextDisplay3 } from '@cbhq/cds-web/typography';

export const EmptySelectedEntry = () => {
  return (
    <VStack gap={3} spacingTop={7} spacingVertical={4}>
      <VStack alignItems="center" gap={2} spacingTop={7} spacingVertical={4}>
        <Pictogram name="analyticsNavigation" />
        <TextDisplay3 as="h4">No Entry Selected</TextDisplay3>
        <TextBody as="p" color="foregroundMuted" spacingBottom={2}>
          Click on an entry from the list on the left to view its detailed accessibility metrics.
        </TextBody>
      </VStack>
    </VStack>
  );
};
