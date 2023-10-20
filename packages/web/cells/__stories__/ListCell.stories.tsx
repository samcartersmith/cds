import { listCellBuilder } from '@cbhq/cds-common/internal/listCellBuilder';

import { VStack as AlphaVStack } from '../../alpha/VStack';
import { Button, IconButton } from '../../buttons';
import { Checkbox } from '../../controls';
import { VStack } from '../../layout';
import { Box } from '../../layout/Box';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

export default {
  title: 'Core Components/Cells/ListCell',
  component: ListCell,
};

export const withA11yOldVStack = () => {
  return (
    <VStack as="ul">
      <ListCell as="li" description="Description" title="Title" />
      <ListCell as="li" description="Description" title="Title" />
    </VStack>
  );
};

export const withA11yVStack = () => {
  return (
    <AlphaVStack as="ul">
      <ListCell as="li" description="Description" title="Title" />
      <ListCell as="li" description="Description" title="Title" />
    </AlphaVStack>
  );
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
