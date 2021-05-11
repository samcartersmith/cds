import { ListCellFallback } from '@cbhq/cds-mobile/cells';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const ListCellFallbackScreen = () => {
  return (
    <ExamplesScreen>
      <Example>
        <ListCellFallback title />
        <ListCellFallback title description />
        <ListCellFallback title detail />
        <ListCellFallback title subdetail />
        <ListCellFallback title detail description />
        <ListCellFallback title description detail subdetail />
        <ListCellFallback title media="icon" />
        <ListCellFallback title description media="asset" />
        <ListCellFallback title detail media="image" />
        <ListCellFallback title subdetail media="photo" />
        <ListCellFallback title detail description media="icon" />
        <ListCellFallback title description detail subdetail media="asset" />
      </Example>
    </ExamplesScreen>
  );
};

export default ListCellFallbackScreen;
