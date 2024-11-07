import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { TableCellSortIcon } from '../TableCellSortIcon';

describe('Table Cell Sort Icon', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<TableCellSortIcon />)).toHaveNoViolations();
    expect(await renderA11y(<TableCellSortIcon direction="ascending" />)).toHaveNoViolations();
    expect(await renderA11y(<TableCellSortIcon direction="descending" />)).toHaveNoViolations();
  });
});
