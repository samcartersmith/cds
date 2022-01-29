import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Table } from '../Table';

describe('Table', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <>Child</>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
});
