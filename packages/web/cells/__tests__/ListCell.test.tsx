import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../buttons';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

describe('ListCell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <ListCell title="Title" description="Description" detail="Detail" subdetail="Subdetail" />,
      ),
    ).toHaveNoViolations();
  });

  it('renders a title', () => {
    render(<ListCell title={<div data-testid="title">Title</div>} />);

    expect(screen.getByTestId('title')).not.toBeNull();
  });

  it('renders a description', () => {
    render(<ListCell description={<div data-testid="description">Description</div>} />);

    expect(screen.getByTestId('description')).not.toBeNull();
  });

  it('renders a detail', () => {
    render(<ListCell detail={<div data-testid="detail">Detail</div>} />);

    expect(screen.getByTestId('detail')).not.toBeNull();
  });

  it('renders a subdetail', () => {
    render(<ListCell title="Title" subdetail={<div data-testid="subdetail">Subdetail</div>} />);

    expect(screen.getByTestId('subdetail')).not.toBeNull();
  });

  it('renders media', () => {
    render(<ListCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(screen.getByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    render(<ListCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).not.toBeNull();
  });
  it('renders an action', () => {
    const button = <Button data-testid="button">Test</Button>;
    render(<ListCell action={button} />);

    expect(screen.getByTestId('button')).not.toBeNull();
  });
});
