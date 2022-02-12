import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { TableBody } from '../TableBody';
import { TableRow } from '../TableRow';

describe('TableRow', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <TableBody>
          <TableRow>
            {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
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
          {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
          <>First child</>
        </TableRow>
        <TableRow data-row="my-second-row" testID="second-row">
          {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
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
