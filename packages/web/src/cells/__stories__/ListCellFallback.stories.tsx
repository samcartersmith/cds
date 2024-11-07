import { listCellFallbackBuilder } from '@cbhq/cds-common/internal/listCellFallbackBuilder';

import { ListCellFallback } from '../ListCellFallback';

export default {
  title: 'Core Components/Cells/ListCellFallback',
  component: ListCellFallback,
};

const { Fallbacks } = listCellFallbackBuilder(ListCellFallback);

export { Fallbacks };
