import { contentCellBuilder } from '@cbhq/cds-common/internal/contentCellBuilder';

import { Box } from '../../layout/Box';
import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

export default {
  title: 'Core Components/Cells/ContentCell',
  component: ContentCell,
};

const { Content, PressableContent, LongContent, WithAccessory, WithMedia } = contentCellBuilder(
  ContentCell,
  CellMedia,
  (props) => <Box {...props} background="backgroundAlternate" />,
);

export { Content, LongContent, PressableContent, WithAccessory, WithMedia };
