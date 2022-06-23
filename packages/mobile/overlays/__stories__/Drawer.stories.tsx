import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import type { DrawerBaseProps, DrawerRefBaseProps, IconName, NoopFn } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { Fallback, Spacer, VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Avatar } from '../../media/Avatar';
import { PressableOpacity } from '../../system';
import { TextTitle3 } from '../../typography';
import { Drawer } from '../Drawer/Drawer';

type NavOptionProps = {
  label: string;
  icon: IconName;
};

const navOptions: NavOptionProps[] = [
  {
    label: 'Learn and earn',
    icon: 'blockchain',
  },
  {
    label: 'Borrow cash',
    icon: 'currencies',
  },
  {
    label: 'Earn up to 5% APY',
    icon: 'pay',
  },
  {
    label: 'Invite friends',
    icon: 'followActive',
  },
  {
    label: 'Send a gift',
    icon: 'giftCard',
  },
  {
    label: 'Get support',
    icon: 'protection',
  },
];

const DefaultDrawer = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(false);
  return (
    <>
      <Button onPress={toggleOn}>Open</Button>
      {isVisible && (
        <Drawer pin={pin} onCloseComplete={toggleOff}>
          {({ handleClose }) => (
            <VStack spacing={2}>
              <LoremIpsum />
              <Button variant="secondary" onPress={handleClose}>
                Close Drawer
              </Button>
            </VStack>
          )}
        </Drawer>
      )}
    </>
  );
};

type SideDrawerContentProps = {
  handleClose: NoopFn;
};

const SideDrawerContent = ({ handleClose }: SideDrawerContentProps) => {
  return (
    <VStack spacing={2} justifyContent="space-between" height="100%" spacingBottom={4}>
      <VStack alignItems="center">
        <Avatar alt="CDS" size="xxl" />
        <VStack spacing={2}>
          <TextTitle3>Test User</TextTitle3>
        </VStack>
        <Button compact block variant="secondary" onPress={handleClose}>
          Profile & Settings
        </Button>
        <VStack spacingVertical={2}>
          {navOptions.map(({ label, icon }) => (
            <ListCell
              compact
              onPress={handleClose}
              title={label}
              key={label}
              media={<Icon size="s" name={icon} color="foreground" />}
            />
          ))}
        </VStack>
      </VStack>
      <Button compact block variant="secondary" onPress={handleClose}>
        Sign out
      </Button>
    </VStack>
  );
};

const SideDrawer = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(false);
  return (
    <>
      <Button onPress={toggleOn}>Open</Button>
      {isVisible && (
        <Drawer pin={pin} onCloseComplete={toggleOff}>
          {({ handleClose }) => <SideDrawerContent handleClose={handleClose} />}
        </Drawer>
      )}
    </>
  );
};

const lotsOfOptions: string[] = prices.slice(0, 30);

type RenderItemProps = {
  index: number;
  item: string;
};

const SideDrawerScrollableContent = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(false);
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
          title={item}
          description="BTC"
          onPress={handleOptionPress}
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
          disableCapturePanGestureToDismiss
          pin={pin}
          onCloseComplete={toggleOff}
          ref={drawerRef}
        >
          <VStack height={120} spacingHorizontal={3} spacingBottom={1}>
            <ScrollView>
              <PressableOpacity noScaleOnPress>
                <LoremIpsum repeat={2} />
              </PressableOpacity>
            </ScrollView>
          </VStack>
          <Menu value={value} onChange={setValue}>
            <FlatList data={lotsOfOptions} renderItem={renderItem} />
          </Menu>
        </Drawer>
      )}
    </>
  );
};

const SidebarDrawerContentFallback = () => {
  return (
    <VStack spacing={2} justifyContent="space-between" height="100%" spacingBottom={4}>
      <VStack alignItems="center" gap={2}>
        <Fallback width={50} height={50} shape="circle" />
        <VStack spacing={2} alignItems="center">
          <Fallback width={150} height={30} shape="square" />
        </VStack>
        <Fallback width="100%" height={50} shape="squircle" />
        <Spacer />
        {navOptions.map(({ label }) => (
          <Fallback key={label} width="100%" height={30} shape="square" />
        ))}
      </VStack>
      <Fallback width="100%" height={50} shape="squircle" />
    </VStack>
  );
};

const SideDrawerWithFallback = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(false);
  const [isLoading, toggleIsLoading] = useToggler(true);

  useEffect(() => {
    if (isVisible) {
      toggleIsLoading.toggleOn();
      setTimeout(() => {
        toggleIsLoading.toggleOff();
      }, 2000);
    }
  }, [toggleIsLoading, isVisible]);

  return (
    <>
      <Button onPress={toggleOn}>Open</Button>
      {isVisible && (
        <Drawer pin={pin} onCloseComplete={toggleOff}>
          {({ handleClose }) =>
            isLoading ? (
              <SidebarDrawerContentFallback />
            ) : (
              <SideDrawerContent handleClose={handleClose} />
            )
          }
        </Drawer>
      )}
    </>
  );
};

const DrawerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Left Drawer">
        <SideDrawer pin="left" />
      </Example>
      <Example title="Bottom Drawer">
        <DefaultDrawer pin="bottom" />
      </Example>
      <Example title="Right Drawer">
        <SideDrawer pin="right" />
      </Example>
      <Example title="Top Drawer">
        <DefaultDrawer pin="top" />
      </Example>
      <Example title="Side Drawer with Fallback">
        <SideDrawerWithFallback pin="left" />
      </Example>
      <Example title="Side Drawer with Scrollable Content">
        <SideDrawerScrollableContent pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerScreen;
