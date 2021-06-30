import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Button, IconButton } from '../../buttons/index';
import { LogoMark } from '../../icons/LogoMark';
import { VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextBody, TextTitle1 } from '../../typography';
import {
  TabItem,
  Tabs,
  Navigation,
  NavigationBar,
  NavigationBarActions,
  NavigationBarCtas,
  NavigationBarControls,
  NavigationIconButton,
  NavigationBarTitles,
  NavigationDisplayTitle,
  Sidebar,
  NavigationListItem,
  NavigationListItemLinkProps,
  SidebarSection,
} from '../index';

const defaultRoute = '/navigation';

export const StoryMap = {
  NoTabsNoTitle: 'No Tabs no displayTitle',
  TabsAndTitle: 'With Tabs and displayTitle',
};

// Avoids react-router errors. Just mock the link as its super lightweight.
// If we need a more robust mock we can look into something like storybook-react-router.
const MockLink = forwardRef<HTMLAnchorElement, NavigationListItemLinkProps>(function MockLink(
  { children, to, ...props },
  ref
) {
  return (
    <a {...props} href={String(to)} ref={ref}>
      {children}
    </a>
  );
});

export const DefaultTabs = () => (
  <Tabs>
    <TabItem label="Overview" />
    <TabItem label="Wallet" />
    <TabItem label="Vault" />
  </Tabs>
);

export const NoTabsNoTitle: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showSidebarSections, { toggle: toggleSidebarSections }] = useToggler(false);

  const navbar = useMemo(() => {
    return (
      <NavigationBar
        controls={
          <NavigationBarControls>
            <IconButton name="arrowLeft" />
          </NavigationBarControls>
        }
        ctas={
          <NavigationBarCtas>
            <Button compact variant="primary">
              Buy & Sell
            </Button>
            <Button compact variant="secondary">
              Send & Recieve
            </Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <NavigationIconButton onPress={toggleSidebarSections} name="gear" label="Settings" />
            <NavigationIconButton onPress={toggleDarkMode} name="api" label="Last item" />
          </NavigationBarActions>
        }
      />
    );
  }, [toggleDarkMode, toggleSidebarSections]);

  const sidebar = useMemo(() => {
    const logo = (
      <MockLink to={defaultRoute}>
        <LogoMark />
      </MockLink>
    );

    const sidebarList = (
      <>
        <NavigationListItem as={MockLink} icon="pieChart" label="Overview" active />
        <NavigationListItem as={MockLink} icon="gab" label="Principles" badge={3} />
        <NavigationListItem as={MockLink} icon="home" label="Getting started" />
        <NavigationListItem as={MockLink} icon="pay" label="Pay" />
        <NavigationListItem as={MockLink} icon="settings" label="Support" badge={12} />
      </>
    );

    const sidebarSections = (
      <>
        <SidebarSection title="Introduction">{sidebarList}</SidebarSection>
        <SidebarSection title="Foundation">
          <NavigationListItem as={MockLink} icon="cash" label="Overview" />
          <NavigationListItem as={MockLink} icon="newsfeed" label="Color" />
          <NavigationListItem as={MockLink} icon="invoice" label="Typography" />
          <NavigationListItem as={MockLink} icon="invoice" label="Illustration" />
        </SidebarSection>
      </>
    );

    return <Sidebar logo={logo}>{showSidebarSections ? sidebarSections : sidebarList}</Sidebar>;
  }, [showSidebarSections]);

  const loremBlock = useMemo(() => {
    return (
      <VStack>
        <TextTitle1 as="h1" spacingBottom={2}>
          Lorem ipsum
        </TextTitle1>
        <TextBody as="p" spacingBottom={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.{' '}
        </TextBody>
      </VStack>
    );
  }, []);

  return (
    <>
      <ThemeProvider spectrum={showDarkMode ? 'dark' : 'light'}>
        <Navigation
          key={`${showDarkMode} ${showSidebarSections}`}
          sidebar={sidebar}
          navbar={navbar}
        >
          {loremBlock}
          {loremBlock}
          {loremBlock}
        </Navigation>
      </ThemeProvider>
    </>
  );
};

