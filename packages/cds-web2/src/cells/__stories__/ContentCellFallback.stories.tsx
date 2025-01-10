import { contentCellFallbackBuilder } from '@cbhq/cds-common2/internal/contentCellFallbackBuilder';

import { ContentCellFallback } from '../ContentCellFallback';

export default {
  title: 'Core Components/Cells/ContentCellFallback',
  component: ContentCellFallback,
};

const { Fallbacks } = contentCellFallbackBuilder(ContentCellFallback);

export { Fallbacks };
