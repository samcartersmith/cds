import { render, screen } from '@testing-library/react-native';
import { CellSpacing } from '@cbhq/cds-common';

import { ListCellFallback } from '../ListCellFallback';

describe('ListCellFallback', () => {
  it('renders a ListCellFallback component', () => {
    render(<ListCellFallback testID="list-cell-fallback" />);
    expect(screen.getByTestId('list-cell-fallback')).toBeTruthy();
  });

  it('renders a Fallback component if description is passed', () => {
    render(<ListCellFallback description />);
    expect(screen.getByTestId('list-cell-fallback-description')).toBeTruthy();
  });

  it('renders a Fallback component if detail is passed', () => {
    render(<ListCellFallback detail />);
    expect(screen.getByTestId('list-cell-fallback-detail')).toBeTruthy();
  });

  it('renders a Fallback component if subdetail is passed', () => {
    render(<ListCellFallback subdetail />);
    expect(screen.getByTestId('list-cell-fallback-subdetail')).toBeTruthy();
  });

  it('renders a Fallback component if title is passed', () => {
    render(<ListCellFallback title />);
    expect(screen.getByTestId('list-cell-fallback-title')).toBeTruthy();
  });

  it('renders a MediaFallback component if media is passed', () => {
    render(<ListCellFallback media="asset" />);
    expect(screen.getByTestId('list-cell-fallback-media')).toBeTruthy();
  });

  it('renders ListCellFallback component with innerSpacing and outerSpacing', () => {
    const innerSpacing: CellSpacing = {
      spacingHorizontal: 3,
      spacingVertical: 4,
    };
    const outerSpacing: CellSpacing = {
      spacingHorizontal: 0,
      spacingVertical: 2,
    };

    render(
      <ListCellFallback
        innerSpacing={innerSpacing}
        outerSpacing={outerSpacing}
        testID="list-cell-fallback"
      />,
    );
    expect(screen.getByTestId('list-cell-fallback')).toHaveStyle(
      `padding: ${outerSpacing.spacingVertical}px ${innerSpacing.spacingHorizontal}px;`,
    );
  });
});
