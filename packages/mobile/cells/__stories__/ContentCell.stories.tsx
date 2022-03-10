import React from 'react';
import { contentCellBuilder } from '@cbhq/cds-common/internal/contentCellBuilder';

import { Pictogram } from '../../illustrations/Pictogram';
import { Box } from '../../layout/Box';

import { ContentCell } from '../ContentCell';
import { CellMedia } from '../CellMedia';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const { Content, PressableContent, LongContent, WithAccessory, WithMedia } = contentCellBuilder(
  ContentCell,
  CellMedia,
  Pictogram,
);

const ContentCellScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Content only">
        <Content />
      </Example>

      <Example title="Pressable content">
        <PressableContent />
      </Example>

      <Example title="Long content">
        <LongContent />
      </Example>

      <Example title="With accessory">
        <WithAccessory />
      </Example>

      <Example title="With media">
        <WithMedia />
      </Example>

      <Example title="Example screen" spacingHorizontal={3}>
        <Box offsetHorizontal={3}>
          <PressableContent />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default ContentCellScreen;
