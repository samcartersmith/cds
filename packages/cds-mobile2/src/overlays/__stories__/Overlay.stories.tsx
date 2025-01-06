import React, { useCallback, useEffect } from 'react';
import { Modal } from 'react-native';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Overlay } from '../Overlay/Overlay';
import { useOverlayAnimation } from '../Overlay/useOverlayAnimation';

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

  useEffect(() => {
    openModal();

    return () => closeModal();
  }, [closeModal, openModal]);

  return (
    <ExampleScreen>
      <Example>
        <Button onPress={openModal}>Open Overlay</Button>
        <Modal
          hardwareAccelerated
          statusBarTranslucent
          transparent
          animationType="none"
          visible={visible}
        >
          <Overlay onTouchStart={closeModal} opacity={opacity} />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default OverlayScreen;
