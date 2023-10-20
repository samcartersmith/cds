import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { accounts } from '@cbhq/cds-common/internal/data/accounts';
import { assetColors, assetImages, assets } from '@cbhq/cds-common/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { product } from '@cbhq/cds-common/internal/data/product';
import { users } from '@cbhq/cds-common/internal/data/users';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { SetState } from '@cbhq/cds-web';
import { Accordion, AccordionItem } from '@cbhq/cds-web/accordion';
import { Button, IconButton } from '@cbhq/cds-web/buttons';
import { Card, CardBody, CardFooter, CardGroup, FeedCard } from '@cbhq/cds-web/cards';
import { ListCell } from '@cbhq/cds-web/cells';
import { Checkbox, Select, SelectOption, Switch } from '@cbhq/cds-web/controls';
import { Dropdown } from '@cbhq/cds-web/dropdown/Dropdown';
import { Icon, LogoMark, NavigationIconProps } from '@cbhq/cds-web/icons';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Box, Divider, Group, HStack, VStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { NavigationBar, NavigationTitle, Sidebar, SidebarItem } from '@cbhq/cds-web/navigation';
import {
  Alert,
  FullscreenAlert,
  FullscreenModal,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@cbhq/cds-web/overlays';
import { Tooltip } from '@cbhq/cds-web/overlays';
import { useAlert } from '@cbhq/cds-web/overlays/useAlert';
import { useModal } from '@cbhq/cds-web/overlays/useModal';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Pressable } from '@cbhq/cds-web/system';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from '@cbhq/cds-web/tables';
import {
  TextBody,
  TextCaption,
  TextHeadline,
  TextTitle1,
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
  // eslint-disable-next-line react/display-name
  return ({ title, icon }: { title: string; icon: string }, index: number) => {
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
    mediaName: 'coinbaseOneLogo',
  },
  {
    name: 'Wallet',
    value: 'wallet',
    description: 'The best self-hosted crypto wallet',
    mediaName: 'wallet',
  },
] as const;

function createMenuOption() {
  // eslint-disable-next-line react/display-name
  return (item: (typeof options)[number]) => (
    <SelectOption
      key={item.name}
      value={item.value}
      title={item.name}
      description={item.description}
      media={<Pictogram name={item.mediaName} />}
    />
  );
}

function Popover({ trigger }: { trigger: () => React.ReactElement }) {
  // const [value, onChange] = useState<OptionValue>();
  const [value, onChange] = useState<string>('');
  return (
    <Dropdown
      width={350}
      onChange={onChange}
      value={value}
      content={
        <>
          <Box spacing={2}>
            <TextCaption as="label">For Individuals</TextCaption>
          </Box>
          {options.map(createMenuOption())}
        </>
      }
    >
      {trigger()}
    </Dropdown>
  );
}

/** Triggers */
function MoreTrigger() {
  return (
    <IconButton accessibilityLabel="More actions" transparent name="more" variant="secondary" />
  );
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
  const alert = useAlert();

  const showAlert = useCallback(
    () =>
      alert.open(
        <Alert
          title="Alert title"
          body="Alert body type that can run over multiple lines, but should be kept short."
          pictogram="warning"
          visible
          // eslint-disable-next-line react/jsx-handler-names
          onRequestClose={alert.close}
          preferredActionLabel="Save"
          // eslint-disable-next-line react/jsx-handler-names
          onPreferredActionPress={alert.close}
        />,
      ),
    [alert],
  );

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
      <Button compact variant="secondary" onPress={showAlert}>
        Earn AMP
      </Button>
    ),
  } as const;

  return <FeedCard {...feedCardProps} />;
}

function DataCardWithCircle() {
  const toast = useToast();

  const showToast = useCallback(() => {
    toast.show('Copied to clipboard');
  }, [toast]);

  return (
    <Card>
      <CardBody
        title="Crypto earned"
        description="Earn $40 more by learning about new assets"
        orientation="horizontal"
        media={<ProgressCircle progress={0.5} size={100} />}
      />
      <CardFooter>
        <Button compact variant="secondary" onPress={showToast}>
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

  const { openModal, closeModal } = useModal();

  const showModal = useCallback(() => {
    openModal(
      <Modal visible onRequestClose={closeModal}>
        <ModalHeader title="Basic Modal" />
        <ModalBody>
          <TextBody as="p">This is a Modal rendered inside of a portal</TextBody>
        </ModalBody>
        <ModalFooter primaryAction={<Button onPress={closeModal}>Save</Button>} />
      </Modal>,
    );
  }, [closeModal, openModal]);

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
        <Button compact variant="secondary" onPress={showModal}>
          See more
        </Button>
      </CardFooter>
    </Card>
  );
}

const FullScreenModalSelectComponent = () => {
  const [value, setValue] = useState<string>();
  const selectOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

  return (
    <Select value={value} placeholder="Choose something..." onChange={setValue}>
      {selectOptions.map((option) => (
        <SelectOption value={option} key={option} title={option} description="Description" />
      ))}
    </Select>
  );
};

