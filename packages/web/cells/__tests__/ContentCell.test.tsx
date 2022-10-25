import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

describe('ContentCell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <ContentCell title="Title" subtitle="Subtitle" description="Description" meta="Meta" />,
      ),
    ).toHaveNoViolations();
  });

  it('errors if meta is provided without title/subtitle', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    render(<ContentCell meta="Meta" />);

    expect(spy).toHaveBeenCalledWith(
      'ContentCell: Cannot use `meta` without a `title` or `subtitle`.',
    );

    spy.mockRestore();
  });

  it('renders a title', () => {
    render(<ContentCell title={<div data-testid="title">Title</div>} />);

    expect(screen.getByTestId('title')).not.toBeNull();
  });

  it('renders a subtitle', () => {
    render(<ContentCell subtitle={<div data-testid="subtitle">Subtitle</div>} />);

    expect(screen.getByTestId('subtitle')).not.toBeNull();
  });

  it('renders a description', () => {
    render(<ContentCell description={<div data-testid="description">Description</div>} />);

    expect(screen.getByTestId('description')).not.toBeNull();
  });

  it('renders meta', () => {
    render(<ContentCell title="Title" meta={<div data-testid="meta">Meta</div>} />);

    expect(screen.getByTestId('meta')).not.toBeNull();
  });

  it('renders media', () => {
    render(<ContentCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(screen.getByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    render(<ContentCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).not.toBeNull();
  });
});
