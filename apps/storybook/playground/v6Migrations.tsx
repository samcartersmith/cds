import React from 'react';
import { CellMedia } from 'packages/web/cells/CellMedia';
import { Button, ButtonGroup } from '@cbhq/cds-web/buttons';
import { ListCell } from '@cbhq/cds-web/cells';
import { HeroSquare, Pictogram, SpotRectangle, SpotSquare } from '@cbhq/cds-web/illustrations';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box } from '@cbhq/cds-web/layout';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';

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
      <Box dangerouslySetBackground="red" dangerouslySetClassName="test">
        <Illustration name="2fa" type="pictogram" />
        <ButtonGroup vertical>
          <Button>First</Button>
          <Button>Second</Button>
        </ButtonGroup>
        <Pictogram alt="nice" name="settings" />
        <SpotSquare alt="cool" name="walletNotifications" />
        <SpotRectangle alt="great" name="bigBtc" />
        <HeroSquare alt="amazing" name="bigBtc" />
        <ListCell
          // @ts-expect-error - this is a test
          media={<CellMedia name="arrowUp" title="test2" type="icon" />}
          title="Send asset"
        />
      </Box>
    </FeatureFlagProvider>
  );
};
