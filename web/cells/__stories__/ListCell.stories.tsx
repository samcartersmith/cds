import { listCellBuilder } from '@cbhq/cds-common/internal/listCellBuilder';

import { Button, IconButton } from '../../buttons';
import { Checkbox } from '../../controls';
import { Box } from '../../layout/Box';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

export default {
  title: 'Core Components/Cells/ListCell',
  component: ListCell,
};

export const {
  Content,
  CompactContent,
  PressableContent,
  CompactPressableContent,
  LongContent,
  PriorityContent,
  WithAccessory,
  WithMedia,
  WithActions,
  WithIntermediary,
} = listCellBuilder(ListCell, CellMedia, Button, IconButton, Checkbox, (props) => (
  <Box {...props} background="backgroundAlternate" />
));
