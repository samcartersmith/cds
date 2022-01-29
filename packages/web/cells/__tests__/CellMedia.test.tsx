import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { CellMedia } from '../CellMedia';

describe('CellMedia', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia type="asset" source="some/image/path" title="Test" />),
    ).toHaveNoViolations();
  });

  it('renders an icon', () => {
    const result = render(<CellMedia type="icon" name="arrowUp" />);

    expect(result.getByRole('presentation')).toHaveAttribute('data-icon-name', 'arrowUp');
  });

  it('renders an asset', () => {
    const result = render(<CellMedia type="asset" source="some/image/path" title="Test" />);
    const image = result.getByAltText('Test');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });

  it('renders an avatar', () => {
    const result = render(<CellMedia type="avatar" source="some/image/path" title="Test" />);
    const image = result.getByAltText('Test');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });

  it('renders an image', () => {
    const result = render(<CellMedia type="image" source="some/image/path" title="Test" />);
    const image = result.getByAltText('Test');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveAttribute('width', '48');
    expect(image).toHaveAttribute('height', '48');
  });
});
