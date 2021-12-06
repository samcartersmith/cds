import React from 'react';
import { ContentCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { Pictogram } from '@cbhq/cds-mobile/illustrations/Pictogram';
import { Box } from '@cbhq/cds-mobile/layout';
import { contentCellBuilder } from '@cbhq/cds-common/internal/contentCellBuilder';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const { Content, PressableContent, LongContent, WithAccessory, WithMedia } = contentCellBuilder(
  ContentCell,
  CellMedia,
  Pictogram,
);

const ContentCellScreen = () => {
  return (
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default ContentCellScreen;
