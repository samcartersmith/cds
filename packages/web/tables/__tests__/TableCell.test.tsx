import { render, screen } from '@testing-library/react';
import { css } from 'linaria';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableRow } from '../TableRow';

const testClassName = css`
  display: flex;
`;
const exampleTestId = 'table-cell-test';

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

  it('renders with children', () => {
    render(
      <Table>
        <TableBody>
          <TableRow fullWidth>
            <TableCell testID={exampleTestId}>children text</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('children text')).toBeTruthy();
  });

  it('renders with title and subtitle', () => {
    render(
      <Table>
        <TableBody>
          <TableRow fullWidth>
            <TableCell subtitle="test subtitle" testID={exampleTestId} title="test title" />
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('test title')).toBeTruthy();
    expect(screen.getByText('test subtitle')).toBeTruthy();
  });

  it('renders start element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow fullWidth>
            <TableCell start={<div>test start element</div>} testID={exampleTestId}>
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('test start element')).toBeTruthy();
  });

  it('renders end element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow fullWidth>
            <TableCell end={<div>test end element</div>} testID={exampleTestId}>
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('test end element')).toBeTruthy();
  });

  it('passes a className to dangerouslySetClassName', () => {
    render(
      <Table>
        <TableBody>
          <TableRow fullWidth>
            <TableCell dangerouslySetClassName={testClassName} testID={exampleTestId}>
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId(exampleTestId)).toHaveClass(testClassName);
  });
});
