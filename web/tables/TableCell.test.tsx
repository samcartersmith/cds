import { renderA11y } from '@cbhq/jest-utils';
import { Table } from './Table';
import { TableBody } from './TableSection';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';

describe('Table Cell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableBody>
            <TableRow fullWidth>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
});
