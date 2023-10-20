import { UserSwitcher } from '@cbhq/cds-web/__stories__/UserSwitcher.stories';
import { VStack } from '@cbhq/cds-web/layout';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system/FeatureFlagProvider';

export const UserSwitcherExample = () => {
  return (
    <FeatureFlagProvider frontierButton frontierColor>
      <PortalProvider>
        <VStack
          bordered
          alignItems="center"
          borderRadius="rounded"
          justifyContent="center"
          spacingVertical={4}
        >
          <UserSwitcher description="brian.armstrong@coinbase.com" title="Brian Armstrong" />
        </VStack>
      </PortalProvider>
    </FeatureFlagProvider>
  );
};
