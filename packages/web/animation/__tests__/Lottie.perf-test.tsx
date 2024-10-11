import { measureRenders } from 'reassure';
import { nux } from '@cbhq/cds-lottie-files/nux';

import { Lottie } from '../Lottie';

describe('Lottie performance tests', () => {
  it('renders', async () => {
    await measureRenders(<Lottie source={nux} />);
  });
});
