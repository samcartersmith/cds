import { render, screen } from '@testing-library/react';

import { Pictogram } from '../../illustrations';
import { RemoteImage } from '../../media';
import { Tile } from '../Tile';

const MockPictogram = () => <Pictogram name="add" />;

describe('Tile.test', () => {
  it('renders title', () => {
    render(
      <Tile title="test title">
        <MockPictogram />
      </Tile>,
    );

    expect(screen.getByText('test title')).toBeTruthy();
    expect(screen.getByText('test title')).toHaveClass('truncatedStyles');
  });

  it('renders count', () => {
    render(
      <Tile count={4} title="test title">
        <MockPictogram />
      </Tile>,
    );

    expect(screen.getByText('4')).toBeTruthy();
  });

  it('overflows text', () => {
    render(
      <Tile showOverflow title="test title">
        <MockPictogram />
      </Tile>,
    );

    expect(screen.getByText('test title')).toHaveClass('overflowStyles');
  });

  it('renders pictogram', () => {
    render(
      <Tile title="test title">
        <MockPictogram />
      </Tile>,
    );

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('add'));
  });

  it('renders remote image', () => {
    render(
      <Tile title="test title">
        <RemoteImage source="test-image-src" />
      </Tile>,
    );

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image-src');
  });
});
