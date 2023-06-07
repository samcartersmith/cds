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

  it('passes a className to dangerouslySetClassName', () => {
    render(
      <Table>
        <TableBody>
          <TableRow fullWidth>
            <TableCell testID={exampleTestId} dangerouslySetClassName={testClassName}>
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId(exampleTestId)).toHaveClass(testClassName);
  });
});
