import { measureRenders } from 'reassure';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

describe('LottieStatusAnimation performance tests', () => {
  it('renders', async () => {
    await measureRenders(<LottieStatusAnimation height={250} />);
  });
  it('renders as success', async () => {
    await measureRenders(<LottieStatusAnimation height={250} status="success" />);
  });
  it('renders as failure', async () => {
    await measureRenders(<LottieStatusAnimation height={250} status="failure" />);
  });
  it('renders as pending', async () => {
    await measureRenders(<LottieStatusAnimation height={250} status="pending" />);
  });
  it('renders as cardSuccess', async () => {
    await measureRenders(<LottieStatusAnimation height={250} status="cardSuccess" />);
  });
});
