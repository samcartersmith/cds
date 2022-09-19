import { fireEvent, render } from '@testing-library/react';

import { TileButton } from '../TileButton';

describe('TileButton.test', () => {
  it('triggers press', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TileButton onPress={onPress} title="test title" pictogram="add" testID="test-tile-button" />,
    );

    fireEvent.click(getByTestId('test-tile-button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
