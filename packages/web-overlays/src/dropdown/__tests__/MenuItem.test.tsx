/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { fireEvent, render, screen } from '@testing-library/react';
import { SelectProvider } from '@cbhq/cds-web/controls/selectContext';
import { TextTitle2 } from '@cbhq/cds-web/typography';

import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('renders children', () => {
    render(
      <MenuItem value="1">
        <TextTitle2 as="p">Item1</TextTitle2>
      </MenuItem>,
    );

    expect(screen.getByText('Item1')).toBeTruthy();
  });

  it('triggers on press', () => {
    const onPress = jest.fn();
    const handleCloseMenu = jest.fn();

    render(
      <SelectProvider value={{ handleCloseMenu }}>
        <MenuItem onPress={onPress} testID="test-menu-item" value="1">
          <TextTitle2 as="p">Item1</TextTitle2>
        </MenuItem>
      </SelectProvider>,
    );

    fireEvent.click(screen.getByTestId('test-menu-item'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(handleCloseMenu).toHaveBeenCalledTimes(1);
  });

  it('disables close on option change', () => {
    const onPress = jest.fn();
    const handleCloseMenu = jest.fn();

    render(
      <SelectProvider value={{ handleCloseMenu }}>
        <MenuItem disableCloseOnOptionChange onPress={onPress} testID="test-menu-item" value="1">
          <TextTitle2 as="p">Item1</TextTitle2>
        </MenuItem>
      </SelectProvider>,
    );

    fireEvent.click(screen.getByTestId('test-menu-item'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(handleCloseMenu).toHaveBeenCalledTimes(0);
  });
});
