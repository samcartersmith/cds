import React, { useCallback } from 'react';

import { useToggler } from '@cbhq/cds-common';
import { Button } from '@cbhq/cds-mobile/buttons';
import { Overlay, useOverlayAnimation } from '@cbhq/cds-mobile/overlays';
import { Modal } from 'react-native';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const OverlayScreen = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(false);
  const [opacity, animateOverlayIn, animateOverlayOut] = useOverlayAnimation();

  const openModal = useCallback(() => {
    toggleOn();
    animateOverlayIn.start();
  }, [animateOverlayIn, toggleOn]);

  const closeModal = useCallback(() => {
    animateOverlayOut.start(({ finished }) => {
      if (finished) toggleOff();
    });
  }, [animateOverlayOut, toggleOff]);

  return (
    <ExamplesScreen>
      <Example>
        <Button onPress={openModal}>Open Modal</Button>
        <Modal
          visible={visible}
          animationType="none"
          hardwareAccelerated
          statusBarTranslucent
          transparent
        >
          <Overlay opacity={opacity} onTouchStart={closeModal} />
        </Modal>
      </Example>
    </ExamplesScreen>
  );
};

export default OverlayScreen;
