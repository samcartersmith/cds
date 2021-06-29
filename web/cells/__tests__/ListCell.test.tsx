import { render } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { Button } from '../../buttons';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

describe('ListCell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <ListCell title="Title" description="Description" detail="Detail" subdetail="Subdetail" />
      )
    ).toHaveNoViolations();
  });

  it('renders a title', () => {
    const result = render(<ListCell title={<div data-testid="title">Title</div>} />);

    expect(result.queryByTestId('title')).not.toBeNull();
  });

  it('renders a description', () => {
    const result = render(
      <ListCell description={<div data-testid="description">Description</div>} />
    );

    expect(result.queryByTestId('description')).not.toBeNull();
  });

  it('renders a detail', () => {
    const result = render(<ListCell detail={<div data-testid="detail">Detail</div>} />);

    expect(result.queryByTestId('detail')).not.toBeNull();
  });

  it('renders a subdetail', () => {
    const result = render(
      <ListCell title="Title" subdetail={<div data-testid="subdetail">Subdetail</div>} />
    );

    expect(result.queryByTestId('subdetail')).not.toBeNull();
  });

  it('renders media', () => {
    const result = render(<ListCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(result.queryByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    const result = render(<ListCell accessory="arrow" />);

    expect(result.queryByTestId('accessory')).not.toBeNull();
  });
  it('renders an action', () => {
    const button = <Button data-testid="button">Test</Button>;
    const result = render(<ListCell action={button} />);

    expect(result.queryByTestId('button')).not.toBeNull();
  });
});
