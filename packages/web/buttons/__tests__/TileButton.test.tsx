import { fireEvent, render, screen } from '@testing-library/react';

import { TileButton } from '../TileButton';

let mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('TileButton.test', () => {
  beforeEach(() => {
    mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('triggers press', () => {
    const onPress = jest.fn();

    render(
      <TileButton onPress={onPress} title="test title" pictogram="add" testID="test-tile-button" />,
    );

    fireEvent.click(screen.getByTestId('test-tile-button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('logs warning in dev environment when title is empty', () => {
    process.env.NODE_ENV = 'development';

    const onPress = jest.fn();

    render(<TileButton onPress={onPress} title="  " pictogram="add" />);

    expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
  });

  it('does not log warning in a non dev environment', () => {
    const onPress = jest.fn();

    render(<TileButton onPress={onPress} title="  " pictogram="add" />);

    expect(mockConsoleWarn).toHaveBeenCalledTimes(0);
  });

  it('does not log warning when title contains text', () => {
    process.env.NODE_ENV = 'development';

    const onPress = jest.fn();

    render(<TileButton onPress={onPress} title="test title" pictogram="add" />);

    expect(mockConsoleWarn).toHaveBeenCalledTimes(0);
  });
});