export const TabsNoTitle: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showTabs, { toggle: toggleTabs }] = useToggler(true);
  const [showSidebarSections, { toggle: toggleSidebarSections }] = useToggler(false);

  const tabs = useMemo(
    () => (
      <Tabs>
        <TabItem label="Overview" />
        <TabItem label="Wallet" />
        <TabItem label="Vault" />
      </Tabs>
    ),
    []
  );

  const navbar = useMemo(() => {
    return (
      <NavigationBar
        controls={
          <NavigationBarControls>
            <IconButton name="arrowLeft" />
          </NavigationBarControls>
        }
        ctas={
          <NavigationBarCtas>
            <Button compact variant="primary">
              Buy & Sell
            </Button>
            <Button compact variant="secondary">
              Send & Recieve
            </Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <NavigationIconButton onPress={toggleSidebarSections} name="gear" label="Settings" />
            <NavigationIconButton onPress={toggleTabs} name="list" label="Another item" />
            <NavigationIconButton onPress={toggleDarkMode} name="api" label="Last item" />
          </NavigationBarActions>
        }
      />
    );
  }, [toggleDarkMode, toggleSidebarSections, toggleTabs]);

  const sidebar = useMemo(() => {
    const logo = (
      <MockLink to={defaultRoute}>
        <LogoMark />
      </MockLink>
    );

    const sidebarList = (
      <>
        <NavigationListItem as={MockLink} icon="pieChart" label="Overview" active />
        <NavigationListItem as={MockLink} icon="gab" label="Principles" badge={3} />
        <NavigationListItem as={MockLink} icon="home" label="Getting started" />
        <NavigationListItem as={MockLink} icon="pay" label="Pay" />
        <NavigationListItem as={MockLink} icon="settings" label="Support" badge={12} />
      </>
    );

    const sidebarSections = (
      <>
        <SidebarSection title="Introduction">{sidebarList}</SidebarSection>
        <SidebarSection title="Foundation">
          <NavigationListItem as={MockLink} icon="cash" label="Overview" />
          <NavigationListItem as={MockLink} icon="newsfeed" label="Color" />
          <NavigationListItem as={MockLink} icon="invoice" label="Typography" />
          <NavigationListItem as={MockLink} icon="bell" label="Illustration" />
        </SidebarSection>
      </>
    );

    return <Sidebar logo={logo}>{showSidebarSections ? sidebarSections : sidebarList}</Sidebar>;
  }, [showSidebarSections]);

  const loremBlock = useMemo(() => {
    return (
      <VStack>
        <TextTitle1 as="h1" spacingBottom={2}>
          Lorem ipsum
        </TextTitle1>
        <TextBody as="p" spacingBottom={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.{' '}
        </TextBody>
      </VStack>
    );
  }, []);

  return (
    <>
      <ThemeProvider spectrum={showDarkMode ? 'dark' : 'light'}>
        <Navigation
          key={`${showDarkMode} ${showTabs} ${showSidebarSections}`}
          sidebar={sidebar}
          navbar={navbar}
          tabs={showTabs && tabs}
        >
          {loremBlock}
          {loremBlock}
          {loremBlock}
        </Navigation>
      </ThemeProvider>
    </>
  );
};

