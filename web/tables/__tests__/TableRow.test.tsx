import { renderA11y } from '@cbhq/jest-utils';
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
});
