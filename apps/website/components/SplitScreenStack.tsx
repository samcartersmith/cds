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
      <VStack flexGrow={1} width="50%" flexShrink={0}>
        {start}
      </VStack>
      <Divider direction="vertical" spacingEnd={3} />
      <VStack
        width="50%"
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
