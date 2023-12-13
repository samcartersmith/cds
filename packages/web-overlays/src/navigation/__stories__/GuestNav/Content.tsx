import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { LoremIpsum } from '@cbhq/cds-web/layout/__stories__/LoremIpsum';
import { TextDisplay2 } from '@cbhq/cds-web/typography';

/**
 * @internal
 */
export const Content = () => {
  return (
    <VStack spacing={2}>
      <TextDisplay2 as="h2" spacingBottom={1}>
        Content
      </TextDisplay2>
      <LoremIpsum repeat={10} />

      <TextDisplay2 as="h2" spacingBottom={1}>
        Content
      </TextDisplay2>
      <LoremIpsum repeat={10} />

      <TextDisplay2 as="h2" spacingBottom={1}>
        Content
      </TextDisplay2>
      <LoremIpsum repeat={10} />
    </VStack>
  );
};
