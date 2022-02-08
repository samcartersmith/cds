import React from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import type { DrawerBaseProps, IconName } from '@cbhq/cds-common/types';
import { Avatar } from '../../media/Avatar';

import { Button } from '../../buttons/Button';
import { VStack } from '../../layout';

import { Drawer } from '../Drawer/Drawer';

import { Example, ExampleScreen, LoremIpsum } from '../../examples/ExampleScreen';
import { TextTitle3 } from '../../typography';
import { Icon } from '../../icons/Icon';
import { ListCell } from '../../cells/ListCell';

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
          {({ closeDrawer }) => (
            <VStack spacing={2}>
              <LoremIpsum />
              <Button variant="secondary" onPress={closeDrawer}>
                Close Drawer
              </Button>
            </VStack>
          )}
        </Drawer>
      )}
    </>
  );
};

const SideDrawer = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(false);
  return (
    <>
      <Button onPress={toggleOn}>Open</Button>
      {isVisible && (
        <Drawer pin={pin} onCloseComplete={toggleOff}>
          {({ closeDrawer }) => (
            <VStack spacing={2} justifyContent="space-between" height="100%" spacingBottom={4}>
              <VStack alignItems="center">
                <Avatar alt="CDS" size="xxl" />
                <VStack spacing={2}>
                  <TextTitle3>Test User</TextTitle3>
                </VStack>
                <Button compact block variant="secondary" onPress={closeDrawer}>
                  Profile & Settings
                </Button>
                <VStack spacingVertical={2}>
                  {navOptions.map(({ label, icon }) => (
                    <ListCell
                      compact
                      onPress={closeDrawer}
                      title={label}
                      key={label}
                      media={<Icon size="s" name={icon} color="foreground" />}
                    />
                  ))}
                </VStack>
              </VStack>
              <Button compact block variant="secondary" onPress={closeDrawer}>
                Sign out
              </Button>
            </VStack>
          )}
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
    </ExampleScreen>
  );
};

export default DrawerScreen;