export const TitleNoTabs: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showDisplayTitle, setShowDisplayTitle] = useState(true);
  const [showSidebarSections, { toggle: toggleSidebarSections }] = useToggler(false);
  const title = 'Bitcoin';
  const subtitle = 'BTC';
  const displayTitle = <NavigationDisplayTitle title={title} subtitle={subtitle} />;
  const handlePress = useCallback(() => setShowDisplayTitle(prev => !prev), []);

  const navbar = useMemo(() => {
    return (
      <NavigationBar
        controls={
          <NavigationBarControls>
            <IconButton name="arrowLeft" />
          </NavigationBarControls>
        }
        titles={<NavigationBarTitles title={title} subtitle={subtitle} />}
        ctas={
          <NavigationBarCtas>
            <Button compact variant="primary">
              Buy & Sell
            </Button>
            <Button compact variant="secondary">
              Send & Recieve
            </Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <NavigationIconButton onPress={toggleSidebarSections} name="gear" label="Settings" />
            <NavigationIconButton onPress={handlePress} name="expand" label="Notifications" />
            <NavigationIconButton onPress={toggleDarkMode} name="api" label="Last item" />
          </NavigationBarActions>
        }
      />
    );
  }, [toggleDarkMode, toggleSidebarSections, handlePress]);

  const sidebar = useMemo(() => {
    const logo = (
      <MockLink to={defaultRoute}>
        <LogoMark />
      </MockLink>
    );

    const sidebarList = (
      <>
        <NavigationListItem as={MockLink} icon="pieChart" label="Overview" active />
        <NavigationListItem as={MockLink} icon="gab" label="Principles" badge={3} />
        <NavigationListItem as={MockLink} icon="home" label="Getting started" />
        <NavigationListItem as={MockLink} icon="pay" label="Pay" />
        <NavigationListItem as={MockLink} icon="settings" label="Support" badge={12} />
      </>
    );

    const sidebarSections = (
      <>
        <SidebarSection title="Introduction">{sidebarList}</SidebarSection>
        <SidebarSection title="Foundation">
          <NavigationListItem as={MockLink} icon="cash" label="Overview" />
          <NavigationListItem as={MockLink} icon="newsfeed" label="Color" />
          <NavigationListItem as={MockLink} icon="invoice" label="Typography" />
          <NavigationListItem as={MockLink} icon="invoice" label="Illustration" />
        </SidebarSection>
      </>
    );

    return <Sidebar logo={logo}>{showSidebarSections ? sidebarSections : sidebarList}</Sidebar>;
  }, [showSidebarSections]);

  const loremBlock = useMemo(() => {
    return (
      <VStack>
        <TextTitle1 as="h1" spacingBottom={2}>
          Lorem ipsum
        </TextTitle1>
        <TextBody as="p" spacingBottom={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.{' '}
        </TextBody>
      </VStack>
    );
  }, []);

  return (
    <>
      <ThemeProvider spectrum={showDarkMode ? 'dark' : 'light'}>
        <Navigation
          key={`${showDarkMode} ${showDisplayTitle} ${showSidebarSections}`}
          sidebar={sidebar}
          navbar={navbar}
          displayTitle={showDisplayTitle && displayTitle}
        >
          {loremBlock}
          {loremBlock}
          {loremBlock}
        </Navigation>
      </ThemeProvider>
    </>
  );
};

