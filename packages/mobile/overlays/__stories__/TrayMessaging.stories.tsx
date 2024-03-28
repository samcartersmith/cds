import React, { useCallback, useRef } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { DrawerRefBaseProps } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SpotSquare } from '../../illustrations';
import { Box, VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { TextBody, TextTitle1 } from '../../typography';
import { Tray, TrayStickyFooter } from '../Tray/Tray';

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
              <VStack spacingBottom={1} spacingHorizontal={3} spacingTop={1}>
                <Box alignItems="center" spacingBottom={4}>
                  <SpotSquare name="borrowWallet" />
                </Box>
                <TextTitle1 align="center" spacingBottom={1}>
                  You’re ready to explore
                </TextTitle1>
                <TextBody align="center" color="foregroundMuted">
                  You don’t have any dapps open right now. Here’s one you might like: [dapp]
                </TextBody>
              </VStack>
              <StickyFooter spacingHorizontal={3}>
                <Button block onPress={handleClose}>
                  Button
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const MessagingTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Messaging Tray">
        <Default />
      </Example>
    </ExampleScreen>
  );
};

export default MessagingTrayScreen;
