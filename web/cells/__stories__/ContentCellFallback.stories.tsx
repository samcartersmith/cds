import { createStories } from ':cds-storybook/stories/ContentCellFallback';

import { ContentCellFallback } from '../ContentCellFallback';

export default {
  title: 'Core Components/Cells/ContentCellFallback',
  component: ContentCellFallback,
};

export const { Fallbacks } = createStories(ContentCellFallback);
