import { listCellBuilder } from '@cbhq/cds-common/internal/listCellBuilder';

import { Button, IconButton } from '../../buttons';
import { Checkbox } from '../../controls';
import { VStack } from '../../layout';
import { Box } from '../../layout/Box';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

const parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export default {
  title: 'Core Components/Cells/ListCell',
  component: ListCell,
  parameters: {
    ...parameters,
  },
};

export const withA11yVStack = () => {
  return (
    <VStack as="ul">
      <ListCell as="li" description="Description" title="Title" />
      <ListCell as="li" description="Description" title="Title" />
    </VStack>
  );
};

const {
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

export {
  CompactContent,
  CompactPressableContent,
  Content,
  LongContent,
  PressableContent,
  PriorityContent,
  WithAccessory,
  WithActions,
  WithIntermediary,
  WithMedia,
};
