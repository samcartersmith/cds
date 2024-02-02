import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerRefBaseProps, useToggler } from '@cbhq/cds-common';
import { prices } from '@cbhq/cds-common/internal/data/prices';

import { Button } from '../../buttons/Button';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, HStack, VStack } from '../../layout';
import { Tray, TrayStickyFooter } from '../../overlays';
import { StickyFooter } from '../StickyFooter';

const options: string[] = prices.slice(0, 20);

const StickyFooterWithTray = ({ title }: { title?: string }) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
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

const StickyFooterScreen = () => {
  const [showStickyFooter, setShowStickyFooter] = useState(true);
  const handleButtonPress = useCallback(() => {
    setShowStickyFooter(!showStickyFooter);
  }, [showStickyFooter]);
  const inset = useSafeAreaInsets();
  return (
    <View>
      <ExampleScreen>
        <Example title="StickyFooter with Screen">
          <Button onPress={handleButtonPress}>{showStickyFooter ? 'Close' : 'Open'}</Button>
        </Example>
        <Example title="StickyFooter with Tray">
          <StickyFooterWithTray />
        </Example>
      </ExampleScreen>
      {showStickyFooter && (
        <View style={{ position: 'absolute', bottom: inset.bottom / 2, left: 0, right: 0 }}>
          <StickyFooter>
            <VStack
              alignContent="center"
              alignItems="center"
              gap={1}
              justifyContent="center"
              width="100%"
            >
              <Button block onPress={handleButtonPress}>
                Primary
              </Button>
              <Button block variant="secondary">
                Secondary
              </Button>
            </VStack>
          </StickyFooter>
        </View>
      )}
    </View>
  );
};

export default StickyFooterScreen;
