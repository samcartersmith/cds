import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { CellMedia } from '../CellMedia';

describe('CellMedia', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia type="asset" source="some/image/path" title="Test" />),
    ).toHaveNoViolations();
  });

  it('renders an icon', () => {
    render(<CellMedia type="icon" name="arrowUp" />);

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'arrowUp');
  });

  it('renders an asset', () => {
    render(<CellMedia type="asset" source="some/image/path" title="Test" />);
    const image = screen.getByAltText('Test');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });

  it('renders an avatar', () => {
    render(<CellMedia type="avatar" source="some/image/path" title="Test" />);
    const image = screen.getByAltText('Test');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });

  it('renders an image', () => {
    render(<CellMedia type="image" source="some/image/path" title="Test" />);
    const image = screen.getByAltText('Test');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveAttribute('width', '48');
    expect(image).toHaveAttribute('height', '48');
  });
});
