import { UserSwitcher } from '@cbhq/cds-web/__stories__/UserSwitcher.stories';
import { VStack } from '@cbhq/cds-web/layout';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system/FeatureFlagProvider';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';

export const UserSwitcherExample = () => {
  return (
    <FeatureFlagProvider frontierColor frontierButton>
      <PortalProvider>
        <VStack spacingVertical={2}>
          <TextBody as="p" spacingBottom={2}>
            User Switcher is a global component that lives in the Navigation Header that enables
            customers to switch between various accounts (emails) with active sessions, and sign in
            and out of all their Coinbase accounts.
          </TextBody>
          <VStack
            alignItems="center"
            justifyContent="center"
            spacingVertical={4}
            bordered
            borderRadius="standard"
          >
            <UserSwitcher title="Brian Armstrong" description="brian.armstrong@coinbase.com" />
          </VStack>
        </VStack>
      </PortalProvider>
    </FeatureFlagProvider>
  );
};
