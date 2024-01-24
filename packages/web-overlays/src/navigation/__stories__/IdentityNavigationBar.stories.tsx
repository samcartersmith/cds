import { memo, useCallback, useState } from 'react';
import { Story } from '@storybook/react';
import { Button, IconButton, NavigationIconButton } from '@cbhq/cds-web/buttons';
import { SearchInput } from '@cbhq/cds-web/controls';
import { HStack, Spacer, VStack } from '@cbhq/cds-web/layout';
import { NavigationBar, NavigationBarProps } from '@cbhq/cds-web/navigation';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { TabNavigation } from '@cbhq/cds-web/tabs';
import { TextTitle1 } from '@cbhq/cds-web/typography';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { AppSwitcher } from '../../__stories__/AppSwitcher.stories';
import { HelpMenu } from '../../__stories__/HelpMenu.stories';
import { ProfileMenu } from '../../__stories__/ProfileMenu.stories';

import { tabs } from './NavigationStorySetup';

export default {
  component: NavigationBar,
  title: 'Deprecated/IdentityNavigationBar',
};

const IdentityNavigationBar = memo(({ start, end, bottom, children }: NavigationBarProps) => {
  return (
    <NavigationBar
      accessibilityLabel="main navigation"
      bottom={bottom}
      end={
        <HStack alignItems="center" gap={1}>
          {end}
          <AppSwitcher />
          <ProfileMenu isOpen={false} title="Brian" />
        </HStack>
      }
      start={start}
    >
      {children}
    </NavigationBar>
  );
});

const IdentityNavigationBarConsumer = () => {
  const [tab, setTab] = useState(tabs[0].id);
  const [search, setSearch] = useState('');
  const handleBackIconClick = useCallback(() => {
    setTab(tabs[0].id);
  }, [setTab]);
  return (
    <IdentityNavigationBar
      bottom={<TabNavigation onChange={setTab} tabs={tabs} value={tab} />}
      end={
        <HStack alignItems="center" gap={2}>
          <HStack alignItems="center" gap={1}>
            <Button compact>Primary</Button>
            <Button compact variant="secondary">
              Secondary
            </Button>
          </HStack>
          <HStack alignItems="center" gap={1}>
            <HelpMenu />
            <NavigationIconButton accessibilityLabel="Language" active={false} name="globe" />
            <NavigationIconButton accessibilityLabel="Notifications" active={false} name="bell" />
          </HStack>
        </HStack>
      }
      start={
        tab !== tabs[0].id && (
          <IconButton accessibilityLabel="Back" name="backArrow" onPress={handleBackIconClick} />
        )
      }
    >
      <HStack alignItems="center" flexGrow={1} gap={1}>
        <VStack width="100%">
          <SearchInput
            compact
            accessibilityLabel="Search"
            onChangeText={setSearch}
            placeholder="Search"
            value={search}
          />
        </VStack>
      </HStack>
    </IdentityNavigationBar>
  );
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const IdentityNavigationBarExampleDefault: Story = () => {
  return (
    <PortalProvider>
      <FeatureFlagProvider frontierButton frontierColor>
        <ThemeProvider>
          <TextTitle1 as="h1">NavigationBar example for Identity Team</TextTitle1>
          <Spacer />
          <IdentityNavigationBarConsumer />
        </ThemeProvider>
      </FeatureFlagProvider>
    </PortalProvider>
  );
};

IdentityNavigationBarExampleDefault.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      /**
       * The TabNavigation docs explain the proper way to setup the tabpanel.
       * Disabled because CDS TabNavigation doesn't have associated panels.
       * @link https://cds.cbhq.net/components/tab-navigation#accessibility
       * */
      rules: [{ id: 'aria-valid-attr-value', enabled: false }],
    },
  },
};
