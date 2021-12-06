import React from 'react';

import { Button } from '@cbhq/cds-mobile/buttons';
import { Drawer } from '@cbhq/cds-mobile/overlays';
import { VStack } from '@cbhq/cds-mobile/layout/VStack';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { DrawerBaseProps } from '@cbhq/cds-common/types';

import { LoremIpsum } from '../internal/LoremIpsum';
import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

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
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default DrawerScreen;
