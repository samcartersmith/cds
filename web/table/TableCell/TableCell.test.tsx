import { renderA11y } from '@cbhq/jest-utils';
import { Table, TableCell, TableRow, TableBody } from '..';

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
