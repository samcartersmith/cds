import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { SparklineInteractivePanGestureHandler } from '../SparklineInteractivePanGestureHandler';

describe('SparklineInteractivePanGestureHandler.test', () => {
  it('renders children', () => {
    const { getByText } = render(
      <SparklineInteractivePanGestureHandler selectedPeriod="1D" getMarker={jest.fn()}>
        <Text>test</Text>
      </SparklineInteractivePanGestureHandler>,
    );

    expect(getByText('test')).toBeTruthy();
  });

  it('renders disabled', () => {
    const { getByText } = render(
      <SparklineInteractivePanGestureHandler selectedPeriod="1D" getMarker={jest.fn()} disabled>
        <Text>test</Text>
      </SparklineInteractivePanGestureHandler>,
    );

    expect(getByText('test')).toBeTruthy();
  });
});
