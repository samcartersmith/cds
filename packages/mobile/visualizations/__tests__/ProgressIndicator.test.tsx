import { Animated } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { ProgressIndicator } from '../ProgressIndicator';

describe('ProgressIndicator.test', () => {
  it('renders with progress', () => {
    const progress = new Animated.Value(0.2);

    render(<ProgressIndicator progress={progress} testID="test-progress-indicator" />);

    expect(screen.getByTestId('test-progress-indicator')).toBeTruthy();
  });
});
