import React from 'react';
import { contentCellBuilder } from '@cbhq/cds-common/internal/contentCellBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations/Pictogram';
import { Box } from '../../layout/Box';
import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

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

      <Example spacingHorizontal={3} title="Example screen">
        <Box offsetHorizontal={3}>
          <PressableContent />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default ContentCellScreen;
