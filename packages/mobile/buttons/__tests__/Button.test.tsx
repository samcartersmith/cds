import { Animated, Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { debounce } from '../../utils/debounce';
import { Button } from '../Button';

jest.mock('../../utils/debounce');

describe('Button', () => {
  it('renders an animated view', () => {
    render(<Button>Child</Button>);

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    render(<Button>Child</Button>);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders children text', () => {
    render(<Button>Child</Button>);

    expect(screen.getByText('Child')).not.toBeNull();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    render(<Button onPress={spy}>Child</Button>);

    fireEvent.press(screen.getByText('Child'));

    expect(spy).toHaveBeenCalled();
  });
});
