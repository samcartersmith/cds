import React, { ComponentType, ReactElement, ReactNode, useCallback, useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { FeatureFlagProvider } from '@cbhq/cds-common/system/FeatureFlagProvider';
import {
  AvatarBaseProps,
  BoxBaseProps,
  ButtonBaseProps,
  CellMediaProps,
  DividerBaseProps,
  DotBaseProps,
  FeedCardBaseProps,
  IconButtonBaseProps,
  IllustrationPictogramNames,
  PictogramProps,
  PopoverMenuBaseProps,
  SelectOptionBaseProps,
  SharedProps,
  StackBaseProps,
} from '@cbhq/cds-common/types';

import { NavigationIconProps } from '../../icons';
import { PressableInternalProps, PressableProps } from '../../system/Pressable';

type LinkableProps = {
  onPress?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler<Element>;
};

export type PopoverTriggerProps = {
  children: ReactElement;
};

export type NavigationBarProps = {
  start?: ReactNode;
  end?: ReactNode;
  children: NonNullable<ReactNode>;
};

type NavigationTitleProps = {
  children: NonNullable<string>;
};

type TypographyProps = {
  text: string;
};

type PopoverTriggerWrapperProps = {
  children: ReactNode;
};

export type CreatePopoverMenuStoriesProps = {
  PopoverMenu: ComponentType<PopoverMenuBaseProps>;
  PopoverTrigger: ComponentType<PopoverTriggerProps>;
  PopoverTriggerWrapper: ComponentType<PopoverTriggerWrapperProps>;
  VStack: ComponentType<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>;
  HStack: ComponentType<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>;
  SelectOption: ComponentType<SelectOptionBaseProps & LinkableProps>;
  IconButton: ComponentType<IconButtonBaseProps & SharedProps>;
  NavigationBar: ComponentType<NavigationBarProps>;
  NavigationTitle: ComponentType<NavigationTitleProps>;
  Pictogram: ComponentType<PictogramProps>;
  CellMedia: ComponentType<CellMediaProps>;
  FeedCard: ComponentType<FeedCardBaseProps>;
  Button: ComponentType<ButtonBaseProps>;
  Divider: ComponentType<DividerBaseProps>;
  SectionTitle: ComponentType<TypographyProps>;
  DotStatusColor: ComponentType<DotBaseProps>;
  AvatarButton: ComponentType<AvatarBaseProps>;
  Pressable: ComponentType<PressableInternalProps & PressableProps & LinkableProps>;
  NavigationIcon: ComponentType<NavigationIconProps>;
};

export const priceOptions = [
  '666',
  '2387',
  '4542',
  '54534',
  '5435',
  '77',
  '123',
  '4345345',
  '6544',
  '874',
  '675765',
  '65655',
];

const accountOptions = ['Settings', 'Appearance', 'Taxes & Reports', 'Help', 'Sign Out'];

const feedCardOptions = ['Show me more like this', 'Show me less like this', 'Copy link'];

type NavigationOptions = {
  name: string;
  value: string;
  description: string;
  mediaName: IllustrationPictogramNames;
};

const navigationOptions: NavigationOptions[] = [
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
];

type DefaultPopoverMenuProps = {
  triggerTestID?: string;
} & Pick<PopoverMenuBaseProps, 'testID' | 'onBlur'>;

export const popoverMenuBuilder = ({
  PopoverMenu,
  PopoverTrigger,
  PopoverTriggerWrapper,
  VStack,
  HStack,
  SelectOption,
  IconButton,
  NavigationBar,
  NavigationTitle,
  Pictogram,
  FeedCard,
  Button,
  Divider,
  SectionTitle,
  DotStatusColor,
  AvatarButton,
  Pressable,
  NavigationIcon,
}: CreatePopoverMenuStoriesProps) => {
  const Default = ({
    triggerTestID = 'popover-menu-trigger',
    ...props
  }: DefaultPopoverMenuProps) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    return (
      <HStack minHeight={500} background="background">
        <PopoverMenu
          {...props}
          width={200}
          value={value}
          onChange={handleMenuValueChange}
          openMenu={togglePopoverMenuVisibility.toggleOn}
          closeMenu={togglePopoverMenuVisibility.toggleOff}
          visible={visible}
        >
          <PopoverTrigger>
            <IconButton testID={triggerTestID} transparent name="more" variant="secondary" />
          </PopoverTrigger>
          <SectionTitle text="Section Heading" />
          {priceOptions.slice(0, 4).map((option) => (
            <SelectOption
              value={option}
              key={option}
              title={option}
              description="BTC"
              testID={`option-${option}`}
            />
          ))}
          <Divider />
          <SectionTitle text="Section Heading" />
          {priceOptions.slice(5, 9).map((option) => (
            <SelectOption
              value={option}
              key={option}
              title={option}
              description="BTC"
              testID={`option-${option}`}
            />
          ))}
        </PopoverMenu>
      </HStack>
    );
  };

  const NavigationMenu = ({ ...props }: Pick<PopoverMenuBaseProps, 'testID'>) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    return (
      <VStack background="background">
        <NavigationBar
          end={
            <HStack alignItems="center" gap={1}>
              <PopoverMenu
                {...props}
                width={350}
                openMenu={togglePopoverMenuVisibility.toggleOn}
                closeMenu={togglePopoverMenuVisibility.toggleOff}
                visible={visible}
                onChange={handleMenuValueChange}
                value={value}
                disablePortal
              >
                <PopoverTrigger>
                  <Pressable as="button" backgroundColor="transparent">
                    <NavigationIcon name="appSwitcher" />
                  </Pressable>
                </PopoverTrigger>
                {navigationOptions.map(({ name, value: optionValue, description, mediaName }) => (
                  <SelectOption
                    value={optionValue}
                    key={optionValue}
                    title={name}
                    description={description}
                    media={<Pictogram dimension="48x48" name={mediaName} />}
                  />
                ))}
              </PopoverMenu>
              <IconButton transparent name="bell" variant="secondary" />
            </HStack>
          }
        >
          <NavigationTitle>Navigation Example</NavigationTitle>
        </NavigationBar>
      </VStack>
    );
  };

  const FeedCardMenu = ({ ...props }: Pick<PopoverMenuBaseProps, 'testID'>) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    return (
      <FeedCard
        avatarUrl="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        headerMetaData="Dec 18"
        headerDescription="Earn crypto"
        headerActionNode={
          <PopoverMenu
            {...props}
            width={250}
            value={value}
            onChange={handleMenuValueChange}
            openMenu={togglePopoverMenuVisibility.toggleOn}
            closeMenu={togglePopoverMenuVisibility.toggleOff}
            visible={visible}
          >
            <PopoverTrigger>
              <IconButton
                accessibilityLabel="More actions"
                transparent
                name="more"
                variant="secondary"
              />
            </PopoverTrigger>
            {feedCardOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                testID={`option-${option}`}
              />
            ))}
          </PopoverMenu>
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
    );
  };

  const AvatarButtonMenu = ({ triggerTestID, ...props }: DefaultPopoverMenuProps) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    return (
      <VStack minHeight={500} background="background">
        <PopoverMenu
          {...props}
          width={200}
          value={value}
          onChange={handleMenuValueChange}
          openMenu={togglePopoverMenuVisibility.toggleOn}
          closeMenu={togglePopoverMenuVisibility.toggleOff}
          visible={visible}
        >
          <PopoverTriggerWrapper>
            <DotStatusColor variant="positive" pin="top-start">
              <PopoverTrigger>
                <AvatarButton testID={triggerTestID} alt="Sneezy" />
              </PopoverTrigger>
            </DotStatusColor>
          </PopoverTriggerWrapper>
          <SectionTitle text="Manage your profile" />
          {accountOptions.map((option) => (
            <SelectOption value={option} key={option} title={option} testID={`option-${option}`} />
          ))}
        </PopoverMenu>
      </VStack>
    );
  };

  const FrontierMenu = ({ triggerTestID, ...props }: DefaultPopoverMenuProps) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    return (
      <FeatureFlagProvider frontier>
        <VStack minHeight={500} background="background">
          <PopoverMenu
            {...props}
            width={200}
            value={value}
            onChange={handleMenuValueChange}
            openMenu={togglePopoverMenuVisibility.toggleOn}
            closeMenu={togglePopoverMenuVisibility.toggleOff}
            visible={visible}
          >
            <PopoverTrigger>
              <IconButton testID={triggerTestID} transparent name="more" variant="secondary" />
            </PopoverTrigger>
            <SectionTitle text="Section Heading" />
            {priceOptions.slice(0, 4).map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
              />
            ))}
            <Divider />
            <SectionTitle text="Section Heading" />
            {priceOptions.slice(5, 9).map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
              />
            ))}
          </PopoverMenu>
        </VStack>
      </FeatureFlagProvider>
    );
  };

  return {
    Default,
    NavigationMenu,
    FeedCardMenu,
    AvatarButtonMenu,
    FrontierMenu,
  };
};
