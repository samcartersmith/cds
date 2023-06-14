import React, { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useToggler } from '../hooks/useToggler';
import type {
  BoxBaseProps,
  ButtonBaseProps,
  DrawerRefBaseProps,
  FallbackBaseProps,
  FallbackRectWidthProps,
  FeedCardBaseProps,
  IconButtonBaseProps,
  IllustrationPictogramNames,
  NoopFn,
  PictogramProps,
  SelectBaseProps,
  SelectOptionBaseProps,
  SharedProps,
  StackBaseProps,
  TrayBaseProps,
} from '../types';

import { loremIpsum } from './data/loremIpsum';
import { navigationOptions } from './data/navigation';
import { prices } from './data/prices';

const options: string[] = prices.slice(0, 4);
const lotsOfOptions: string[] = prices.slice(0, 30);
const simpleOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

type PressableProps = {
  onPress?: NoopFn;
};

type SelectOptionProps = {
  value: string;
} & PressableProps &
  Omit<SelectOptionBaseProps, 'compact'>;

type TextProps = {
  children: string;
};

type TrayProps = {
  ref?: MutableRefObject<DrawerRefBaseProps | undefined>;
} & TrayBaseProps;

type RenderItemProps = {
  index: number;
  item: string;
};

type FlatListProps = {
  data: string[];
  renderItem: (item: RenderItemProps) => void;
  contentContainerStyle: Record<string, string | number>;
};

export type CreateTrayProps = {
  Tray: React.ComponentType<TrayProps>;
  Button: React.ComponentType<
    React.PropsWithChildren<ButtonBaseProps & SharedProps & { onPress?: () => void }>
  >;
  SelectOption: React.ComponentType<React.PropsWithChildren<SelectOptionProps>>;
  FlatList: React.ComponentType<React.PropsWithChildren<FlatListProps>>;
  FeedCard: React.ComponentType<React.PropsWithChildren<FeedCardBaseProps>>;
  IconButton: React.ComponentType<React.PropsWithChildren<IconButtonBaseProps & PressableProps>>;
  Pictogram: React.ComponentType<React.PropsWithChildren<PictogramProps>>;
  HStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>;
  VStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>;
  Fallback: React.ComponentType<
    React.PropsWithChildren<FallbackBaseProps & FallbackRectWidthProps>
  >;
  TextBody: React.ComponentType<React.PropsWithChildren<TextProps>>;
  Menu: React.ComponentType<
    React.PropsWithChildren<React.PropsWithChildren<Pick<SelectBaseProps, 'onChange' | 'value'>>>
  >;
};

type DefaultTrayTypes = {
  title?: string;
  fallbackEnabled?: boolean;
  verticalDrawerPercentageOfView?: number;
};

const handleNoop = () => console.log('pressed');

