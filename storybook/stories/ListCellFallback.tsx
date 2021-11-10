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
        <ListCellFallback compact title />
        <ListCellFallback compact title description />
        <ListCellFallback compact title detail />
        <ListCellFallback compact title subdetail />
        <ListCellFallback compact title detail description />
        <ListCellFallback compact title description detail subdetail />
        <ListCellFallback compact title media="icon" />
        <ListCellFallback compact title description media="asset" />
        <ListCellFallback compact title detail media="image" />
        <ListCellFallback compact title subdetail media="avatar" />
        <ListCellFallback compact title detail description media="icon" />
        <ListCellFallback compact title description detail subdetail media="asset" />
      </>
    );
  };

  return {
    Fallbacks,
  };
}
