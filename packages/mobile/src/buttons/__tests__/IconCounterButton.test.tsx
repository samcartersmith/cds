import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Pressable } from '../../system';
import { IconCounterButton } from '../IconCounterButton';

describe('IconCounterButton', () => {
  it('passes a11y', () => {
    render(<IconCounterButton icon="heart" testID="button" />);
    expect(screen.getByTestId('button')).toBeAccessible();
  });

  it('renders a pressable', () => {
    render(<IconCounterButton icon="heart" testID="button" />);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('calls onPress when pressed', () => {
    const handlePress = jest.fn();
    render(<IconCounterButton icon="heart" onPress={handlePress} testID="button" />);

    fireEvent.press(screen.getByTestId('button'));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(<IconCounterButton ref={ref} icon="heartActive" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(View);
  });
});
