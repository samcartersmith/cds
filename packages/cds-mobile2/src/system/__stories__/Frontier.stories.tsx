import React from 'react';

import { Button, IconButton } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { TextBody, TextDisplay2, TextHeadline } from '../../typography';

// this includes everything except SparklineInteractive has a filled area in Frontier, however that component has been decomped to its own package
const FrontierExampleScreen = () => (
  <ExampleScreen>
    <Example title="Frontier Changes">
      <VStack gap={3} paddingX={2} paddingY={3}>
        <TextHeadline paddingBottom={3}>
          The following components are intended to be used purely for visual regression testing when
          Frontier is enabled as the default treatment for CDS libraries.
        </TextHeadline>
        <VStack background="bg" borderRadius={400} elevation={1} gap={2} padding={2}>
          <TextBody paddingBottom={3}>
            Secondary palette is unchanged when the parent has an elevation of 1
          </TextBody>
          <Button variant="secondary">Secondary button</Button>
        </VStack>
        <VStack background="bg" borderRadius={400} elevation={2} gap={2} padding={2}>
          <TextBody paddingBottom={3}>
            Secondary palette is unchanged when the parent has an elevation of 2
          </TextBody>
          <Button variant="secondary">Secondary button</Button>
        </VStack>
        <VStack bordered background="bg" borderRadius={400} gap={2} padding={2}>
          <TextBody paddingBottom={3}>
            Secondary buttons have a filled grey background and no border.
          </TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button transparent variant="secondary">
            Secondary button transparent
          </Button>
          <IconButton name="add" variant="secondary" />
          <IconButton transparent name="add" variant="secondary" />
        </VStack>
        <VStack bordered borderRadius={400} padding={2}>
          <TextBody paddingBottom={3}>Display 2 font size and line height are larger.</TextBody>
          <TextDisplay2>Display 2</TextDisplay2>
        </VStack>
        <VStack bordered borderRadius={400} padding={2}>
          <TextBody paddingBottom={3}>Primary blue is lighter in dark mode</TextBody>
          <Button variant="primary">Primary</Button>
        </VStack>
      </VStack>
    </Example>
  </ExampleScreen>
);

export default FrontierExampleScreen;
