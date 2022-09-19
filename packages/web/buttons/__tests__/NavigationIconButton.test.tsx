import { fireEvent, render } from '@testing-library/react';

import { NavigationIconButton } from '../NavigationIconButton';

describe('NavigationIconButton.test', () => {
  it('triggers onPress', () => {
    const onPress = jest.fn();

    const { getByTestId } = render(
      <NavigationIconButton onPress={onPress} name="account" testID="test-nav-icon-button" />,
    );

    fireEvent.click(getByTestId('test-nav-icon-button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
