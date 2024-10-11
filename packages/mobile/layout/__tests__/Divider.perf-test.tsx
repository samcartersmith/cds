import { measureRenders } from 'reassure';

import { Divider } from '../Divider';

describe('Divider performance test', () => {
  it('renders', async () => {
    await measureRenders(<Divider />);
  });
});
