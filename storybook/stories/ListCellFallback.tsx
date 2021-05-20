import { ListCellFallbackProps } from '@cbhq/cds-common';

export function createStories(ListCellFallback: React.ComponentType<ListCellFallbackProps>) {
  const Fallbacks = () => {
    return (
      <>
        <ListCellFallback title />
        <ListCellFallback title description />
        <ListCellFallback title detail />
        <ListCellFallback title subdetail />
        <ListCellFallback title detail description />
        <ListCellFallback title description detail subdetail />
        <ListCellFallback title media="icon" />
        <ListCellFallback title description media="asset" />
        <ListCellFallback title detail media="image" />
        <ListCellFallback title subdetail media="avatar" />
        <ListCellFallback title detail description media="icon" />
        <ListCellFallback title description detail subdetail media="asset" />
      </>
    );
  };

  return {
    Fallbacks,
  };
}
