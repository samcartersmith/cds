/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';

import { Button, IconButton as CDSIconButton, IconButtonProps } from '@cbhq/cds-web/buttons';
import {
  Logo,
  Navigation,
  NavigationBar,
  NavigationBarActions,
  NavigationBarCtas,
  NavigationBarControls,
  NavigationBarTitles,
  NavigationDisplayTitle,
  NavigationProps,
  Sidebar,
  SidebarItem,
} from '@cbhq/cds-web/navigation';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import Head from '@docusaurus/Head';
import { Link } from 'react-router-dom';

type NavigationExampleProps = {
  defaultRoute?: string;
  tabs?: NavigationProps['tabs'];
};

const IconButton = ({
  name,
  to = '/',
}: Omit<IconButtonProps, 'renderContainer'> & { to?: string }) => {
  return <CDSIconButton name={name} renderContainer={props => <Link {...props} to={to} />} />;
};

export const NavigationExample: React.FC<NavigationExampleProps> = ({
  children,
  defaultRoute = '/',
  tabs,
}) => {
  const title = 'Bitcoin';
  const subtitle = 'BTC';
  const displayTitle = <NavigationDisplayTitle title={title} subtitle={subtitle} />;

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
            <Button variant="primary">{'Buy & Sell'}</Button>
            <Button variant="secondary">{'Send & Recieve'}</Button>
          </NavigationBarCtas>
        }
        actions={
          <NavigationBarActions>
            <IconButton name="bellHeavy" />
          </NavigationBarActions>
        }
      />
    );
  }, []);

  const sidebar = useMemo(() => {
    return (
      <Sidebar
        logo={
          <Link to={defaultRoute}>
            <Logo />
          </Link>
        }
      >
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="chartPieCircleHeavy"
          label="Portfolio"
        />
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="arrowsHorizontalHeavy"
          label="Trade"
          active
        />
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="pay"
          label="Pay"
        />
        <SidebarItem
          renderContainer={props => <Link {...props} to={defaultRoute} />}
          icon="gauge"
          label="For you"
        />
      </Sidebar>
    );
  }, [defaultRoute]);

  return (
    <>
      <Head>
        <link rel="preload" as="style" href="reset.css" />
        <link rel="stylesheet" href="reset.css" />
      </Head>
      <ThemeProvider>
        <Navigation sidebar={sidebar} navbar={navbar} displayTitle={displayTitle} tabs={tabs}>
          {children}
        </Navigation>
      </ThemeProvider>
    </>
  );
};
