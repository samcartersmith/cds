import React, { useEffect } from 'react';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import type { DrawerBaseProps } from '@cbhq/cds-common2/types';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Fallback, Spacer, VStack } from '../../layout';
import { Drawer } from '../drawer/Drawer';

import { navOptions, SideDrawerContent } from './Drawers';

const SidebarDrawerContentFallback = () => {
  return (
    <VStack height="100%" justifyContent="space-between" padding={2} paddingBottom={4}>
      <VStack alignItems="center" gap={2}>
        <Fallback height={50} shape="circle" width={50} />
        <VStack alignItems="center" padding={2}>
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
  const [isVisible, { toggleOn, toggleOff }] = useToggler(true);
  const [isLoading, toggleIsLoading] = useToggler(true);

  useEffect(() => {
    if (isVisible) {
      toggleIsLoading.toggleOn();
      setTimeout(() => toggleIsLoading.toggleOff(), __DEV__ ? 2000 : 20000);
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

const DrawerFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Side Drawer with Fallback">
        <SideDrawerWithFallback pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerFallbackScreen;
