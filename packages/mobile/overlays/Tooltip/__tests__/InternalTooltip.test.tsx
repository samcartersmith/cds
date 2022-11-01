import { Animated, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { InternalTooltip } from '../InternalTooltip';

const mockAnimateIn = {
  start: jest.fn(),
};

describe('InternalTooltip.test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes a11y', () => {
    render(
      <InternalTooltip
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        testID="mock-internal-tooltip"
        content={<Text>test content</Text>}
        placement="top"
        opacity={new Animated.Value(1)}
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        translateY={new Animated.Value(5)}
      />,
    );
    expect(screen.getByTestId('mock-internal-tooltip')).toBeAccessible();
  });

  it('renders content', () => {
    render(
      <InternalTooltip
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        content={<Text>test content</Text>}
        placement="top"
        opacity={new Animated.Value(1)}
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });

  it('renders string content', () => {
    render(
      <InternalTooltip
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        content="test content"
        placement="bottom"
        opacity={new Animated.Value(1)}
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });
});
