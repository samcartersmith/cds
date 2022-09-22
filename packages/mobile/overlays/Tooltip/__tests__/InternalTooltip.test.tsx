import { Animated, Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { InternalTooltip } from '../InternalTooltip';

const mockAnimateIn = {
  start: jest.fn(),
};

describe('InternalTooltip.test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders content', () => {
    const { getByText } = render(
      <InternalTooltip
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        content={<Text>test content</Text>}
        placement="top"
        opacity={new Animated.Value(1)}
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });

  it('renders string content', () => {
    const { getByText } = render(
      <InternalTooltip
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        content="test content"
        placement="bottom"
        opacity={new Animated.Value(1)}
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });
});
