import { ContentCellFallbackProps } from '@cbhq/cds-common';

export function createStories(ContentCellFallback: React.ComponentType<ContentCellFallbackProps>) {
  const Fallbacks = () => {
    return (
      <>
        <ContentCellFallback title />
        <ContentCellFallback title description />
        <ContentCellFallback title meta />
        <ContentCellFallback title subtitle />
        <ContentCellFallback title meta description />
        <ContentCellFallback title description meta subtitle />
        <ContentCellFallback title media="icon" />
        <ContentCellFallback title description media="asset" />
        <ContentCellFallback title meta media="image" />
        <ContentCellFallback title subtitle media="avatar" />
        <ContentCellFallback title meta description media="icon" />
        <ContentCellFallback title description meta subtitle media="asset" />
      </>
    );
  };

  return {
    Fallbacks,
  };
}
