import { render } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

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
    const result = render(<ContentCell title={<div data-testid="title">Title</div>} />);

    expect(result.queryByTestId('title')).not.toBeNull();
  });

  it('renders a subtitle', () => {
    const result = render(<ContentCell subtitle={<div data-testid="subtitle">Subtitle</div>} />);

    expect(result.queryByTestId('subtitle')).not.toBeNull();
  });

  it('renders a description', () => {
    const result = render(
      <ContentCell description={<div data-testid="description">Description</div>} />,
    );

    expect(result.queryByTestId('description')).not.toBeNull();
  });

  it('renders meta', () => {
    const result = render(<ContentCell title="Title" meta={<div data-testid="meta">Meta</div>} />);

    expect(result.queryByTestId('meta')).not.toBeNull();
  });

  it('renders media', () => {
    const result = render(
      <ContentCell media={<CellMedia type="icon" name="add" testID="media" />} />,
    );

    expect(result.queryByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    const result = render(<ContentCell accessory="arrow" />);

    expect(result.queryByTestId('accessory')).not.toBeNull();
  });
});
