/* eslint-disable react-native/no-raw-text */

import { render, fireEvent } from '@testing-library/react-native';
import { Animated, Pressable } from 'react-native';

import { LinkButton } from '../LinkButton';

describe('LinkButton', () => {
  it('renders an animated view', () => {
    const result = render(<LinkButton>Child</LinkButton>);

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    const result = render(<LinkButton>Child</LinkButton>);

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders a children text', () => {
    const result = render(<LinkButton>Child</LinkButton>);

    expect(result.queryByText('Child')).not.toBeNull();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    const result = render(<LinkButton onPress={spy}>Child</LinkButton>);

    fireEvent.press(result.getByText('Child'));

    expect(spy).toHaveBeenCalled();
  });
});
