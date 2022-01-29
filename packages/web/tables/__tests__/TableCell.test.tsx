import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableRow } from '../TableRow';

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
