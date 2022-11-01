import { Animated } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Overlay } from '../Overlay';
import { useOverlayAnimation } from '../useOverlayAnimation';

describe('Overlay', () => {
  const TestComponent = () => {
    const [opacity] = useOverlayAnimation();
    return <Overlay testID="mock-overlay" opacity={opacity} />;
  };

  it('passes a11y', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('mock-overlay')).toBeAccessible();
  });

  it('renders an animated view', () => {
    render(<TestComponent />);

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });
});
