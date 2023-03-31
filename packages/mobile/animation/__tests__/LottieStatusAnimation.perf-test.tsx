import { measurePerformance } from 'reassure';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

describe('LottieStatusAnimation performance tests', () => {
  it('renders', async () => {
    await measurePerformance(<LottieStatusAnimation height={250} />);
  });
  it('renders as success', async () => {
    await measurePerformance(<LottieStatusAnimation status="success" height={250} />);
  });
  it('renders as failure', async () => {
    await measurePerformance(<LottieStatusAnimation status="failure" height={250} />);
  });
  it('renders as pending', async () => {
    await measurePerformance(<LottieStatusAnimation status="pending" height={250} />);
  });
  it('renders as cardSuccess', async () => {
    await measurePerformance(<LottieStatusAnimation status="cardSuccess" height={250} />);
  });
});