export const trayBuilder = ({
  Tray,
  Button,
  SelectOption,
  FlatList,
  FeedCard,
  IconButton,
  Pictogram,
  HStack,
  VStack,
  Fallback,
  TextBody,
  Menu,
}: CreateTrayProps) => {
  const DefaultTray = ({ title }: DefaultTrayTypes) => {
    const [isTrayVisible, { toggleOff: handlehandleClose, toggleOn: handleOpenTray }] =
      useToggler(false);
    const [value, setValue] = useState<string>();
    const trayRef = useRef<DrawerRefBaseProps | undefined>(undefined);

    const handleOptionPress = () => {
      trayRef.current?.handleClose();
    };

    return (
      <>
        <Button onPress={handleOpenTray}>Open</Button>
        {isTrayVisible && (
          <Tray title={title} onCloseComplete={handlehandleClose} ref={trayRef}>
            <Menu value={value} onChange={setValue}>
              {options.map((option: string) => (
                <SelectOption
                  key={option}
                  title={option}
                  description="BTC"
                  onPress={handleOptionPress}
                  value={option}
                />
              ))}
            </Menu>
          </Tray>
        )}
      </>
    );
  };

  const TrayFallbackContent = () => {
    return (
      <VStack gap={2} alignItems="center">
        {lotsOfOptions.map((item) => (
          <Fallback key={item} height={30} width="90%" disableRandomRectWidth />
        ))}
      </VStack>
    );
  };

  const ScrollableTray = ({
    title,
    fallbackEnabled,
    verticalDrawerPercentageOfView,
  }: DefaultTrayTypes) => {
    const [isTrayVisible, { toggleOff: handlehandleClose, toggleOn: handleOpenTray }] =
      useToggler(false);
    const [value, setValue] = useState<string>();
    const trayRef = useRef<DrawerRefBaseProps>();
    const [isLoading, toggleIsLoading] = useToggler(fallbackEnabled);

    useEffect(() => {
      if (isTrayVisible && fallbackEnabled) {
        toggleIsLoading.toggleOn();
        setTimeout(() => {
          toggleIsLoading.toggleOff();
        }, 2000);
      }
    }, [toggleIsLoading, isTrayVisible, fallbackEnabled]);

    const spacingStyles = useMemo(
      () => ({
        paddingBottom: 200,
      }),
      [],
    );

    const handleOptionPress = useCallback(() => {
      trayRef.current?.handleClose();
    }, []);

    const renderItem = useCallback(
      ({ index, item }: RenderItemProps) => {
        return (
          <SelectOption
            key={index}
            title={item}
            description="BTC"
            onPress={handleOptionPress}
            value={item}
          />
        );
      },
      [handleOptionPress],
    );

    return (
      <>
        <Button onPress={handleOpenTray}>Open</Button>
        {isTrayVisible && (
          <Tray
            title={title}
            onCloseComplete={handlehandleClose}
            disableCapturePanGestureToDismiss
            ref={trayRef}
            verticalDrawerPercentageOfView={verticalDrawerPercentageOfView}
          >
            {isLoading ? (
              <TrayFallbackContent />
            ) : (
              <Menu value={value} onChange={setValue}>
                <FlatList
                  data={lotsOfOptions}
                  renderItem={renderItem}
                  contentContainerStyle={spacingStyles}
                />
              </Menu>
            )}
          </Tray>
        )}
      </>
    );
  };
  const FeedCardTray = () => {
    const [isTrayVisible, { toggleOff: handlehandleClose, toggleOn: handleOpenTray }] =
      useToggler(false);
    const [value, setValue] = useState<string>();
    const trayRef = useRef<DrawerRefBaseProps>();

    const handleOptionPress = useCallback(() => {
      trayRef.current?.handleClose();
    }, []);

    const handleFeedCardHeaderButtonPress = useCallback(() => {
      handleOpenTray();
    }, [handleOpenTray]);
    return (
      <>
        <FeedCard
          avatarUrl="https://images.coinbase.com/avatar?s=350"
          headerDescription="Earn crypto"
          headerActionNode={
            <IconButton
              name="more"
              accessibilityLabel="More actions"
              variant="foregroundMuted"
              transparent
              onPress={handleFeedCardHeaderButtonPress}
            />
          }
          bodyTitle="LEARN AMP. EARN $3 IN AMP."
          bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
          bodyMediaUrl="https://static-assets.coinbase.com/card/introduction/v2/initial_funding.png"
          bodyOrientation="vertical"
          footerActions={
            <Button compact variant="secondary">
              Actions
            </Button>
          }
        />
        {isTrayVisible && (
          <Tray onCloseComplete={handlehandleClose} ref={trayRef}>
            <Menu value={value} onChange={setValue}>
              {simpleOptions.map((option: string) => (
                <SelectOption
                  key={option}
                  description={option}
                  onPress={handleOptionPress}
                  value={option}
                />
              ))}
            </Menu>
          </Tray>
        )}
      </>
    );
  };
  const NavigationTray = () => {
    const [isTrayVisible, { toggleOff: handlehandleClose, toggleOn: handleOpenTray }] =
      useToggler(false);
    const [value, setValue] = useState<string>();
    const trayRef = useRef<DrawerRefBaseProps>();

    const handleOptionPress = useCallback(() => {
      trayRef.current?.handleClose();
    }, []);
    const handleAppSwitcherPress = useCallback(() => {
      handleOpenTray();
    }, [handleOpenTray]);
    return (
      <>
        <HStack justifyContent="flex-end" minHeight={200} gap={2}>
          <IconButton name="hamburger" onPress={handleAppSwitcherPress} />
          <IconButton name="profile" onPress={handleNoop} />
        </HStack>
        {isTrayVisible && (
          <Tray onCloseComplete={handlehandleClose}>
            <Menu onChange={setValue} value={value}>
              {navigationOptions.map(({ name, value: optionValue, description, mediaName }) => (
                <SelectOption
                  key={optionValue}
                  title={name}
                  description={description}
                  media={
                    <Pictogram dimension="48x48" name={mediaName as IllustrationPictogramNames} />
                  }
                  onPress={handleOptionPress}
                  value={optionValue}
                />
              ))}
            </Menu>
          </Tray>
        )}
      </>
    );
  };
  const TrayWithinTray = ({ title }: DefaultTrayTypes) => {
    const [isTrayVisible, { toggleOff: handlehandleClose, toggleOn: handleOpenTray }] =
      useToggler(false);
    const [
      isInceptionTrayVisible,
      { toggleOff: handleCloseInceptionTray, toggleOn: handleOpenInceptionTray },
    ] = useToggler(false);
    const isBlurred = useRef<boolean>(false);

    const onTrayClose = useCallback(() => {
      handlehandleClose();
      if (!isBlurred.current) {
        handleOpenInceptionTray();
      }
      isBlurred.current = false;
    }, [handleOpenInceptionTray, handlehandleClose, isBlurred]);

    const handleBlur = useCallback(() => {
      isBlurred.current = true;
    }, []);

    return (
      <>
        <Button onPress={handleOpenTray}>Open</Button>
        {isTrayVisible && (
          <Tray title={title} onCloseComplete={onTrayClose} onBlur={handleBlur}>
            {({ handleClose }) => {
              return (
                <>
                  <HStack spacing={3}>
                    <TextBody>{loremIpsum.repeat(3)}</TextBody>
                  </HStack>
                  <HStack justifyContent="center">
                    <Button onPress={handleClose}>More options</Button>
                  </HStack>
                </>
              );
            }}
          </Tray>
        )}
        {isInceptionTrayVisible && (
          <Tray title={title} onCloseComplete={handleCloseInceptionTray}>
            {() => {
              return (
                <HStack spacing={3}>
                  <TextBody>{loremIpsum.repeat(3)}</TextBody>
                </HStack>
              );
            }}
          </Tray>
        )}
      </>
    );
  };
  return {
    DefaultTray,
    ScrollableTray,
    FeedCardTray,
    NavigationTray,
    TrayWithinTray,
  };
};
