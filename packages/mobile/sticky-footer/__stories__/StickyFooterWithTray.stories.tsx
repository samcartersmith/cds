import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { DrawerRefBaseProps, useToggler } from '@cbhq/cds-common';
import { prices } from '@cbhq/cds-common/internal/data/prices';

import { Button } from '../../buttons/Button';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, HStack } from '../../layout';
import { Tray, TrayStickyFooter } from '../../overlays';
import { StickyFooter } from '../StickyFooter';

const options: string[] = prices.slice(0, 20);

const StickyFooterWithTray = ({ title }: { title?: string }) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(true);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayClose = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: string }) => {
      return (
        <SelectOption
          key={index}
          description="BTC"
          onPress={handleTrayClose}
          title={item}
          value={item}
        />
      );
    },
    [handleTrayClose],
  );

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          disableCapturePanGestureToDismiss
          onCloseComplete={handleCloseTray}
          title={title}
          verticalDrawerPercentageOfView={0.75}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <ScrollView>
                <Menu onChange={setValue} value={value}>
                  <FlatList data={options} renderItem={renderItem} scrollEnabled={false} />
                </Menu>
              </ScrollView>
              <StickyFooter elevated>
                <HStack
                  alignContent="center"
                  alignItems="center"
                  gap={1}
                  justifyContent="center"
                  width="100%"
                >
                  <Box flexGrow={1}>
                    <Button block variant="secondary">
                      Secondary
                    </Button>
                  </Box>
                  <Box flexGrow={1}>
                    <Button block onPress={handleClose}>
                      Primary
                    </Button>
                  </Box>
                </HStack>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

const StickyFooterWithTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="StickyFooter with Tray">
        <StickyFooterWithTray title="StickyFooter with Tray" />
      </Example>
    </ExampleScreen>
  );
};

export default StickyFooterWithTrayScreen;
