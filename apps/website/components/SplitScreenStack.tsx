import { memo } from 'react';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';

type SplitScreenStackProps = {
  start?: React.ReactNode;
  end?: React.ReactNode;
};

export const SplitScreenStack = memo(({ start, end }: SplitScreenStackProps) => {
  return (
    <HStack alignItems="flex-start" justifyContent="space-between">
      <VStack flexGrow={1} flexShrink={0} width="50%">
        {start}
      </VStack>
      <Divider direction="vertical" spacingEnd={3} />
      <VStack
        gap={3}
        left={0}
        maxHeight="90vh"
        overflow="scroll"
        position="sticky"
        right={0}
        spacingHorizontal={2}
        top={76}
        width="50%"
      >
        {flattenNodes(end)}
      </VStack>
    </HStack>
  );
});
