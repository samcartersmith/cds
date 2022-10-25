import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCellFallback } from '../TableCellFallback';
import { TableRow } from '../TableRow';

describe('Table Cell Fallback', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableBody>
            <TableRow>
              <TableCellFallback title subtitle disableRandomRectWidth />
            </TableRow>
          </TableBody>
        </Table>,
      ),
    ).toHaveNoViolations();
  });

  it('renders fallback', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCellFallback title subtitle start="image" end="image" disableRandomRectWidth />
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId('table-cell-fallback-title')).toBeTruthy();
    expect(screen.getByTestId('table-cell-fallback-subtitle')).toBeTruthy();
    expect(screen.getByTestId('table-cell-fallback-media')).toBeTruthy();
    expect(screen.getByTestId('table-cell-fallback-accessory')).toBeTruthy();
  });
});
