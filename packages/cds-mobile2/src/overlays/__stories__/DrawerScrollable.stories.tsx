import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import { prices } from '@cbhq/cds-common2/internal/data/prices';
import type { DrawerBaseProps, DrawerRefBaseProps } from '@cbhq/cds-common2/types';

import { Button } from '../../buttons/Button';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Pressable } from '../../system/Pressable';
import { Drawer } from '../drawer/Drawer';

const lotsOfOptions: string[] = prices.slice(0, 30);

type RenderItemProps = {
  index: number;
  item: string;
};

const SideDrawerScrollableContent = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(true);
  const drawerRef = useRef<DrawerRefBaseProps>(null);
  const [value, setValue] = useState<string>();

  const handleOptionPress = useCallback(() => {
    drawerRef.current?.handleClose();
  }, []);

  const renderItem = useCallback(
    ({ index, item }: RenderItemProps) => {
      return (
        <SelectOption
          key={index}
          description="BTC"
          onPress={handleOptionPress}
          title={item}
          value={item}
        />
      );
    },
    [handleOptionPress],
  );

  return (
    <>
      <Button onPress={toggleOn}>Open</Button>
      {isVisible && (
        <Drawer
          ref={drawerRef}
          disableCapturePanGestureToDismiss
          onCloseComplete={toggleOff}
          pin={pin}
        >
          <VStack height={120} paddingBottom={1} paddingX={3}>
            <ScrollView>
              <Pressable noScaleOnPress accessibilityRole="button" background="transparent">
                <LoremIpsum repeat={2} />
              </Pressable>
            </ScrollView>
          </VStack>
          <Menu onChange={setValue} value={value}>
            <FlatList data={lotsOfOptions} renderItem={renderItem} />
          </Menu>
        </Drawer>
      )}
    </>
  );
};

const DrawerScrollableScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Side Drawer with Scrollable Content">
        <SideDrawerScrollableContent pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerScrollableScreen;
