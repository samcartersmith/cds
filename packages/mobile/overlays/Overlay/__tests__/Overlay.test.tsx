import { render } from '@testing-library/react-native';
import { Animated } from 'react-native';

import { Overlay } from '../Overlay';
import { useOverlayAnimation } from '../useOverlayAnimation';

describe('Overlay', () => {
  const TestComponent = () => {
    const [opacity] = useOverlayAnimation();
    return <Overlay opacity={opacity} />;
  };

  it('renders an animated view', () => {
    const result = render(<TestComponent />);

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });
});
