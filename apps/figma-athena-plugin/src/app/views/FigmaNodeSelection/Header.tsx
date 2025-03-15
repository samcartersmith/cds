import { useCallback } from 'react';
import type { FigmaNodeData } from 'apps/figma-athena-plugin/src/shared/FigmaNodeData';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { Link, TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

export function Header(props: {
  onPressPrompt: () => void;
  promptName: string;
  textNodes: FigmaNodeData[];
  checkedNodes: string[];
  onCheckAll: () => void;
  onUncheckAll: () => void;
}) {
  const doCheckAll = props.checkedNodes.length === 0;

  const handleCheckAll = useCallback(() => {
    if (doCheckAll) {
      props.onCheckAll();
    } else {
      props.onUncheckAll();
    }
  }, [doCheckAll, props]);

  return (
    <VStack
      alignItems="flex-start"
      background="background"
      justifyContent="space-between"
      spacing={1}
      width="100%"
    >
      <Link onPress={props.onPressPrompt} variant="title4">
        {props.promptName}
      </Link>
      <HStack justifyContent="space-between" width="100%">
        {props.textNodes.length > 0 && (
          <>
            <HStack gap={1}>
              <TextLabel1 as="span">
                {props.checkedNodes.length} / {props.textNodes.length}
              </TextLabel1>
              <TextLabel2 as="span">text nodes selected</TextLabel2>
            </HStack>

            <HStack gap={1}>
              <button
                onClick={handleCheckAll}
                style={{ borderRadius: 12, cursor: 'pointer' }}
                type="button"
              >
                <TextLabel2 as="span">{doCheckAll ? 'Check all' : 'Uncheck all'}</TextLabel2>
              </button>
            </HStack>
          </>
        )}
      </HStack>
    </VStack>
  );
}
