/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { GridColumn } from '../GridColumn';

describe('GridColumn', () => {
  const TEST_ID = 'grid-column-test';
  it('attaches testID', () => {
    render(<GridColumn testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<GridColumn />)).toHaveNoViolations();
  });

  it('can set custom styles', () => {
    render(
      <GridColumn
        style={{
          backgroundColor: 'red',
        }}
        testID={TEST_ID}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: 'red',
    });
  });

  it('can set gap', () => {
    render(<GridColumn gap={2} testID={TEST_ID} />);

    const element = screen.getByTestId(TEST_ID);
    expect(element.className).toContain('cds-2');
    expect(element.className).toContain('cds-gridColumnStart');
    expect(element.className).toContain('cds-gridColumnEnd');
  });
});
