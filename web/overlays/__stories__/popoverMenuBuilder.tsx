import React, { useState, useCallback, ReactNode } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import {
  PopoverMenuBaseProps,
  SelectOptionBaseProps,
  BoxBaseProps,
  StackBaseProps,
  IconButtonBaseProps,
  PictogramProps,
  CellMediaProps,
  FeedCardBaseProps,
  ButtonBaseProps,
  SharedProps,
  IllustrationPictogramNames,
  DividerBaseProps,
} from '@cbhq/cds-common/types';
import { FeatureFlagProvider } from '@cbhq/cds-common/system/FeatureFlagProvider';

type LinkableProps = {
  onPress?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler<Element>;
};

type MenuItemProps = {
  value: string;
  key?: string;
  ref?: ((ref: HTMLElement) => void) | undefined;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
} & LinkableProps;

export type PopoverMenuProps = {
  children: ReactNode[];
  onChange?: (newValue: string) => void;
} & PopoverMenuBaseProps;

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

export type CreatePopoverMenuStoriesProps = {
  PopoverMenu: React.ComponentType<PopoverMenuProps>;
  VStack: React.ComponentType<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>;
  HStack: React.ComponentType<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>;
  SelectOption: React.ComponentType<SelectOptionBaseProps & Pick<MenuItemProps, 'value' | 'key'>>;
  IconButton: React.ComponentType<IconButtonBaseProps & SharedProps>;
  NavigationBar: React.ComponentType<NavigationBarProps>;
  NavigationTitle: React.ComponentType<NavigationTitleProps>;
  Pictogram: React.ComponentType<PictogramProps>;
  CellMedia: React.ComponentType<CellMediaProps>;
  FeedCard: React.ComponentType<FeedCardBaseProps>;
  Button: React.ComponentType<ButtonBaseProps>;
  Divider: React.ComponentType<DividerBaseProps>;
  MenuSectionLabel: React.ComponentType<TypographyProps>;
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
} & Pick<PopoverMenuProps, 'testID' | 'onPress'>;

export const popoverMenuBuilder = ({
  PopoverMenu,
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
  MenuSectionLabel,
}: CreatePopoverMenuStoriesProps) => {
  const Default = ({ triggerTestID, ...props }: DefaultPopoverMenuProps) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    const createTrigger = useCallback(
      () => <IconButton testID={triggerTestID} transparent name="more" variant="secondary" />,
      [triggerTestID],
    );

    return (
      <VStack minHeight={500} background="background">
        <PopoverMenu
          {...props}
          width={200}
          triggerNode={createTrigger}
          value={value}
          onChange={handleMenuValueChange}
          openMenu={togglePopoverMenuVisibility.toggleOn}
          closeMenu={togglePopoverMenuVisibility.toggleOff}
          visible={visible}
        >
          <MenuSectionLabel text="Section Heading" />
          {priceOptions.slice(0, 4).map((option) => (
            <SelectOption
              value={option}
              key={option}
              title={option}
              description="BTC"
              testID={`option-${option}`}
              selected={value === option}
            />
          ))}
          <Divider />
          <MenuSectionLabel text="Section Heading" />
          {priceOptions.slice(5, 9).map((option) => (
            <SelectOption
              value={option}
              key={option}
              title={option}
              description="BTC"
              testID={`option-${option}`}
              selected={value === option}
            />
          ))}
        </PopoverMenu>
      </VStack>
    );
  };

  const NavigationMenu = ({ ...props }: Pick<PopoverMenuProps, 'testID' | 'onPress'>) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    const createTrigger = useCallback(
      () => <IconButton transparent name="more" variant="secondary" />,
      [],
    );

    return (
      <VStack minHeight={500} background="background">
        <NavigationBar
          end={
            <HStack gap={1}>
              <PopoverMenu
                {...props}
                width={350}
                triggerNode={createTrigger}
                openMenu={togglePopoverMenuVisibility.toggleOn}
                closeMenu={togglePopoverMenuVisibility.toggleOff}
                visible={visible}
                onChange={handleMenuValueChange}
                value={value}
              >
                {navigationOptions.map(({ name, value: optionValue, description, mediaName }) => (
                  <SelectOption
                    value={optionValue}
                    key={optionValue}
                    title={name}
                    description={description}
                    media={<Pictogram dimension="48x48" name={mediaName} />}
                    selected={value === optionValue}
                  />
                ))}
              </PopoverMenu>
              <IconButton name="bell" variant="secondary" />
            </HStack>
          }
        >
          <NavigationTitle>Navigation Example</NavigationTitle>
        </NavigationBar>
      </VStack>
    );
  };

  const FeedCardMenu = ({ ...props }: Pick<PopoverMenuProps, 'testID' | 'onPress'>) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    const createTrigger = useCallback(
      () => <IconButton transparent name="more" variant="secondary" />,
      [],
    );

    return (
      <FeedCard
        avatarUrl="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        headerMetaData="Dec 18"
        headerDescription="Earn crypto"
        headerActionNode={
          <PopoverMenu
            {...props}
            width={200}
            triggerNode={createTrigger}
            value={value}
            onChange={handleMenuValueChange}
            openMenu={togglePopoverMenuVisibility.toggleOn}
            closeMenu={togglePopoverMenuVisibility.toggleOff}
            visible={visible}
          >
            {priceOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
                selected={value === option}
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

  const FrontierMenu = ({ triggerTestID, ...props }: DefaultPopoverMenuProps) => {
    const [value, setValue] = useState('');
    const [visible, togglePopoverMenuVisibility] = useToggler(false);

    const handleMenuValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
      },
      [setValue],
    );

    const createTrigger = useCallback(
      () => <IconButton testID={triggerTestID} transparent name="more" variant="secondary" />,
      [triggerTestID],
    );

    return (
      <FeatureFlagProvider frontier>
        <VStack minHeight={500} background="background">
          <PopoverMenu
            {...props}
            width={200}
            triggerNode={createTrigger}
            value={value}
            onChange={handleMenuValueChange}
            openMenu={togglePopoverMenuVisibility.toggleOn}
            closeMenu={togglePopoverMenuVisibility.toggleOff}
            visible={visible}
          >
            <MenuSectionLabel text="Section Heading" />
            {priceOptions.slice(0, 4).map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
                selected={value === option}
              />
            ))}
            <Divider />
            <MenuSectionLabel text="Section Heading" />
            {priceOptions.slice(5, 9).map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
                selected={value === option}
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
    FrontierMenu,
  };
};
