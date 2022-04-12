/* eslint-disable import/no-extraneous-dependencies */

import React, { useCallback, useEffect,useMemo,  useState } from 'react';
import Head from 'next/head'
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { accounts } from '@cbhq/cds-common/internal/data/accounts';
import { assetColors, assetImages,assets } from '@cbhq/cds-common/internal/data/assets';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { product } from '@cbhq/cds-common/internal/data/product';
import { users } from '@cbhq/cds-common/internal/data/users';
import {
  sparklineInteractiveWithHeaderBuilder
} from "@cbhq/cds-common/internal/sparklineInteractiveBuilder";
import {sparklineInteractiveData} from "@cbhq/cds-common/internal/visualizations/SparklineInteractiveData";
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import {SetState} from "@cbhq/cds-web";
import { Button, IconButton } from '@cbhq/cds-web/buttons';
import {
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  FeedCard,
} from '@cbhq/cds-web/cards';
import {SelectOption, Switch} from '@cbhq/cds-web/controls';
import {Icon, LogoMark, NavigationIconProps} from '@cbhq/cds-web/icons';
import {Pictogram} from "@cbhq/cds-web/illustrations";
import { Divider, Group, HStack, VStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import {NavigationBar, NavigationTitle, Sidebar, SidebarItem} from '@cbhq/cds-web/navigation';
import {PopoverMenu, PopoverTrigger, SectionTitle} from "@cbhq/cds-web/overlays";
import { FeatureFlagProvider, Pressable,ThemeProvider } from '@cbhq/cds-web/system';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from '@cbhq/cds-web/tables';
import {
  TextHeadline,
  TextTitle3,
} from '@cbhq/cds-web/typography';
import {
  ProgressBar,
  ProgressBarWithFloatLabel,
  ProgressCircle,
  SparklineInteractive,
  SparklineInteractiveHeader,
} from '@cbhq/cds-web/visualizations';

const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: false,
});

// Add any mock data for examples here
const mocks = {
  accounts,
  assets,
  assetColors,
  assetImages,
  prices,
  users,
  product,
};

const { name, avatar } = mocks.users[1];

const sidebarItems = mocks.product.navigationItems;
function createSidebarItem(activeIndex: number, setActiveIndex: SetState<number>) {
  return ({title, icon}: {title: string, icon: string}, index: number) => {
    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
    const handlePress = () => setActiveIndex(index);

    return (
      <SidebarItem
        key={`example--sidebar-item--${title}`}
        active={index === activeIndex}
        // onPress={setActiveIndex} // todo: callback includes index by default
        onPress={handlePress}
        icon={icon as NavigationIconProps['name']}
        title={title}
      />
    );
  };
}

const options = [
  {
    name: 'Coinbase',
    value: 'coinbase',
    description: 'Buy, sell, use crypto',
    mediaName: 'coinbaseOneLogoPictogram',
  },
  {
    name: 'Wallet',
    value: 'wallet',
    description: 'The best self-hosted crypto wallet',
    mediaName: 'wallet',
  },
] as const;

function createMenuOption() {
  return (item: typeof options[number]) => (
    <SelectOption
      key={item.name}
      value={item.value}
      title={item.name}
      description={item.description}
      media={<Pictogram dimension="48x48" name={item.mediaName} />}
    />
  );
}


function Popover({ trigger }: { trigger: () => React.ReactElement }) {
  // const [value, onChange] = useState<OptionValue>();
  const [value, onChange] = useState<string>('');
  const [visible, { toggleOn, toggleOff }] = useToggler(false);
  return (
    <PopoverMenu
      width={350}
      openMenu={toggleOn}
      closeMenu={toggleOff}
      visible={visible}
      onChange={onChange}
      value={value}
    >
      <PopoverTrigger>
        {trigger()}
      </PopoverTrigger>
      <SectionTitle text="For Individuals" />
      {options.map(createMenuOption())}
    </PopoverMenu>
  )
}

/** Triggers */
function MoreTrigger() {
  return <IconButton transparent name="more" variant="secondary" />;
}

function AvatarTrigger() {
  return (
    <Pressable backgroundColor="transparent">
      <HStack gap={1} alignItems="center">
        <Avatar alt="Kat" src={avatar} />
        <TextHeadline as="h2">{name}</TextHeadline>
      </HStack>
    </Pressable>
  );
}

function NotificationsTrigger() {
  return <IconButton name="bell" />;
}

function FeedCardWithPopover() {
  const feedCardProps = {
    avatarUrl: assets.eth.imageUrl,
    headerMetaData: 'Dec 18',
    headerDescription: 'Earn crypto',
    headerActionNode: <Popover trigger={MoreTrigger} />,
    bodyTitle: 'Learn AMP. Earn $3 in AMP.',
    bodyDescription:
      'Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.',
    bodyMediaUrl:
      'https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png',
    bodyOrientation: 'vertical',
    footerActions: (
      <Button compact variant="secondary">
        Earn AMP
      </Button>
    ),
  } as const;

  return <FeedCard {...feedCardProps} />;
}

