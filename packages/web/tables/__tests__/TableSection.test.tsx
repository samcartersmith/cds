import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableFooter } from '../TableFooter';
import { TableHeader } from '../TableHeader';

describe('Table Sections', () => {
  it('Table Head passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableHeader>
            <th>Heading 1</th>
            <th>Heading 2</th>
          </TableHeader>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
  it('Table Body passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableBody>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </TableBody>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
  it('Table Foot passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableFooter>
            <td>Foot Cell 1</td>
            <td>Foot Cell 2</td>
          </TableFooter>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
  it('Combined sections pass accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableHeader>
            <th>Heading 1</th>
            <th>Heading 2</th>
          </TableHeader>
          <TableBody>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </TableBody>
          <TableFooter>
            <td>Foot Cell 1</td>
            <td>Foot Cell 2</td>
          </TableFooter>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
});
