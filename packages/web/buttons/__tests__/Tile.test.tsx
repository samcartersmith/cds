import { render, screen } from '@testing-library/react';

import { Tile } from '../Tile';

describe('Tile.test', () => {
  it('renders title', () => {
    render(<Tile title="test title" pictogram="add" />);

    expect(screen.getByText('test title')).toBeTruthy();
    expect(screen.getByText('test title')).toHaveClass('truncatedStyles');
  });

  it('renders count', () => {
    render(<Tile title="test title" pictogram="add" count={4} />);

    expect(screen.getByText('4')).toBeTruthy();
  });

  it('overflows text', () => {
    render(<Tile title="test title" pictogram="add" showOverflow />);

    expect(screen.getByText('test title')).toHaveClass('overflowStyles');
  });
});
