import React from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import type { DrawerBaseProps, IconName, NoopFn } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Icon } from '../../icons/Icon';
import { VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Avatar } from '../../media/Avatar';
import { TextTitle3 } from '../../typography';
import { Drawer } from '../Drawer/Drawer';

export const DefaultDrawer = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(true);
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

type NavOptionProps = {
  label: string;
  icon: IconName;
};

export const navOptions: NavOptionProps[] = [
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

type SideDrawerContentProps = {
  handleClose: NoopFn;
};

export const SideDrawerContent = ({ handleClose }: SideDrawerContentProps) => {
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

export const SideDrawer = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(true);
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
