import { render } from '@testing-library/react';

import { Tile } from '../Tile';

describe('Tile.test', () => {
  it('renders title', () => {
    const { getByText } = render(<Tile title="test title" pictogram="add" />);

    expect(getByText('test title')).toBeTruthy();
    expect(getByText('test title')).toHaveClass('truncatedStyles');
  });

  it('renders count', () => {
    const { getByText } = render(<Tile title="test title" pictogram="add" count={4} />);

    expect(getByText('4')).toBeTruthy();
  });

  it('overflows text', () => {
    const { getByText } = render(<Tile title="test title" pictogram="add" showOverflow />);

    expect(getByText('test title')).toHaveClass('overflowStyles');
  });
});
