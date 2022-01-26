import React from 'react';
import { gutter } from '@cbhq/cds-common/src/tokens/sizing';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography/TextBody';
import { Box, BoxProps } from '../Box';
import { Divider } from '../Divider';
import { Group, RenderGroupItem } from '../Group';

function createCustomDivider(wrapperProps?: BoxProps, dividerProps?: BoxProps) {
  function CustomDivider() {
    return (
      <Box {...wrapperProps}>
        <Box height={4} background="primary" width="100%" {...dividerProps} />
      </Box>
    );
  }

  return CustomDivider;
}

const CustomDivider1 = createCustomDivider();
const CustomDivider2 = createCustomDivider({ spacingBottom: gutter });
const customRenderItem: RenderGroupItem = ({ item, Wrapper, isFirst, isLast }) => {
  return (
    <Wrapper borderColor="lineHeavy" borderedTop={isFirst} borderedBottom={isLast}>
      {item}
    </Wrapper>
  );
};

const GroupScreen = () => {
  const boxes = (
    <>
      <Box spacing={1} background="backgroundAlternate">
        <TextBody>Box 1</TextBody>
      </Box>
      <Box spacing={1} background="backgroundAlternate">
        <TextBody>Box 2</TextBody>
      </Box>
      <Box spacing={1} background="backgroundAlternate">
        <TextBody>Box 3</TextBody>
      </Box>
    </>
  );
  return (
    <ExampleScreen>
      <Example title="Default">
        <Group>{boxes}</Group>
      </Example>
      <Example title="With gap">
        <Group gap={3}>{boxes}</Group>
      </Example>
      <Example title="With divider">
        <Group divider={Divider}>{boxes}</Group>
      </Example>
      <Example title="With custom divider">
        <Group divider={CustomDivider1}>{boxes}</Group>
      </Example>
      <Example title="With custom divider and gap">
        <Group gap={gutter} divider={CustomDivider2}>
          {boxes}
        </Group>
      </Example>
      <Example title="Custom renderItem callback">
        <TextBody>Apply borderedTop and borderedBottom to first and last items in group</TextBody>
        <Group gap={0} renderItem={customRenderItem}>
          {boxes}
        </Group>
      </Example>
    </ExampleScreen>
  );
};

export default GroupScreen;
