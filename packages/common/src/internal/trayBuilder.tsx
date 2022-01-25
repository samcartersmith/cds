import React, { useCallback, useState } from 'react';

import { useToggler } from '../hooks/useToggler';
import type {
  BoxBaseProps,
  ButtonBaseProps,
  FeedCardBaseProps,
  IconButtonBaseProps,
  IllustrationPictogramNames,
  PictogramProps,
  SelectOptionBaseProps,
  SharedProps,
  StackBaseProps,
  TrayBaseProps,
} from '../types';

import { navigationOptions } from './data/navigation';
import { prices } from './data/prices';

const options: string[] = prices.slice(0, 4);
const lotsOfOptions: string[] = prices.slice(0, 30);
const simpleOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

type LinkableProps = {
  onPress?: null | ((event: unknown) => void) | undefined;
};

export type CreateTrayProps = {
  Tray: React.ComponentType<TrayBaseProps>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
  SelectOption: React.ComponentType<Omit<SelectOptionBaseProps, 'compact'> & LinkableProps>;
  ScrollView: React.ComponentType;
  FeedCard: React.ComponentType<FeedCardBaseProps>;
  IconButton: React.ComponentType<IconButtonBaseProps & LinkableProps>;
  Pictogram: React.ComponentType<PictogramProps>;
  HStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
};

type DefaultTrayTypes = {
  title?: string;
};

export const trayBuilder = ({
  Tray,
  Button,
  SelectOption,
  ScrollView,
  FeedCard,
  IconButton,
  Pictogram,
  HStack,
}: CreateTrayProps) => {
  const DefaultTray = ({ title }: DefaultTrayTypes) => {
    const [isTrayVisible, toggleTray] = useToggler(false);
    const [value, setValue] = useState<string>();
    return (
      <>
        {/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
        <Button onPress={() => toggleTray.toggle()}>Open</Button>
        {isTrayVisible && (
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          <Tray title={title} onCloseComplete={() => toggleTray.toggleOff()}>
            {({ closeTray }) =>
              options.map((option: string) => (
                <SelectOption
                  key={option}
                  title={option}
                  description="Price"
                  selected={option === value}
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  onPress={() => {
                    setValue(option);
                    closeTray();
                  }}
                />
              ))
            }
          </Tray>
        )}
      </>
    );
  };
  const ScrollableTray = ({ title }: DefaultTrayTypes) => {
    const [isTrayVisible, toggleTray] = useToggler(false);
    const [value, setValue] = useState<string>();
    return (
      <>
        {/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
        <Button onPress={() => toggleTray.toggle()}>Open</Button>
        {isTrayVisible && (
          <Tray
            title={title}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onCloseComplete={() => toggleTray.toggleOff()}
            disableCapturePanGestureToDismiss
          >
            {({ closeTray }) => {
              return (
                <ScrollView>
                  {lotsOfOptions.map((option: string) => (
                    <SelectOption
                      key={option}
                      title={option}
                      description="Price"
                      selected={option === value}
                      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                      onPress={() => {
                        setValue(option);
                        closeTray();
                      }}
                    />
                  ))}
                </ScrollView>
              );
            }}
          </Tray>
        )}
      </>
    );
  };
  const FeedCardTray = () => {
    const [isTrayVisible, toggleTray] = useToggler(false);
    const [value, setValue] = useState<string>();
    const handleFeedCardHeaderButtonPress = useCallback(() => {
      toggleTray.toggleOn();
    }, [toggleTray]);
    return (
      <>
        <FeedCard
          avatarUrl="https://via.placeholder.com/350x220"
          headerDescription="Earn crypto"
          headerActionNode={
            <IconButton
              name="more"
              variant="foregroundMuted"
              transparent
              onPress={handleFeedCardHeaderButtonPress}
            />
          }
          bodyTitle="LEARN AMP. EARN $3 IN AMP."
          bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
          bodyMediaUrl="https://via.placeholder.com/350x220"
          bodyOrientation="vertical"
          footerActions={
            <Button compact variant="secondary">
              Actions
            </Button>
          }
        />
        {isTrayVisible && (
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          <Tray onCloseComplete={() => toggleTray.toggleOff()}>
            {({ closeTray }) =>
              simpleOptions.map((option: string) => (
                <SelectOption
                  key={option}
                  description={option}
                  selected={option === value}
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  onPress={() => {
                    setValue(option);
                    closeTray();
                  }}
                />
              ))
            }
          </Tray>
        )}
      </>
    );
  };
  const NavigationTray = () => {
    const [isTrayVisible, toggleTray] = useToggler(false);
    const [value, setValue] = useState<string>();
    const handleAppSwitcherPress = useCallback(() => {
      toggleTray.toggleOn();
    }, [toggleTray]);
    return (
      <>
        <HStack justifyContent="flex-end" minHeight={200} gap={2}>
          <IconButton name="hamburger" onPress={handleAppSwitcherPress} />
          <IconButton name="profile" />
        </HStack>
        {isTrayVisible && (
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          <Tray onCloseComplete={() => toggleTray.toggleOff()}>
            {({ closeTray }) =>
              navigationOptions.map(({ name, value: optionValue, description, mediaName }) => (
                <SelectOption
                  key={optionValue}
                  title={name}
                  description={description}
                  media={
                    <Pictogram dimension="48x48" name={mediaName as IllustrationPictogramNames} />
                  }
                  selected={value === optionValue}
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  onPress={() => {
                    setValue(optionValue);
                    closeTray();
                  }}
                />
              ))
            }
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
  };
};
