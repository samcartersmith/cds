import React from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import type { DrawerBaseProps } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { VStack } from '../../layout/VStack';

import { Drawer } from '../Drawer/Drawer';

import { Example, ExampleScreen, LoremIpsum } from '../../examples/ExampleScreen';

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
              <Button onPress={closeDrawer}>Close Drawer</Button>
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
        <DefaultDrawer pin="left" />
      </Example>
      <Example title="Bottom Drawer">
        <DefaultDrawer pin="bottom" />
      </Example>
      <Example title="Right Drawer">
        <DefaultDrawer pin="right" />
      </Example>
      <Example title="Top Drawer">
        <DefaultDrawer pin="top" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerScreen;
