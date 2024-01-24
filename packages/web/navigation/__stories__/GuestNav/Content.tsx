import React from 'react';

import { VStack } from '../../../layout';
import { LoremIpsum } from '../../../layout/__stories__/LoremIpsum';
import { TextDisplay2 } from '../../../typography';

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
