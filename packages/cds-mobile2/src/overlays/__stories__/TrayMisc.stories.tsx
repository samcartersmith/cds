import React, { useCallback, useRef, useState } from 'react';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { DrawerRefBaseProps } from '@cbhq/cds-common2/types';

import { Button } from '../../buttons/Button';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useA11y } from '../../hooks/useA11y';
import { HStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { TextBody } from '../../typography';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalHeader } from '../modal/ModalHeader';
import { Tray } from '../tray/Tray';

import { options } from './Trays';

const AccessibleTray = ({ title }: { title?: React.ReactNode }) => {
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

const TrayWithinTray = ({ title }: { title?: React.ReactNode }) => {
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
                <HStack padding={3}>
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
              <HStack padding={3}>
                <TextBody>{loremIpsum.repeat(3)}</TextBody>
              </HStack>
            );
          }}
        </Tray>
      )}
    </>
  );
};

const TrayToModalFlow = ({ title }: { title?: React.ReactNode }) => {
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
                <HStack padding={3}>
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

export const TrayMiscScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Accessible Tray">
        <AccessibleTray />
      </Example>
      <Example title="Tray within a Tray">
        <TrayWithinTray />
      </Example>
      <Example title="Tray to Modal Flow">
        <TrayToModalFlow />
      </Example>
    </ExampleScreen>
  );
};

export default TrayMiscScreen;
