import React from 'react';
import { Button, ButtonGroup } from '@cbhq/cds-web/buttons';
import { ListCell } from '@cbhq/cds-web/cells';
import { CellMedia } from '@cbhq/cds-web/cells/CellMedia';
import { HeroSquare, Pictogram, SpotRectangle, SpotSquare } from '@cbhq/cds-web/illustrations';
// @ts-expect-error testing
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box } from '@cbhq/cds-web/layout';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';

export const Q4Migrations = () => {
  return (
    <FeatureFlagProvider
      // @ts-expect-error this is for testing
      frontier
      frontierButton
      frontierCard
      frontierColor
      frontierSparkline
      frontierTypography
    >
      {/* @ts-expect-error testing */}
      <Box dangerouslySetBackground="red" dangerouslySetClassName="test">
        <Illustration name="2fa" type="pictogram" />
        {/* @ts-expect-error testing */}
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
