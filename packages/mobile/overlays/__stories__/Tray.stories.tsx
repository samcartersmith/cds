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

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray title={title} onCloseComplete={handleCloseTray} ref={trayRef}>
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
          onCloseComplete={handleCloseTray}
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
        <Tray onCloseComplete={handleCloseTray} ref={trayRef}>
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
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
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
        <IconButton name="profile" onPress={NoopFn} />
      </HStack>
      {isTrayVisible && (
        <Tray onCloseComplete={handleCloseTray}>
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
        <Tray title={title} onCloseComplete={handleTrayCloseComplete}>
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
      <Modal visible={isModalVisible} onRequestClose={handleCloseModal}>
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
      <Button onPress={handleOpenTray} ref={triggerRef}>
        Open
      </Button>
      {isTrayVisible && (
        <Tray
          title={title}
          onCloseComplete={handleCloseTray}
          handleBarAccessibilityLabel="This is a handlebar, double tap to dismiss the tray"
          ref={trayRef}
        >
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
        <ScrollableTray title="You are going to be waiting awhile..." fallbackEnabled />
      </Example>
    </ExampleScreen>
  );
};

export default TrayScreen;
