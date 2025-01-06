import React from 'react';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography/TextBody';
import { Box, BoxProps } from '../Box';
import { Divider } from '../Divider';
import { Group, RenderGroupItem } from '../Group';

function createCustomDivider(wrapperProps?: BoxProps, dividerProps?: BoxProps) {
  function CustomDivider() {
    return (
      <Box {...wrapperProps}>
        <Box background="backgroundPrimary" height={4} width="100%" {...dividerProps} />
      </Box>
    );
  }

  return CustomDivider;
}

const CustomDivider1 = createCustomDivider();
const CustomDivider2 = createCustomDivider({ paddingBottom: gutter });
const customRenderItem: RenderGroupItem = ({ item, Wrapper, isFirst, isLast }) => {
  return (
    <Wrapper borderColor="lineHeavy" borderedBottom={isLast} borderedTop={isFirst}>
      {item}
    </Wrapper>
  );
};

const GroupScreen = () => {
  const boxes = (
    <>
      <Box background="backgroundAlternate" padding={1}>
        <TextBody>Box 1</TextBody>
      </Box>
      <Box background="backgroundAlternate" padding={1}>
        <TextBody>Box 2</TextBody>
      </Box>
      <Box background="backgroundAlternate" padding={1}>
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
        <Group divider={CustomDivider2} gap={gutter}>
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
