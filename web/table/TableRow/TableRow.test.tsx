import { renderA11y } from '@cbhq/jest-utils';
import { TableRow } from '..';

describe('TableRow', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <TableRow>
          <>Child</>
        </TableRow>,
      ),
    ).toHaveNoViolations();
  });
});
