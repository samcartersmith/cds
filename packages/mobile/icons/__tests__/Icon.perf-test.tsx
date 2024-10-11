import { measureRenders } from 'reassure';

import { Icon } from '../Icon';

describe('Icon performance tests', () => {
  it('renders', async () => {
    await measureRenders(<Icon name="caretDown" size="m" />);
  });
});
