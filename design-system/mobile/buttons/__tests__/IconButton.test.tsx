/* eslint-disable react-native-a11y/has-accessibility-hint */

import { render, fireEvent } from '@testing-library/react-native';
import { Animated, Pressable } from 'react-native';

import { debounce } from '../../utils/debounce';
import { IconButton } from '../IconButton';

jest.mock('../../utils/debounce');

const name = 'allTimeHigh';

describe('IconButton', () => {
  it('renders an animated view', () => {
    const result = render(<IconButton name={name} accessibilityLabel={name} />);

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    const result = render(<IconButton name={name} accessibilityLabel={name} />);

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    const result = render(<IconButton onPress={spy} name={name} accessibilityLabel={name} />);

    fireEvent.press(result.getByLabelText(name));

    expect(spy).toHaveBeenCalled();
  });
});
