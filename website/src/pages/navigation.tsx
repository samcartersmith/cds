import { useMemo } from 'react';

import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Button, IconButton } from '@cbhq/cds-web/buttons';
import { LogoMark } from '@cbhq/cds-web/icons/LogoMark';
import { VStack } from '@cbhq/cds-web/layout';
import {
  TabItem,
  Tabs,
  Navigation,
  NavigationBar,
  NavigationBarActions,
  NavigationBarCtas,
  NavigationBarControls,
  NavigationBarTitles,
  NavigationDisplayTitle,
  Sidebar,
  NavigationListItem,
  SidebarSection,
} from '@cbhq/cds-web/navigation';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { TextBody, TextTitle1 } from '@cbhq/cds-web/typography';
import Head from '@docusaurus/Head';
import { Link } from 'react-router-dom';

const defaultRoute = '/navigation';

export const NavigationExample: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showTabs, { toggle: toggleTabs }] = useToggler(false);
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
            <IconButton as={props => <Link {...props} to="/" />} name="arrowLeft" />
          </NavigationBarControls>
        }
        titles={<NavigationBarTitles title={title} subtitle={subtitle} />}
        ctas={
          <NavigationBarCtas>
            <Button compact variant="primary">
              {'Buy & Sell'}
            </Button>
            <Button compact variant="secondary">
              {'Send & Recieve'}
            </Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <IconButton onPress={toggleSidebarSections} name="gear" />
            <IconButton onPress={toggleDisplayTitle} name="expand" />
            <IconButton onPress={toggleTabs} name="list" />
            <IconButton onPress={toggleDarkMode} name="api" />
          </NavigationBarActions>
        }
      />
    );
  }, [toggleDarkMode, toggleDisplayTitle, toggleSidebarSections, toggleTabs]);

  const sidebar = useMemo(() => {
    const logo = (
      <Link to={defaultRoute}>
        <LogoMark />
      </Link>
    );

    const sidebarList = (
      <>
        <NavigationListItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="chartPieCircle"
          label="Overview"
          active
        />
        <NavigationListItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="api"
          label="Principles"
          badge={3}
        />
        <NavigationListItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="arrowsHorizontal"
          label="Getting started"
        />
        <NavigationListItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="pay"
          label="Pay"
        />
        <NavigationListItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="gauge"
          label="Support"
          badge={12}
        />
      </>
    );

    const sidebarSections = (
      <>
        <SidebarSection title="Introduction">{sidebarList}</SidebarSection>
        <SidebarSection title="Foundation">
          <NavigationListItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="bank"
            label="Overview"
          />
          <NavigationListItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="calendar"
            label="Color"
          />
          <NavigationListItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="document"
            label="Typography"
          />
          <NavigationListItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="email"
            label="Illustration"
          />
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
      <Head>
        <link rel="preload" as="style" href="reset.css" />
        <link rel="stylesheet" href="reset.css" />
      </Head>
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

export default NavigationExample;
