import { render, screen } from '@testing-library/react-native';
import LottieView from 'lottie-react-native';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

describe('LottieStatusAnimation', () => {
  it('renders a LottieStatusAnimation', () => {
    render(<LottieStatusAnimation height="100" testID="lottie-status-animation-test" />);

    expect(screen.UNSAFE_queryAllByType(LottieView)).toHaveLength(1);
    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
  });
});
