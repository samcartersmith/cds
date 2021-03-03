/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';

import {
  Logo,
  ThemeProvider,
  Navigation,
  Navbar,
  Sidebar,
  SidebarItem,
  Button,
  IconButton as CDSIconButton,
  IconButtonProps,
} from '@cbhq/cds-web';
import Head from '@docusaurus/Head';
import { Link } from 'react-router-dom';

import { navigationStyles } from './navigationStyles';

const defaultRoute = '/navigation';

const IconButton = ({
  name,
  to = defaultRoute,
}: Omit<IconButtonProps, 'renderContainer'> & { to?: string }) => {
  return <CDSIconButton name={name} renderContainer={props => <Link {...props} to={to} />} />;
};

const NavigationPrototype = () => {
  const navbar = useMemo(() => {
    return (
      <Navbar
        title="Bitcoin"
        subtitle="BTC"
        leading={[<IconButton name="backspaceLight" />]}
        ctas={[
          <Button variant="primary">{'Buy & Sell'}</Button>,
          <Button variant="secondary">{'Send & Recieve'}</Button>,
        ]}
        trailing={[<IconButton name="bellHeavy" />]}
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
  }, []);
  return (
    <>
      <Head>
        <link rel="stylesheet" href="reset.css" media="screen" />
      </Head>
      <div className={navigationStyles}>
        <ThemeProvider>
          <Navigation navbar={navbar} sidebar={sidebar}></Navigation>
        </ThemeProvider>
      </div>
    </>
  );
};

export default NavigationPrototype;
