import { measurePerformance } from 'reassure';

import { Box } from '../Box';

describe('Box performance test', () => {
  it('renders', async () => {
    await measurePerformance(<Box />);
  });
});
