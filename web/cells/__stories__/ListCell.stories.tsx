import { createStories } from '@cbhq/cds-storybook/stories/ListCell';

import { Button, IconButton } from '../../buttons';
import { Checkbox } from '../../controls';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

export default {
  title: 'Core Components/Cells/ListCell',
  component: ListCell,
};

export const { Content, PressableContent, LongContent, WithAccessory, WithMedia, WithActions } =
  createStories(ListCell, CellMedia, Button, IconButton, Checkbox);
