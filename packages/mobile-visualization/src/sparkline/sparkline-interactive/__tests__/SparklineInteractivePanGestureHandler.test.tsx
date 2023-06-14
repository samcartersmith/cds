import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { SparklineInteractivePanGestureHandler } from '../SparklineInteractivePanGestureHandler';

describe('SparklineInteractivePanGestureHandler.test', () => {
  it('renders children', () => {
    render(
      <SparklineInteractivePanGestureHandler selectedPeriod="1D" getMarker={jest.fn()}>
        <Text>test</Text>
      </SparklineInteractivePanGestureHandler>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });

  it('renders disabled', () => {
    render(
      <SparklineInteractivePanGestureHandler selectedPeriod="1D" getMarker={jest.fn()} disabled>
        <Text>test</Text>
      </SparklineInteractivePanGestureHandler>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });
});
