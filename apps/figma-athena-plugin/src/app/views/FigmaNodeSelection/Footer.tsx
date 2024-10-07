import React from 'react';
import { Button } from '@cbhq/cds-web/buttons';
import { HStack } from '@cbhq/cds-web/layout';

export function Footer(props: {
  onPressBack: () => void;
  isGenerateDisabled: boolean;
  onPressGenerate: () => void;
}) {
  return (
    <HStack background="background" gap={2} spacing={1} width="100%">
      <Button compact onPress={props.onPressBack} variant="secondary">
        Cancel
      </Button>
      <Button compact disabled={props.isGenerateDisabled} onPress={props.onPressGenerate}>
        Generate
      </Button>
    </HStack>
  );
}