export const TabsAndDisplayTitle: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showTabs, { toggle: toggleTabs }] = useToggler(true);
  const [showDisplayTitle, { toggle: toggleDisplayTitle }] = useToggler(false);
  const [showSidebarSections, { toggle: toggleSidebarSections }] = useToggler(false);
  const title = 'Bitcoin';
  const subtitle = 'BTC';
  const displayTitle = <NavigationDisplayTitle title={title} subtitle={subtitle} />;

  const tabs = useMemo(
    () => (
      <Tabs>
        <TabItem label="Overview" />
        <TabItem label="Wallet" />
        <TabItem label="Vault" />
      </Tabs>
    ),
    []
  );

  const navbar = useMemo(() => {
    return (
      <NavigationBar
        controls={
          <NavigationBarControls>
            <IconButton name="arrowLeft" />
          </NavigationBarControls>
        }
        titles={<NavigationBarTitles title={title} subtitle={subtitle} />}
        ctas={
          <NavigationBarCtas>
            <Button compact variant="primary">
              Buy & Sell
            </Button>
            <Button compact variant="secondary">
              Send & Recieve
            </Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <NavigationIconButton onPress={toggleSidebarSections} name="gear" label="Settings" />
            <NavigationIconButton
              onPress={toggleDisplayTitle}
              name="expand"
              label="Notifications"
            />
            <NavigationIconButton onPress={toggleTabs} name="list" label="Another item" />
            <NavigationIconButton onPress={toggleDarkMode} name="api" label="Last item" />
          </NavigationBarActions>
        }
      />
    );
  }, [toggleDarkMode, toggleDisplayTitle, toggleSidebarSections, toggleTabs]);

  const sidebar = useMemo(() => {
    const logo = (
      <MockLink to={defaultRoute}>
        <LogoMark />
      </MockLink>
    );

    const sidebarList = (
      <>
        <NavigationListItem as={MockLink} icon="pieChart" label="Overview" active />
        <NavigationListItem as={MockLink} icon="gab" label="Principles" badge={3} />
        <NavigationListItem as={MockLink} icon="home" label="Getting started" />
        <NavigationListItem as={MockLink} icon="pay" label="Pay" />
        <NavigationListItem as={MockLink} icon="settings" label="Support" badge={12} />
      </>
    );

    const sidebarSections = (
      <>
        <SidebarSection title="Introduction">{sidebarList}</SidebarSection>
        <SidebarSection title="Foundation">
          <NavigationListItem as={MockLink} icon="cash" label="Overview" />
          <NavigationListItem as={MockLink} icon="newsfeed" label="Color" />
          <NavigationListItem as={MockLink} icon="invoice" label="Typography" />
          <NavigationListItem as={MockLink} icon="invoice" label="Illustration" />
        </SidebarSection>
      </>
    );

    return <Sidebar logo={logo}>{showSidebarSections ? sidebarSections : sidebarList}</Sidebar>;
  }, [showSidebarSections]);

  const loremBlock = useMemo(() => {
    return (
      <VStack>
        <TextTitle1 as="h1" spacingBottom={2}>
          Lorem ipsum
        </TextTitle1>
        <TextBody as="p" spacingBottom={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.{' '}
        </TextBody>
      </VStack>
    );
  }, []);

  return (
    <>
      <ThemeProvider spectrum={showDarkMode ? 'dark' : 'light'}>
        <Navigation
          key={`${showDarkMode} ${showTabs} ${showDisplayTitle} ${showSidebarSections}`}
          sidebar={sidebar}
          navbar={navbar}
          displayTitle={showDisplayTitle && displayTitle}
          tabs={showTabs && tabs}
        >
          {loremBlock}
          {loremBlock}
          {loremBlock}
        </Navigation>
      </ThemeProvider>
    </>
  );
};

export const SidebarCollapsed: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showTabs, { toggle: toggleTabs }] = useToggler(false);
  const [showDisplayTitle, { toggle: toggleDisplayTitle }] = useToggler(false);

  const title = 'Bitcoin';
  const subtitle = 'BTC';
  const displayTitle = <NavigationDisplayTitle title={title} subtitle={subtitle} />;

  const tabs = useMemo(
    () => (
      <Tabs>
        <TabItem label="Overview" />
        <TabItem label="Wallet" />
        <TabItem label="Vault" />
      </Tabs>
    ),
    []
  );

  const navbar = useMemo(() => {
    return (
      <NavigationBar
        controls={
          <NavigationBarControls>
            <IconButton name="arrowLeft" />
          </NavigationBarControls>
        }
        titles={<NavigationBarTitles title={title} subtitle={subtitle} />}
        ctas={
          <NavigationBarCtas>
            <Button compact variant="primary">
              Buy & Sell
            </Button>
            <Button compact variant="secondary">
              Send & Recieve
            </Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <NavigationIconButton
              onPress={toggleDisplayTitle}
              name="expand"
              label="Notifications"
            />
            <NavigationIconButton onPress={toggleTabs} name="list" label="Another item" />
            <NavigationIconButton onPress={toggleDarkMode} name="api" label="Last item" />
          </NavigationBarActions>
        }
      />
    );
  }, [toggleDarkMode, toggleDisplayTitle, toggleTabs]);

  const loremBlock = useMemo(() => {
    return (
      <VStack>
        <TextTitle1 as="h1" spacingBottom={2}>
          Lorem ipsum
        </TextTitle1>
        <TextBody as="p" spacingBottom={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.{' '}
        </TextBody>
      </VStack>
    );
  }, []);

  return (
    <>
      <ThemeProvider spectrum={showDarkMode ? 'dark' : 'light'}>
        <Navigation
          key={`${showDarkMode} ${showTabs} ${showDisplayTitle}`}
          navbar={navbar}
          displayTitle={showDisplayTitle && displayTitle}
          tabs={showTabs && tabs}
        >
          {loremBlock}
          {loremBlock}
          {loremBlock}
        </Navigation>
      </ThemeProvider>
    </>
  );
};

