import { contentCellFallbackBuilder } from '@cbhq/cds-common/internal/contentCellFallbackBuilder';

import { ContentCellFallback } from '../ContentCellFallback';

export default {
  title: 'Core Components/Cells/ContentCellFallback',
  component: ContentCellFallback,
};

const { Fallbacks } = contentCellFallbackBuilder(ContentCellFallback);

export { Fallbacks };
