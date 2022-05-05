import { memo } from 'react';
import { AppSwitcherContent } from '@cbhq/cds-web/__stories__/AppSwitcherContent';
import { NavigationIconButton } from '@cbhq/cds-web/buttons/NavigationIconButton';
import { Dropdown } from '@cbhq/cds-web/dropdown';
import { VStack } from '@cbhq/cds-web/layout';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { PopoverContentPositionConfig } from '@cbhq/cds-web/overlays/positionedOverlay/PositionedOverlayProps';
import { FeatureFlagProvider } from '@cbhq/cds-web/system/FeatureFlagProvider';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';

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
        <VStack spacingVertical={2}>
          <TextBody as="p" spacingBottom={2}>
            App Switcher is a global component that lives in the Navigation Header that enables
            users to switch between all Coinbase products without having to log in again.
          </TextBody>
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
        </VStack>
      </PortalProvider>
    </FeatureFlagProvider>
  );
};
