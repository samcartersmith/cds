import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import { useToggler } from '@cbhq/cds-common/src/hooks/useToggler';

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

  return (
    <ExampleScreen>
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
    </ExampleScreen>
  );
};

export default OverlayScreen;
