import { fireEvent, render, screen } from '@testing-library/react';

import { TileButton } from '../TileButton';

describe('TileButton.test', () => {
  it('triggers press', () => {
    const onPress = jest.fn();
    render(
      <TileButton onPress={onPress} title="test title" pictogram="add" testID="test-tile-button" />,
    );

    fireEvent.click(screen.getByTestId('test-tile-button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
