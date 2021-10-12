import { renderA11y } from '@cbhq/jest-utils';
import { Table, TableHead, TableBody, TableFoot } from '..';

describe('Table Sections', () => {
  it('Table Head passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableHead>
            <th>Heading 1</th>
            <th>Heading 2</th>
          </TableHead>
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
          <TableFoot>
            <td>Foot Cell 1</td>
            <td>Foot Cell 2</td>
          </TableFoot>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
  it('Combined sections pass accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableHead>
            <th>Heading 1</th>
            <th>Heading 2</th>
          </TableHead>
          <TableBody>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </TableBody>
          <TableFoot>
            <td>Foot Cell 1</td>
            <td>Foot Cell 2</td>
          </TableFoot>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
});
