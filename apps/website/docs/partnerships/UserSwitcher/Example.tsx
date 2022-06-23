import { UserSwitcher } from '@cbhq/cds-web/__stories__/UserSwitcher.stories';
import { VStack } from '@cbhq/cds-web/layout';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system/FeatureFlagProvider';

export const UserSwitcherExample = () => {
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
          <UserSwitcher title="Brian Armstrong" description="brian.armstrong@coinbase.com" />
        </VStack>
      </PortalProvider>
    </FeatureFlagProvider>
  );
};
