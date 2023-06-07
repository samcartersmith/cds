import { render, screen } from '@testing-library/react';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

describe('Lottie', () => {
  it('renders LottieStatusAnimation', () => {
    render(<LottieStatusAnimation height="100" testID="lottie-status-animation-test" />);
    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
  });
});
