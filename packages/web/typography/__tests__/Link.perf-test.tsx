import { measurePerformance } from 'reassure';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Link } from '../Link';

const testHref = 'https://www.coinbase.com/';

describe('Link performance test', () => {
  it('renders', async () => {
    await measurePerformance(
      <Link href={testHref} onPress={NoopFn}>
        Child
      </Link>,
    );
  });
});
