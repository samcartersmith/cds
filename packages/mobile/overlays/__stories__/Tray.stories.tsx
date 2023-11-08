import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { navigationOptions } from '@cbhq/cds-common/internal/data/navigation';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { DrawerRefBaseProps, IllustrationPictogramNames } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { FeedCard } from '../../cards/FeedCard';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useA11y } from '../../hooks/useA11y';
import { Pictogram } from '../../illustrations/Pictogram';
import { Fallback, HStack, VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { TextBody } from '../../typography';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalHeader } from '../Modal/ModalHeader';
import { Tray } from '../Tray/Tray';

const options: string[] = prices.slice(0, 4);
const lotsOfOptions: string[] = prices.slice(0, 30);
const simpleOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const DefaultTray = ({ title }: { title?: string }) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = () => {
    trayRef.current?.handleClose();
  };

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          onCloseComplete={handleCloseTray}
          onVisibilityChange={handleTrayVisibilityChange}
          title={title}
        >
          <Menu onChange={setValue} value={value}>
            {options.map((option: string) => (
              <SelectOption
                key={option}
                description="BTC"
                onPress={handleOptionPress}
                title={option}
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
    <VStack alignItems="center" gap={2}>
      {lotsOfOptions.map((item) => (
        <Fallback key={item} disableRandomRectWidth height={30} width="90%" />
      ))}
    </VStack>
  );
};

const ScrollableTray = ({
  title,
  fallbackEnabled,
  verticalDrawerPercentageOfView,
}: {
  title?: string;
  fallbackEnabled?: boolean;
  verticalDrawerPercentageOfView?: number;
}) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);
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
    ({ index, item }: { index: number; item: string }) => {
      return (
        <SelectOption
          key={index}
          description="BTC"
          onPress={handleOptionPress}
          title={item}
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
          ref={trayRef}
          disableCapturePanGestureToDismiss
          onCloseComplete={handleCloseTray}
          title={title}
          verticalDrawerPercentageOfView={verticalDrawerPercentageOfView}
        >
          {isLoading ? (
            <TrayFallbackContent />
          ) : (
            <Menu onChange={setValue} value={value}>
              <FlatList
                contentContainerStyle={spacingStyles}
                data={lotsOfOptions}
                renderItem={renderItem}
              />
            </Menu>
          )}
        </Tray>
      )}
    </>
  );
};
const FeedCardTray = () => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

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
        bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
        bodyMediaUrl="https://static-assets.coinbase.com/card/introduction/v2/initial_funding.png"
        bodyOrientation="vertical"
        bodyTitle="LEARN AMP. EARN $3 IN AMP."
        footerActions={
          <Button compact variant="secondary">
            Actions
          </Button>
        }
        headerActionNode={
          <IconButton
            transparent
            accessibilityLabel="More actions"
            name="more"
            onPress={handleFeedCardHeaderButtonPress}
            variant="foregroundMuted"
          />
        }
        headerDescription="Earn crypto"
      />
      {isTrayVisible && (
        <Tray ref={trayRef} onCloseComplete={handleCloseTray}>
          <Menu onChange={setValue} value={value}>
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
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);
  const handleAppSwitcherPress = useCallback(() => {
    handleOpenTray();
  }, [handleOpenTray]);
  return (
    <>
      <HStack gap={2} justifyContent="flex-end" minHeight={200}>
        <IconButton name="hamburger" onPress={handleAppSwitcherPress} />
        <IconButton name="profile" onPress={NoopFn} />
      </HStack>
      {isTrayVisible && (
        <Tray ref={trayRef} onCloseComplete={handleCloseTray}>
          <Menu onChange={setValue} value={value}>
            {navigationOptions.map(({ name, value: optionValue, description, mediaName }) => (
              <SelectOption
                key={optionValue}
                description={description}
                media={
                  <Pictogram dimension="48x48" name={mediaName as IllustrationPictogramNames} />
                }
                onPress={handleOptionPress}
                title={name}
                value={optionValue}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};
const TrayWithinTray = ({ title }: { title?: string }) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const [
    isInceptionTrayVisible,
    { toggleOff: handleCloseInceptionTray, toggleOn: handleOpenInceptionTray },
  ] = useToggler(false);
  const isBlurred = useRef<boolean>(false);

  const onTrayClose = useCallback(() => {
    handleCloseTray();
    if (!isBlurred.current) {
      handleOpenInceptionTray();
    }
    isBlurred.current = false;
  }, [handleOpenInceptionTray, handleCloseTray, isBlurred]);

  const handleBlur = useCallback(() => {
    isBlurred.current = true;
  }, []);

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray onBlur={handleBlur} onCloseComplete={onTrayClose} title={title}>
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
        <Tray onCloseComplete={handleCloseInceptionTray} title={title}>
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

const TrayToModalFlow = ({ title }: { title?: string }) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const [isModalVisible, { toggleOff: handleCloseModal, toggleOn: handleOpenModal }] =
    useToggler(false);

  const handleTrayCloseComplete = useCallback(() => {
    handleCloseTray();
    handleOpenModal();
  }, [handleCloseTray, handleOpenModal]);

  return (
    <>
      <Button onPress={handleOpenTray}>Open Tray</Button>
      {isTrayVisible && (
        <Tray onCloseComplete={handleTrayCloseComplete} title={title}>
          {({ handleClose }) => {
            return (
              <>
                <HStack spacing={3}>
                  <LoremIpsum />
                </HStack>
                <HStack justifyContent="center">
                  <Button onPress={handleClose}>Open Modal</Button>
                </HStack>
              </>
            );
          }}
        </Tray>
      )}
      <Modal onRequestClose={handleCloseModal} visible={isModalVisible}>
        <ModalHeader title="I am a Modal" />
        <ModalBody>
          <LoremIpsum />
          <Button onPress={handleCloseModal}>Close</Button>
        </ModalBody>
      </Modal>
    </>
  );
};

const AccessibleTray = ({ title }: { title?: string }) => {
  const [isTrayVisible, { toggleOff, toggleOn: handleOpenTray }] = useToggler(false);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);
  const triggerRef = useRef(null);
  const { setA11yFocus } = useA11y();

  const handleOptionPress = () => {
    trayRef.current?.handleClose();
  };

  const handleCloseTray = useCallback(() => {
    toggleOff();
    // return a11y focus to trigger
    setA11yFocus(triggerRef);
  }, [toggleOff, setA11yFocus]);

  return (
    <>
      <Button ref={triggerRef} onPress={handleOpenTray}>
        Open
      </Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="This is a handlebar, double tap to dismiss the tray"
          onCloseComplete={handleCloseTray}
          title={title}
        >
          <Menu onChange={setValue} value={value}>
            {options.map((option: string) => (
              <SelectOption
                key={option}
                description="BTC"
                onPress={handleOptionPress}
                title={option}
                value={option}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};

export const TrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tray">
        <DefaultTray />
      </Example>
      <Example title="Accessible Tray">
        <AccessibleTray />
      </Example>
      <Example title="Tray with Title">
        <DefaultTray title="How much would you like to donate? " />
      </Example>
      <Example title="Tray with Scrollable Children">
        <ScrollableTray title="Lots of options..." />
      </Example>
      <Example title="Tray that takes up most of the screen">
        <ScrollableTray title="Lots of options..." verticalDrawerPercentageOfView={0.9} />
      </Example>
      <Example title="Feed Card with Tray">
        <FeedCardTray />
      </Example>
      <Example title="Navigation with Tray">
        <NavigationTray />
      </Example>
      <Example title="Tray within a Tray">
        <TrayWithinTray />
      </Example>
      <Example title="Tray to Modal Flow">
        <TrayToModalFlow />
      </Example>
      <Example title="Tray with Fallback">
        <ScrollableTray fallbackEnabled title="You are going to be waiting awhile..." />
      </Example>
    </ExampleScreen>
  );
};

export default TrayScreen;
