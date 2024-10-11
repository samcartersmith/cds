import { measureRenders } from 'reassure';

import { Fallback } from '../Fallback';

const props = {
  width: 100,
  height: 50,
};

describe('Fallback performance test', () => {
  it('renders', async () => {
    await measureRenders(<Fallback {...props} />);
  });
  it('renders with disableRandomRectWidth', async () => {
    await measureRenders(<Fallback disableRandomRectWidth {...props} />);
  });
});
