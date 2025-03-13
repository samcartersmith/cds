import React, { useCallback, useRef } from 'react';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import { DrawerRefBaseProps } from '@cbhq/cds-common2/types';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SpotRectangle } from '../../illustrations';
import { Box, VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import { Tray, TrayStickyFooter } from '../tray/Tray';

export const Default = () => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="Dismiss"
          onCloseComplete={handleCloseTray}
          onVisibilityChange={handleTrayVisibilityChange}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack paddingBottom={1} paddingTop={1} paddingX={3}>
                <Box alignItems="center" paddingBottom={3}>
                  <SpotRectangle name="exploreDecentralizedApps" />
                </Box>
                <Text font="title1" align="center" paddingBottom={2}>
                  Earn crypto by lending, staking, and more
                </Text>
                <Text align="center" color="fgMuted">
                  Many decentralized apps (“dapps”) let you earn yield on your crypto. Check out
                  trusted dapps like Aave and Compound without leaving Coinbaes.
                </Text>
              </VStack>
              <StickyFooter paddingX={3}>
                <Button block onPress={handleClose}>
                  Explore Dapps
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const PromotionalTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Promotional Tray">
        <Default />
      </Example>
    </ExampleScreen>
  );
};

export default PromotionalTrayScreen;
