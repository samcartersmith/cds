import React, { memo } from 'react';
import type { ChangelogListCellProps } from '@theme/ChangelogListCell';
import { ListCell } from '@cbhq/cds-web/cells/ListCell';

const ChangelogListCell = memo(function ChangelogListCell(props: ChangelogListCellProps) {
  return <ListCell {...props} />;
});

ChangelogListCell.displayName = 'ChangelogListCell';

export default ChangelogListCell;
