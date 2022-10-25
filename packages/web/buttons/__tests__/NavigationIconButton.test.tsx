import { fireEvent, render, screen } from '@testing-library/react';

import { NavigationIconButton } from '../NavigationIconButton';

describe('NavigationIconButton.test', () => {
  it('triggers onPress', () => {
    const onPress = jest.fn();

    render(<NavigationIconButton onPress={onPress} name="account" testID="test-nav-icon-button" />);

    fireEvent.click(screen.getByTestId('test-nav-icon-button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
