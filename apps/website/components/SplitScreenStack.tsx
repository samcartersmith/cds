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
      <VStack flexGrow={1} width="45%" flexShrink={0}>
        {start}
      </VStack>
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
