import { ContentCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { createStories } from '@cbhq/cds-storybook/stories/ContentCell';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const { Content, PressableContent, LongContent, WithAccessory, WithMedia } = createStories(
  ContentCell,
  CellMedia
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
    </ExamplesScreen>
  );
};

export default ContentCellScreen;
