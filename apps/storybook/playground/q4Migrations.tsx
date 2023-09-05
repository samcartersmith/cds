import React from 'react';
import { CellSpacing } from '@cbhq/cds-common';
import { ListCell } from '@cbhq/cds-web/cells';
import { Box } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';

const offsetConfig = { offsetBottom: 3 } as CellSpacing;

export const Q4Migrations = () => {
  return (
    <Box
      dangerouslySetClassName="test"
      dangerouslySetBackground="red"
      offsetBottom={2}
      offsetTop={3}
    >
      <Avatar src="test" alt="alt text test" />
      {/* eslint-disable-next-line react-perf/jsx-no-new-object-as-prop */}
      <ListCell innerSpacing={{ offsetHorizontal: 2 }} />
      <ListCell outerSpacing={offsetConfig} />
    </Box>
  );
};
