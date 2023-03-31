import { measurePerformance } from 'reassure';
import { ElevationLevels } from '@cbhq/cds-common/types/ElevationLevels';

import { Box } from '../Box';

describe('Box performance test', () => {
  it('renders', async () => {
    await measurePerformance(<Box />);
  });
  it('renders with elevation', async () => {
    await measurePerformance(<Box elevation={5 as ElevationLevels} />);
  });
});
