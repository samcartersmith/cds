import { ContentCellFallback } from '@cbhq/cds-mobile/cells';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const ContentCellFallbackScreen = () => {
  return (
    <ExamplesScreen>
      <Example>
        <ContentCellFallback title />
        <ContentCellFallback title description />
        <ContentCellFallback title meta />
        <ContentCellFallback title subtitle />
        <ContentCellFallback title meta description />
        <ContentCellFallback title description meta subtitle />
        <ContentCellFallback title media="icon" />
        <ContentCellFallback title description media="asset" />
        <ContentCellFallback title meta media="image" />
        <ContentCellFallback title subtitle media="photo" />
        <ContentCellFallback title meta description media="icon" />
        <ContentCellFallback title description meta subtitle media="asset" />
      </Example>
    </ExamplesScreen>
  );
};

export default ContentCellFallbackScreen;
