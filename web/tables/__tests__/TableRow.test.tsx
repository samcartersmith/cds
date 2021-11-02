import { renderA11y } from '@cbhq/jest-utils';
import { render } from '@testing-library/react';
import { TableRow } from '../TableRow';
import { TableBody } from '../TableBody';

describe('TableRow', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <TableBody>
          <TableRow>
            <>Child</>
          </TableRow>
        </TableBody>,
      ),
    ).toHaveNoViolations();
  });

  it('spreads data props', async () => {
    const { findByTestId } = render(
      <TableBody>
        <TableRow data-row="my-first-row" testID="first-row">
          <>First child</>
        </TableRow>
        <TableRow data-row="my-second-row" testID="second-row">
          <>Second child</>
        </TableRow>
      </TableBody>,
    );
    const firstChild = await findByTestId('first-row');
    const secondChild = await findByTestId('second-row');

    expect(firstChild).toHaveAttribute('data-row', 'my-first-row');
    expect(secondChild).toHaveAttribute('data-row', 'my-second-row');
  });
});
