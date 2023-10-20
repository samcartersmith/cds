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
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        content={<Text>test content</Text>}
        opacity={new Animated.Value(1)}
        placement="top"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        testID="mock-internal-tooltip"
        translateY={new Animated.Value(5)}
      />,
    );
    expect(screen.getByTestId('mock-internal-tooltip')).toBeAccessible();
  });

  it('renders content', () => {
    render(
      <InternalTooltip
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        content={<Text>test content</Text>}
        opacity={new Animated.Value(1)}
        placement="top"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });

  it('renders string content', () => {
    render(
      <InternalTooltip
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        content="test content"
        opacity={new Animated.Value(1)}
        placement="bottom"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });
});
