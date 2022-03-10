import { contentCellFallbackBuilder } from '@cbhq/cds-common/internal/contentCellFallbackBuilder';

import { ContentCellFallback } from '../ContentCellFallback';

export default {
  title: 'Core Components/Cells/ContentCellFallback',
  component: ContentCellFallback,
};

export const { Fallbacks } = contentCellFallbackBuilder(ContentCellFallback);
