import { Animated } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Overlay } from '../Overlay';
import { useOverlayAnimation } from '../useOverlayAnimation';

describe('Overlay', () => {
  const TestComponent = () => {
    const [opacity] = useOverlayAnimation();
    return <Overlay opacity={opacity} />;
  };

  it('renders an animated view', () => {
    render(<TestComponent />);

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });
});
