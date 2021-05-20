import { createStories } from '@cbhq/cds-storybook/stories/ListCellFallback';

import { ListCellFallback } from '../ListCellFallback';

export default {
  title: 'Core Components/Cells/ListCellFallback',
  component: ListCellFallback,
};

export const { Fallbacks } = createStories(ListCellFallback);