function FullScreenModalAmp() {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  const handleClose = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('modal closing');
    toggleOff();
  }, [toggleOff]);

  const primaryContent = (
    <VStack>
      <TextTitle1 as="h1">Fullscreen Modal</TextTitle1>
      <TextBody as="p">This is a test Fullscreen Modal with components composition.</TextBody>
      <FeedCard
        avatarUrl="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        headerMetaData="Dec 18"
        headerDescription="Earn crypto"
        headerActionNode={
          <IconButton
            accessibilityLabel="More actions"
            name="more"
            variant="foregroundMuted"
            transparent
          />
        }
        bodyTitle="Learn AMP. Earn $3 in AMP."
        bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
        bodyMediaUrl="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        bodyOrientation="vertical"
        footerActions={
          <Button compact variant="secondary">
            Earn AMP
          </Button>
        }
      />
      <ListCell
        title="Bitcoin"
        description="BTC"
        detail="$45,123"
        subdetail="+4.55%"
        variant="positive"
      />
      <FullScreenModalSelectComponent />
      <HStack spacingVertical={3} gap={3}>
        <Button onPress={toggleOff}>Yes</Button>
        <Button onPress={toggleOff} variant="secondary">
          No
        </Button>
      </HStack>
    </VStack>
  );

  const secondaryContent = (
    <VStack borderRadius="rounded" elevation={1}>
      <Accordion defaultActiveKey="2">
        <AccordionItem itemKey="1" title="Accordion #1" subtitle="subtitle1">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
        <AccordionItem itemKey="2" title="Accordion #2" subtitle="subtitle2">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
      </Accordion>
    </VStack>
  );

  return (
    <>
      <Button onPress={toggleOn}>Open Modal</Button>
      <FullscreenModal
        visible={visible}
        onRequestClose={handleClose}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
      />
    </>
  );
}

function DataCardWithFullScreenModal() {
  return (
    <Card>
      <CardBody
        title="Crypto earned"
        description="Earn $40 more by learning about new assets"
        orientation="horizontal"
        media={<ProgressCircle progress={0.5} size={100} />}
      />
      <CardFooter>
        <FullScreenModalAmp />
      </CardFooter>
    </Card>
  );
}

function FullScreenAlertAmp() {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  return (
    <>
      <Button onPress={toggleOn}>Open Alert</Button>
      <FullscreenAlert
        visible={visible}
        onRequestClose={toggleOff}
        title="Connection trouble"
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        heroSquare="errorApp500"
        preferredActionLabel="Try again"
        onPreferredActionPress={toggleOff}
        dismissActionLabel="Cancel"
        onDismissActionPress={toggleOff}
      />
    </>
  );
}

function DataCardWithFullScreenAlert() {
  return (
    <Card>
      <CardBody
        title="Crypto earned"
        description="Earn $40 more by learning about new assets"
        orientation="horizontal"
        media={<ProgressCircle progress={0.5} size={100} />}
      />
      <CardFooter>
        <FullScreenAlertAmp />
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
    <VStack width="100%" spacingVertical={6}>
      {!data && <div style={{ height: '500px' }} />}
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
          <TableCell width="40%">
            <Tooltip content="Information about balance">
              <TextHeadline as="span" color="currentColor">
                <HStack>
                  Balance <Icon name="info" size="xs" />
                </HStack>
              </TextHeadline>
            </Tooltip>
          </TableCell>
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
        <TableRow>
          <TableCell direction="horizontal" colSpan={2}>
            <HStack gap={1}>
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
            </HStack>
          </TableCell>
          <TableCell colSpan={1} alignItems="flex-end">
            <Switch onChange={toggle} checked={isFixed}>
              Fixed Layout
            </Switch>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

const DropdownContent = () => (
  <>
    <Box spacing={2}>
      <TextCaption as="h2" color="foregroundMuted">
        Section Heading
      </TextCaption>
    </Box>
    {dropdownOptions.map((option) => (
      <SelectOption key={option} value={option} title={option} />
    ))}
  </>
);

function AppContent() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [showOverlay, toggleOverlay] = useToggler(false);

  return (
    <HStack background="background">
      <VStack>
        <Sidebar logo={<LogoMark />} autoCollapse>
          {sidebarItems.map(createSidebarItem(activeIndex, setActiveIndex))}
        </Sidebar>
      </VStack>
      <VStack>
        <NavigationBar
          end={
            <HStack gap={1} alignItems="center">
              {/* eslint-disable-next-line react/jsx-handler-names */}
              <Checkbox value="hyped" onChange={toggleOverlay.toggle} checked={showOverlay}>
                Show overlay
              </Checkbox>
              <Dropdown
                value={value}
                onChange={setValue}
                content={<DropdownContent />}
                showOverlay={showOverlay}
              >
                <IconButton name="more" />
              </Dropdown>
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
              <DataCardWithFullScreenModal />
              <DataCardWithFullScreenAlert />
            </CardGroup>
          </VStack>
        </Group>
      </VStack>
    </HStack>
  );
}

function Demo() {
  return <AppContent />;
}

export default Demo;
