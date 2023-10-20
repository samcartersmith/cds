import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import type { DrawerBaseProps, DrawerRefBaseProps, IconName, NoopFn } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useA11y } from '../../hooks/useA11y';
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
        <Drawer onCloseComplete={toggleOff} pin={pin}>
          {({ handleClose }) => (
            <VStack spacing={2}>
              <LoremIpsum />
              <Button onPress={handleClose} variant="secondary">
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
    <VStack height="100%" justifyContent="space-between" spacing={2} spacingBottom={4}>
      <VStack alignItems="center">
        <Avatar alt="CDS" size="xxl" />
        <VStack spacing={2}>
          <TextTitle3>Test User</TextTitle3>
        </VStack>
        <Button block compact onPress={handleClose} variant="secondary">
          Profile & Settings
        </Button>
        <VStack spacingVertical={2}>
          {navOptions.map(({ label, icon }) => (
            <ListCell
              key={label}
              compact
              media={<Icon color="foreground" name={icon} size="s" />}
              onPress={handleClose}
              title={label}
            />
          ))}
        </VStack>
      </VStack>
      <Button block compact onPress={handleClose} variant="secondary">
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
        <Drawer onCloseComplete={toggleOff} pin={pin}>
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
          <VStack height={120} spacingBottom={1} spacingHorizontal={3}>
            <ScrollView>
              <PressableOpacity noScaleOnPress>
                <LoremIpsum repeat={2} />
              </PressableOpacity>
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

const SidebarDrawerContentFallback = () => {
  return (
    <VStack height="100%" justifyContent="space-between" spacing={2} spacingBottom={4}>
      <VStack alignItems="center" gap={2}>
        <Fallback height={50} shape="circle" width={50} />
        <VStack alignItems="center" spacing={2}>
          <Fallback height={30} shape="square" width={150} />
        </VStack>
        <Fallback height={50} shape="squircle" width="100%" />
        <Spacer />
        {navOptions.map(({ label }) => (
          <Fallback key={label} height={30} shape="square" width="100%" />
        ))}
      </VStack>
      <Fallback height={50} shape="squircle" width="100%" />
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
        <Drawer onCloseComplete={toggleOff} pin={pin}>
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

const SideDrawerWithA11y = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(false);
  const triggerRef = useRef(null);
  const { setA11yFocus } = useA11y();

  const handleCloseDrawer = useCallback(() => {
    toggleOff();
    // return a11y focus to trigger
    setA11yFocus(triggerRef);
  }, [toggleOff, setA11yFocus]);

  return (
    <>
      <Button ref={triggerRef} onPress={toggleOn}>
        Open
      </Button>
      {isVisible && (
        <Drawer onCloseComplete={handleCloseDrawer} pin={pin}>
          {({ handleClose }) => <SideDrawerContent handleClose={handleClose} />}
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
      <Example title="Drawer with A11y focus return">
        <SideDrawerWithA11y pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerScreen;
