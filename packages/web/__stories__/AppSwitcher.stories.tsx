import { memo, useCallback } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { NavigationIconButton } from '../buttons/NavigationIconButton';
import { DotCount } from '../dots/DotCount';
import { HStack } from '../layout';
import { Switcher } from '../navigation/Switcher';

import { AppSwitcherContent } from './AppSwitcherContent';

/** This is the component that Identity will likely encapsulate themselves. */
const AppSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  const [visible, toggleVisibility] = useToggler(false);
  const handleSubjectPress = useCallback(() => {
    toggleVisibility.toggle();
  }, [toggleVisibility]);

  const handleClose = useCallback(() => {
    toggleVisibility.toggleOff();
  }, [toggleVisibility]);
  return (
    <Switcher
      onPressSubject={handleSubjectPress}
      onClose={handleClose}
      visible={visible}
      content={<AppSwitcherContent />}
    >
      {children}
    </Switcher>
  );
});

export const AppSwitcher = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
      </AppSwitcherRecipe>
    </HStack>
  );
};

export const AppSwitcherWithDot = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <DotCount pin="top-end" count={4}>
          <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
        </DotCount>
      </AppSwitcherRecipe>
    </HStack>
  );
};

export default {
  title: 'Core Components/Switchers/AppSwitcher',
  component: AppSwitcher,
};
