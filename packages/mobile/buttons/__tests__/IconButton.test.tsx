/* eslint-disable react-native-a11y/has-accessibility-hint */

import { Animated, Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { debounce } from '../../utils/debounce';
import { IconButton } from '../IconButton';

jest.mock('../../utils/debounce');

const name = 'allTimeHigh';

describe('IconButton', () => {
  it('renders an animated view', () => {
    render(<IconButton name={name} accessibilityLabel={name} />);

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    render(<IconButton name={name} accessibilityLabel={name} />);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    render(<IconButton onPress={spy} name={name} accessibilityLabel={name} />);

    fireEvent.press(screen.getByLabelText(name));

    expect(spy).toHaveBeenCalled();
  });
});
