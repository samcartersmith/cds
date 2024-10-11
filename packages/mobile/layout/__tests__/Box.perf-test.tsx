import { measureRenders } from 'reassure';
import { ElevationLevels } from '@cbhq/cds-common/types/ElevationLevels';

import { Box } from '../Box';

describe('Box performance test', () => {
  it('renders', async () => {
    await measureRenders(<Box />);
  });
  it('renders with elevation', async () => {
    await measureRenders(<Box elevation={2 as ElevationLevels} />);
  });
});
