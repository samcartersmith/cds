import { Checkbox } from '@cbhq/cds-web/v7/controls/Checkbox';

import { LayerThreeA } from './LayerThreeA';
import { LayerThreeB } from './LayerThreeB';

export function LayerTwoA() {
  return (
    <>
      <Checkbox />
      <LayerThreeA />
      <LayerThreeB />
    </>
  );
}