function DataCardWithCircle() {
  return (
    <Card>
      <CardBody
        title="Crypto earned"
        description="Earn $40 more by learning about new assets"
        orientation="horizontal"
        media={<ProgressCircle progress={0.5} size={100} />}
      />
      <CardFooter>
        <Button compact variant="secondary">
          See more
        </Button>
      </CardFooter>
    </Card>
  );
}

function DataCardWithBar() {
  const renderLabelNum = useCallback((num: number, disabled?: boolean) => {
    return (
      <TextTitle3 as="span" disabled={disabled}>
        ${num.toLocaleString()}
      </TextTitle3>
    );
  }, []);

  const label = useMemo(() => {
    return { value: 12500, render: renderLabelNum } as const;
  }, [renderLabelNum]);

  return (
    <Card>
      <CardBody title="Crypto earned" description="Earn $40 more by learning about new assets">
        <VStack spacingBottom={gutter}>
          <ProgressBarWithFloatLabel progress={0.6} label={label} labelPlacement="above">
            <ProgressBar progress={0.6} />
          </ProgressBarWithFloatLabel>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button compact variant="secondary">
          See more
        </Button>
      </CardFooter>
    </Card>
  );
}

function VerticalDivider() {
  return <Divider direction="vertical" />;
}

function ChartWithBalance() {

  const [data, setData] = useState<null | typeof sparklineInteractiveData>(null);

  useEffect(() => {

    // hack to fix opaque selected data
    // TODO fix this
    setTimeout(() => {
      setData(sparklineInteractiveData);
    }, 0);

  }, []);

  return (
    <VStack width="100%" spacingTop={2}>
      {!data && <div style={{height: "500px"}} />}
      {data && <SparklineInteractiveWithHeaderBuild data={data} strokeColor={assets.btc.color} />}
    </VStack>
  );
}

function AssetTable() {
  const totalResults = mocks.accounts.length;
  const PAGE_SIZE = 7;
  const [page, setPage] = useState(1);
  const [isFixed, { toggle }] = useToggler(false);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, totalResults);
  const accountsCopy = mocks.accounts.slice(startIdx, endIdx);

  return (
    <Table bordered variant="ruled" tableLayout={isFixed ? 'fixed' : 'auto'}>
      <TableHeader>
        <TableRow>
          <TableCell title="Currency" width="20%" />
          <TableCell title="Balance" width="40%" />
          <TableCell title="Status" alignItems="flex-end" width="60%" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {accountsCopy.map((account) => {
          return (
            <TableRow key={`row--${account.name}`}>
              <TableCell
                start={<Icon name="currencies" size="m" />}
                title={account.name}
                subtitle={account.currency.name}
              />
              <TableCell title={`$${account.balance.amount}`} subtitle={account.balance.currency} />
              <TableCell direction="horizontal" justifyContent="flex-end">
                <Icon
                  size="m"
                  name={account.primary ? 'circleCheckmark' : 'circleCross'}
                  color={account.primary ? 'positive' : 'negative'}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow fullWidth>
          <TableCell direction="horizontal">
            {[1, 2, 3, 4, 5].map((pg) => (
              <Button
                key={pg}
                compact
                variant={page === pg ? 'primary' : 'secondary'}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onPress={() => setPage(pg)}
              >
                {pg}
              </Button>
            ))}
          </TableCell>
          <TableCell>
            <Switch onChange={toggle} checked={isFixed}>
              Fixed Layout
            </Switch>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function AppContent() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <HStack>
      <Sidebar logo={<LogoMark />} autoCollapse>
        {sidebarItems.map(createSidebarItem(activeIndex, setActiveIndex))}
      </Sidebar>
      <VStack>
        <NavigationBar
          end={
            <HStack gap={1} alignItems="center">
              <Popover trigger={NotificationsTrigger} />
              <Popover trigger={AvatarTrigger} />
            </HStack>
          }
        >
          <NavigationTitle>{sidebarItems[activeIndex].title}</NavigationTitle>
        </NavigationBar>
        <Group
          position="relative"
          divider={VerticalDivider}
          direction="horizontal"
          justifyContent="space-between"
        >
          <Group divider={Divider} gap={0} flexGrow={3} flexShrink={1} flexBasis="0%">
            <ChartWithBalance />
            <AssetTable />
          </Group>
          <VStack
            spacing={gutter}
            spacingTop={0}
            flexGrow={1}
            flexShrink={0}
            flexBasis="0%"
            minHeight="100vh"
          >
            <CardGroup>
              <FeedCardWithPopover />
              <DataCardWithCircle />
              <DataCardWithBar />
            </CardGroup>
          </VStack>
        </Group>
      </VStack>
    </HStack>
  );
}

function App() {
  return (
    <>
      <Head>
        <link rel="preload" as="style" href="reset.css" />
        <link rel="stylesheet" href="reset.css" />
      </Head>
      <FeatureFlagProvider frontier>
        <ThemeProvider display="contents">
          <AppContent />
        </ThemeProvider>
      </FeatureFlagProvider>
    </>
  );
}

export default App;