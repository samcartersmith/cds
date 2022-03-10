import { memo } from 'react';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';

type AdopterSplitScreenStackProps = {
  start?: React.ReactNode;
  end?: React.ReactNode;
};

export const AdopterSplitScreenStack = memo(({ start, end }: AdopterSplitScreenStackProps) => {
  return (
    <HStack alignItems="flex-start" justifyContent="space-between">
      <VStack flexGrow={1}>{start}</VStack>
      <Divider direction="vertical" spacingHorizontal={4} />
      <VStack
        width="55%"
        maxHeight="90vh"
        overflow="scroll"
        position="sticky"
        top={76}
        left={0}
        right={0}
        gap={3}
        spacingHorizontal={2}
      >
        {flattenNodes(end)}
      </VStack>
    </HStack>
  );
});
