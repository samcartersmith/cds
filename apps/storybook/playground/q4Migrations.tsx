import React from 'react';
import { CellSpacing } from '@cbhq/cds-common';
import { Button, ButtonGroup } from '@cbhq/cds-web/buttons';
import { ListCell } from '@cbhq/cds-web/cells';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';

const offsetConfig = { offsetBottom: 3 } as CellSpacing;

export const Q4Migrations = () => {
  return (
    <FeatureFlagProvider
      frontier
      frontierButton
      frontierCard
      frontierColor
      frontierSparkline
      frontierTypography
    >
      <Box
        dangerouslySetBackground="red"
        dangerouslySetClassName="test"
        offsetBottom={2}
        offsetTop={3}
      >
        <Illustration name="2fa" type="pictogram" />
        <Avatar alt="alt text test" src="test" />
        {/* eslint-disable-next-line react-perf/jsx-no-new-object-as-prop */}
        <ListCell innerSpacing={{ offsetHorizontal: 2 }} />
        <ListCell outerSpacing={offsetConfig} />
        <ButtonGroup vertical>
          <Button>First</Button>
          <Button>Second</Button>
        </ButtonGroup>
      </Box>
    </FeatureFlagProvider>
  );
};
