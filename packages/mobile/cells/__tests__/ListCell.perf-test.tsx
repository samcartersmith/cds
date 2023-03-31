import { measurePerformance } from 'reassure';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

describe('ListCell performance test', () => {
  it('renders', async () => {
    await measurePerformance(
      <ListCell
        title="Asset with a really long name"
        description="Some description of the asset"
        detail="$334,239.03"
        subdetail="+4.06%"
        variant="positive"
        intermediary={<CellMedia type="icon" name="chartLine" />}
        priority="start"
        onPress={NoopFn}
        selected
      />,
    );
  });
});