export const SidebarWithSections: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showTabs, { toggle: toggleTabs }] = useToggler(false);
  const [showDisplayTitle, { toggle: toggleDisplayTitle }] = useToggler(false);
  const [showSidebarSections, { toggle: toggleSidebarSections }] = useToggler(true);
  const title = 'Bitcoin';
  const subtitle = 'BTC';
  const displayTitle = <NavigationDisplayTitle title={title} subtitle={subtitle} />;

  const tabs = useMemo(
    () => (
      <Tabs>
        <TabItem label="Overview" />
        <TabItem label="Wallet" />
        <TabItem label="Vault" />
      </Tabs>
    ),
    []
  );

  const navbar = useMemo(() => {
    return (
      <NavigationBar
        controls={
          <NavigationBarControls>
            <IconButton name="arrowLeft" />
          </NavigationBarControls>
        }
        titles={<NavigationBarTitles title={title} subtitle={subtitle} />}
        ctas={
          <NavigationBarCtas>
            <Button compact variant="primary">
              Buy & Sell
            </Button>
            <Button compact variant="secondary">
              Send & Recieve
            </Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <NavigationIconButton onPress={toggleSidebarSections} name="gear" label="Settings" />
            <NavigationIconButton
              onPress={toggleDisplayTitle}
              name="expand"
              label="Notifications"
            />
            <NavigationIconButton onPress={toggleTabs} name="list" label="Another item" />
            <NavigationIconButton onPress={toggleDarkMode} name="api" label="Last item" />
          </NavigationBarActions>
        }
      />
    );
  }, [toggleDarkMode, toggleDisplayTitle, toggleSidebarSections, toggleTabs]);

  const sidebar = useMemo(() => {
    const logo = (
      <MockLink to={defaultRoute}>
        <LogoMark />
      </MockLink>
    );

    const sidebarList = (
      <>
        <NavigationListItem as={MockLink} icon="pieChart" label="Overview" active />
        <NavigationListItem as={MockLink} icon="gab" label="Principles" badge={3} />
        <NavigationListItem as={MockLink} icon="home" label="Getting started" />
        <NavigationListItem as={MockLink} icon="pay" label="Pay" />
        <NavigationListItem as={MockLink} icon="settings" label="Support" badge={12} />
      </>
    );

    const sidebarSections = (
      <>
        <SidebarSection title="Introduction">{sidebarList}</SidebarSection>
        <SidebarSection title="Foundation">
          <NavigationListItem as={MockLink} icon="cash" label="Overview" />
          <NavigationListItem as={MockLink} icon="newsfeed" label="Color" />
          <NavigationListItem as={MockLink} icon="invoice" label="Typography" />
          <NavigationListItem as={MockLink} icon="invoice" label="Illustration" />
        </SidebarSection>
      </>
    );

    return <Sidebar logo={logo}>{showSidebarSections ? sidebarSections : sidebarList}</Sidebar>;
  }, [showSidebarSections]);

  const loremBlock = useMemo(() => {
    return (
      <VStack>
        <TextTitle1 as="h1" spacingBottom={2}>
          Lorem ipsum
        </TextTitle1>
        <TextBody as="p" spacingBottom={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.{' '}
        </TextBody>
      </VStack>
    );
  }, []);

  return (
    <>
      <ThemeProvider spectrum={showDarkMode ? 'dark' : 'light'}>
        <Navigation
          key={`${showDarkMode} ${showTabs} ${showDisplayTitle} ${showSidebarSections}`}
          sidebar={sidebar}
          navbar={navbar}
          displayTitle={showDisplayTitle && displayTitle}
          tabs={showTabs && tabs}
        >
          {loremBlock}
          {loremBlock}
          {loremBlock}
        </Navigation>
      </ThemeProvider>
    </>
  );
};
