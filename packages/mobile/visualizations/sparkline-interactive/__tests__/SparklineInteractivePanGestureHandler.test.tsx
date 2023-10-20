import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { SparklineInteractivePanGestureHandler } from '../SparklineInteractivePanGestureHandler';

describe('SparklineInteractivePanGestureHandler.test', () => {
  it('renders children', () => {
    render(
      <SparklineInteractivePanGestureHandler getMarker={jest.fn()} selectedPeriod="1D">
        <Text>test</Text>
      </SparklineInteractivePanGestureHandler>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });

  it('renders disabled', () => {
    render(
      <SparklineInteractivePanGestureHandler disabled getMarker={jest.fn()} selectedPeriod="1D">
        <Text>test</Text>
      </SparklineInteractivePanGestureHandler>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });
});
