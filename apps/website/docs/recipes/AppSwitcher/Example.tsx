import { memo, useCallback } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { AppSwitcherContent } from '@cbhq/cds-web/__stories__/AppSwitcherContent';
import { NavigationIconButton } from '@cbhq/cds-web/buttons/NavigationIconButton';
import { VStack } from '@cbhq/cds-web/layout';
import { Switcher } from '@cbhq/cds-web/navigation/Switcher';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system/FeatureFlagProvider';

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

export const AppSwitcherExample = () => {
  return (
    <FeatureFlagProvider frontierColor frontierButton>
      <PortalProvider>
        <VStack
          alignItems="center"
          justifyContent="center"
          spacingVertical={4}
          bordered
          borderRadius="standard"
        >
          <AppSwitcherRecipe>
            <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
          </AppSwitcherRecipe>
        </VStack>
      </PortalProvider>
    </FeatureFlagProvider>
  );
};
