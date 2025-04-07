/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';
import { NoopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { Link } from '../Link';

const testHref = 'https://www.coinbase.com/';

describe('Link performance test', () => {
  it('renders', async () => {
    await measurePerformance(
      <Link onPress={NoopFn} to={testHref}>
        Child
      </Link>,
    );
  });
});
