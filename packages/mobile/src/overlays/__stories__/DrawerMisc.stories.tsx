import React, { useCallback, useRef } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import type { DrawerBaseProps } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useA11y } from '../../hooks/useA11y';
import { Drawer } from '../Drawer/Drawer';

import { SideDrawerContent } from './Drawers';

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

const DrawerMiscScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Drawer with A11y focus return">
        <SideDrawerWithA11y pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerMiscScreen;
