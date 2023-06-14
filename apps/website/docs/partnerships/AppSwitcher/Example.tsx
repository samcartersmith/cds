import { memo } from 'react';
import { AppSwitcherContent } from '@cbhq/cds-web/__stories__/AppSwitcherContent';
import { NavigationIconButton } from '@cbhq/cds-web/buttons/NavigationIconButton';
import { Dropdown } from '@cbhq/cds-web/dropdown';
import { VStack } from '@cbhq/cds-web/layout';
import { PopoverContentPositionConfig } from '@cbhq/cds-web/overlays/popover/PopoverProps';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system/FeatureFlagProvider';

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom',
  gap: 1,
};

const AppSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Dropdown
      width={359}
      maxHeight={600}
      content={<AppSwitcherContent />}
      showOverlay
      enableMobileModal
      contentPosition={switcherPositionConfig}
    >
      {children}
    </Dropdown>
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
          borderRadius="rounded"
        >
          <AppSwitcherRecipe>
            <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
          </AppSwitcherRecipe>
        </VStack>
      </PortalProvider>
    </FeatureFlagProvider>
  );
};
