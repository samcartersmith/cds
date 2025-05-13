import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import { accounts } from '@cbhq/cds-common2/internal/data/accounts';
import { assetColors, assetImages, assets } from '@cbhq/cds-common2/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common2/internal/data/prices';
import { product } from '@cbhq/cds-common2/internal/data/product';
import { users } from '@cbhq/cds-common2/internal/data/users';
import { sparklineInteractiveData } from '@cbhq/cds-common2/internal/visualizations/SparklineInteractiveData';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import type { IconName } from '@cbhq/cds-common2/types';
import { NoopFn } from '@cbhq/cds-common2/utils/mockUtils';
import { SparklineInteractive, SparklineInteractiveHeader } from '@cbhq/cds-web-visualization2';
import { Accordion, AccordionItem } from '@cbhq/cds-web2/accordion';
import { Button, IconButton } from '@cbhq/cds-web2/buttons';
import { Card, CardBody, CardFooter, CardGroup, FeedCard, UpsellCard } from '@cbhq/cds-web2/cards';
import { ListCell } from '@cbhq/cds-web2/cells';
import { Checkbox, Select, SelectOption, Switch } from '@cbhq/cds-web2/controls';
import { Dropdown } from '@cbhq/cds-web2/dropdown/Dropdown';
import { Icon, LogoMark, NavigationIconProps } from '@cbhq/cds-web2/icons';
import { Pictogram } from '@cbhq/cds-web2/illustrations';
import { Box, Divider, Group, HStack, VStack } from '@cbhq/cds-web2/layout';
import { Avatar } from '@cbhq/cds-web2/media';
import { NavigationBar, NavigationTitle, Sidebar, SidebarItem } from '@cbhq/cds-web2/navigation';
import {
  Alert,
  FullscreenAlert,
  FullscreenModal,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from '@cbhq/cds-web2/overlays';
import { useModal } from '@cbhq/cds-web2/overlays/useModal';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';
import { Pressable } from '@cbhq/cds-web2/system';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from '@cbhq/cds-web2/tables';
import {
  TextBody,
  TextCaption,
  TextHeadline,
  TextTitle1,
  TextTitle3,
} from '@cbhq/cds-web2/typography';
import {
  ProgressBar,
  ProgressBarWithFloatLabel,
  ProgressCircle,
} from '@cbhq/cds-web2/visualizations';

// const SparklineInteractiveWithHeaderBuild = sparklineInteractiveWithHeaderBuilder({
//   SparklineInteractive,
//   SparklineInteractiveHeader,
//   isMobile: false,
// });

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

function createSidebarItem(activeIndex: number, setActiveIndex: (number: number) => void) {
  return ({ title, icon }: { title: string; icon: IconName }, index: number) => {
    const handlePress = () => setActiveIndex(index);

    return (
      <SidebarItem
        key={`example--sidebar-item--${title}`}
        active={index === activeIndex}
        icon={icon}
        onClick={handlePress} // onClick={setActiveIndex} // todo: callback includes index by default
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
  return (item: (typeof options)[number]) => (
    <SelectOption
      key={item.name}
      description={item.description}
      media={<Pictogram name={item.mediaName} />}
      title={item.name}
      value={item.value}
    />
  );
}

function Popover({ trigger }: { trigger: () => React.ReactElement }) {
  // const [value, onChange] = useState<OptionValue>();
  const [value, onChange] = useState<string>('');
  return (
    <Dropdown
      content={
        <>
          <Box padding={2}>
            <TextCaption as="label">For Individuals</TextCaption>
          </Box>
          {options.map(createMenuOption())}
        </>
      }
      onChange={onChange}
      value={value}
      width={350}
    >
      {trigger()}
    </Dropdown>
  );
}

function AvatarTrigger() {
  return (
    <Pressable background="transparent">
      <HStack alignItems="center" gap={1}>
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
  const [showAlert, setShowAlert] = useState(true);

  const feedCardProps = {
    avatar: assets.eth.imageUrl,
    metadata: 'Dec 18',
    author: 'Earn crypto',
    title: 'Learn AMP. Earn $3 in AMP.',
    description:
      'Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.',
    image:
      'https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png',
    mediaPlacement: 'above',
    headerAction: {
      onClick: () => setShowAlert(true),
      name: 'more',
    },
  } as const;

  return (
    <>
      <FeedCard {...feedCardProps} />
      <Alert
        body="Alert body type that can run over multiple lines, but should be kept short."
        onPreferredActionPress={() => setShowAlert(false)}
        onRequestClose={() => setShowAlert(false)}
        pictogram="warning"
        preferredActionLabel="Save"
        title="Alert title"
        visible={showAlert}
      />
    </>
  );
}

function DataCardWithCircle() {
  const toast = useToast();

  const showToast = useCallback(() => {
    toast.show('Copied to clipboard');
  }, [toast]);

  return (
    <Card>
      <CardBody
        description="Earn $40 more by learning about new assets"
        media={<ProgressCircle progress={0.5} size={100} />}
        title="Crypto earned"
      />
      <CardFooter>
        <Button compact onClick={showToast} variant="secondary">
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
        <ModalFooter primaryAction={<Button onClick={closeModal}>Save</Button>} />
      </Modal>,
    );
  }, [closeModal, openModal]);

  return (
    <Card>
      <CardBody description="Earn $40 more by learning about new assets" title="Crypto earned">
        <VStack paddingBottom={gutter}>
          <ProgressBarWithFloatLabel label={label} labelPlacement="above" progress={0.6}>
            <ProgressBar progress={0.6} />
          </ProgressBarWithFloatLabel>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button compact onClick={showModal} variant="secondary">
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
    <Select onChange={setValue} placeholder="Choose something..." value={value}>
      {selectOptions.map((option) => (
        <SelectOption key={option} description="Description" title={option} value={option} />
      ))}
    </Select>
  );
};

function FullScreenModalAmp() {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  const handleClose = useCallback(() => {
    console.log('modal closing');
    toggleOff();
  }, [toggleOff]);

  const primaryContent = (
    <VStack>
      <TextTitle1 as="h1">Fullscreen Modal</TextTitle1>
      <TextBody as="p">This is a test Fullscreen Modal with components composition.</TextBody>
      <FeedCard
        author="Earn crypto"
        avatar="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        description="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
        headerAction={{
          name: 'more',
          variant: 'foregroundMuted',
        }}
        image="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        mediaPlacement="above"
        metadata="Dec 18"
        title="Learn AMP. Earn $3 in AMP."
      />
      <ListCell
        description="BTC"
        detail="$45,123"
        subdetail="+4.55%"
        title="Bitcoin"
        variant="positive"
      />
      <FullScreenModalSelectComponent />
      <HStack gap={3} paddingY={3}>
        <Button onClick={toggleOff}>Yes</Button>
        <Button onClick={toggleOff} variant="secondary">
          No
        </Button>
      </HStack>
    </VStack>
  );

  const secondaryContent = (
    <VStack borderRadius={200} elevation={1}>
      <Accordion defaultActiveKey="2">
        <AccordionItem itemKey="1" subtitle="subtitle1" title="Accordion #1">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
        <AccordionItem itemKey="2" subtitle="subtitle2" title="Accordion #2">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
      </Accordion>
    </VStack>
  );

  return (
    <>
      <Button onClick={toggleOn}>Open Modal</Button>
      <FullscreenModal
        onRequestClose={handleClose}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
}

function DataCardWithFullScreenModal() {
  return (
    <Card>
      <CardBody
        description="Earn $40 more by learning about new assets"
        media={<ProgressCircle progress={0.5} size={100} />}
        title="Crypto earned"
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
      <Button onClick={toggleOn}>Open Alert</Button>
      <FullscreenAlert
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        dismissActionLabel="Cancel"
        heroSquare="errorApp500"
        onDismissActionPress={toggleOff}
        onPreferredActionPress={toggleOff}
        onRequestClose={toggleOff}
        preferredActionLabel="Try again"
        title="Connection trouble"
        visible={visible}
      />
    </>
  );
}

function DataCardWithFullScreenAlert() {
  return (
    <Card>
      <CardBody
        description="Earn $40 more by learning about new assets"
        media={<ProgressCircle progress={0.5} size={100} />}
        title="Crypto earned"
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
    <VStack paddingY={6} width="100%">
      {!data && <div style={{ height: '500px' }} />}
      {/* {data && <SparklineInteractiveWithHeaderBuild data={data} strokeColor={assets.btc.color} />} */}
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
    <Table bordered tableLayout={isFixed ? 'fixed' : 'auto'} variant="ruled">
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
          <TableCell alignItems="flex-end" title="Status" width="60%" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {accountsCopy.map((account) => {
          return (
            <TableRow key={`row--${account.name}`}>
              <TableCell
                start={<Icon name="currencies" size="m" />}
                subtitle={account.currency.name}
                title={account.name}
              />
              <TableCell subtitle={account.balance.currency} title={`$${account.balance.amount}`} />
              <TableCell direction="horizontal" justifyContent="flex-end">
                <Icon
                  color={account.primary ? 'fgPositive' : 'fgNegative'}
                  name={account.primary ? 'circleCheckmark' : 'circleCross'}
                  size="m"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} direction="horizontal">
            <HStack gap={1}>
              {[1, 2, 3, 4, 5].map((pg) => (
                <Button
                  key={pg}
                  compact
                  onClick={() => setPage(pg)}
                  variant={page === pg ? 'primary' : 'secondary'}
                >
                  {pg}
                </Button>
              ))}
            </HStack>
          </TableCell>
          <TableCell alignItems="flex-end" colSpan={1}>
            <Switch checked={isFixed} onChange={toggle}>
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
    <Box padding={2}>
      <TextCaption as="h2" color="fgMuted">
        Section Heading
      </TextCaption>
    </Box>
    {dropdownOptions.map((option) => (
      <SelectOption key={option} title={option} value={option} />
    ))}
  </>
);

function AppContent() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [showOverlay, toggleOverlay] = useToggler(false);

  return (
    <HStack background="bg">
      <VStack>
        <Sidebar autoCollapse logo={<LogoMark />}>
          {sidebarItems.map(createSidebarItem(activeIndex, setActiveIndex))}
        </Sidebar>
      </VStack>
      <VStack>
        <NavigationBar
          end={
            <HStack alignItems="center" gap={1}>
              {}
              <Checkbox checked={showOverlay} onChange={toggleOverlay.toggle} value="hyped">
                Show overlay
              </Checkbox>
              <Dropdown
                content={<DropdownContent />}
                onChange={setValue}
                showOverlay={showOverlay}
                value={value}
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
          direction="horizontal"
          divider={VerticalDivider}
          justifyContent="space-between"
          position="relative"
        >
          <Group divider={Divider} flexBasis="0%" flexGrow={3} flexShrink={1} gap={0}>
            {/* <ChartWithBalance /> */}
            <AssetTable />
          </Group>
          <VStack
            flexBasis="0%"
            flexGrow={1}
            flexShrink={0}
            minHeight="100vh"
            padding={gutter}
            paddingTop={0}
          >
            <CardGroup>
              <VStack gap={2} paddingY={2}>
                <UpsellCard
                  action="Get started"
                  description="Want to add funds to your card every week or month?"
                  media={
                    <Box bottom={6} position="relative" right={24}>
                      <Pictogram dimension="64x64" name="recurringPurchases" />
                    </Box>
                  }
                  onActionPress={NoopFn}
                  onDismissPress={NoopFn}
                  title="Recurring Buy"
                />
              </VStack>
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
