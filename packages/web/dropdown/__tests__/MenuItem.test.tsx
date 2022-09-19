/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { fireEvent, render } from '@testing-library/react';

import { SelectProvider } from '../../controls/selectContext';
import { TextTitle2 } from '../../typography';
import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('renders children', () => {
    const { getByText } = render(
      <MenuItem value="1">
        <TextTitle2 as="p">Item1</TextTitle2>
      </MenuItem>,
    );

    expect(getByText('Item1')).toBeTruthy();
  });

  it('triggers on press', () => {
    const onPress = jest.fn();
    const handleCloseMenu = jest.fn();

    const { getByTestId } = render(
      <SelectProvider value={{ handleCloseMenu }}>
        <MenuItem value="1" onPress={onPress} testID="test-menu-item">
          <TextTitle2 as="p">Item1</TextTitle2>
        </MenuItem>
      </SelectProvider>,
    );

    fireEvent.click(getByTestId('test-menu-item'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(handleCloseMenu).toHaveBeenCalledTimes(1);
  });

  it('disables close on option change', () => {
    const onPress = jest.fn();
    const handleCloseMenu = jest.fn();

    const { getByTestId } = render(
      <SelectProvider value={{ handleCloseMenu }}>
        <MenuItem value="1" onPress={onPress} testID="test-menu-item" disableCloseOnOptionChange>
          <TextTitle2 as="p">Item1</TextTitle2>
        </MenuItem>
      </SelectProvider>,
    );

    fireEvent.click(getByTestId('test-menu-item'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(handleCloseMenu).toHaveBeenCalledTimes(0);
  });
});
