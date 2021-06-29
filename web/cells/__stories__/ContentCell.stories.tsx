import { createStories } from '@cbhq/cds-storybook/stories/ContentCell';

import { Box } from '../../layout/Box';
import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

export default {
  title: 'Core Components/Cells/ContentCell',
  component: ContentCell,
};

export const { Content, PressableContent, LongContent, WithAccessory, WithMedia } = createStories(
  ContentCell,
  CellMedia,
  props => <Box {...props} background="backgroundAlternate" />
);
