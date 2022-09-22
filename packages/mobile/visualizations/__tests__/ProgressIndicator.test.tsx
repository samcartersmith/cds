import { Animated } from 'react-native';
import { render } from '@testing-library/react-native';

import { ProgressIndicator } from '../ProgressIndicator';

describe('ProgressIndicator.test', () => {
  it('renders with progress', () => {
    const progress = new Animated.Value(0.2);

    const { getByTestId } = render(
      <ProgressIndicator progress={progress} testID="test-progress-indicator" />,
    );

    expect(getByTestId('test-progress-indicator')).toBeTruthy();
  });
});
