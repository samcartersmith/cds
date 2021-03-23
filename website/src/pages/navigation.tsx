import { useMemo } from 'react';

import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Button, IconButton as CDSIconButton, IconButtonProps } from '@cbhq/cds-web/buttons';
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
  SidebarItem,
  SidebarSection,
} from '@cbhq/cds-web/navigation';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { TextBody, TextTitle1 } from '@cbhq/cds-web/typography';
import Head from '@docusaurus/Head';
import { Link } from 'react-router-dom';

const defaultRoute = '/navigation';
const IconButton = ({
  name,
  to = '/',
}: Omit<IconButtonProps, 'renderContainer'> & { to?: string }) => {
  return <CDSIconButton name={name} renderContainer={props => <Link {...props} to={to} />} />;
};

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
            <IconButton name="backspaceLight" />
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
            <CDSIconButton onPress={toggleSidebarSections} name="gearHeavy" />
            <CDSIconButton onPress={toggleDisplayTitle} name="expand" />
            <CDSIconButton onPress={toggleTabs} name="listHeavy" />
            <CDSIconButton onPress={toggleDarkMode} name="apiHeavy" />
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
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="chartPieCircleHeavy"
          label="Overview"
          active
        />
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="apiHeavy"
          label="Principles"
          badge={3}
        />
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="arrowsHorizontalHeavy"
          label="Getting started"
        />
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="pay"
          label="Pay"
        />
        <SidebarItem
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
          <SidebarItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="bankHeavy"
            label="Overview"
          />
          <SidebarItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="calendar"
            label="Color"
          />
          <SidebarItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="documentHeavy"
            label="Typography"
          />
          <SidebarItem
            renderContainer={props => <Link {...props} to={defaultRoute} />}
            icon="emailHeavy"
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
