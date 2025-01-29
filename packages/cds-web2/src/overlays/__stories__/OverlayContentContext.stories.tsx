/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  OverlayContentContext,
  useOverlayContentContext,
} from '@cbhq/cds-common2/overlays/OverlayContentContext';

import { VStack } from '../../layout/VStack';
import { Modal } from '../modal/Modal';
import { Overlay } from '../overlay/Overlay';

export default {
  title: 'Core Components/OverlayContentContext',
  component: OverlayContentContext,
};

const ContextTest = () => {
  const { isOverlay, isModal, isDrawer } = useOverlayContentContext();
  return (
    <VStack>
      <div>isOverlay: {String(isOverlay)}</div>
      <div>isModal: {String(isModal)}</div>
      <div>isDrawer: {String(isDrawer)}</div>
    </VStack>
  );
};

export const InOverlay = () => {
  const [show, setShow] = useState(false);
  return (
    <VStack>
      <button onClick={() => setShow(true)}>Show Overlay</button>
      {show && (
        <Overlay>
          <VStack>
            <button onClick={() => setShow(false)}>Hide Overlay</button>
            <ContextTest />
          </VStack>
        </Overlay>
      )}
    </VStack>
  );
};

export const InModal = () => {
  const [show, setShow] = useState(false);
  return (
    <VStack>
      <button onClick={() => setShow(true)}>Show Modal</button>
      <Modal onRequestClose={() => setShow(false)} visible={show}>
        <VStack>
          <button onClick={() => setShow(false)}>Hide Modal</button>
          <ContextTest />
        </VStack>
      </Modal>
    </VStack>
  );
};

// TO DO: Uncomment this when & associated disableA11yCheck below when FullscreenModal is migrated
// export const InFullscreenModal = () => {
//   const [show, setShow] = useState(false);
//   return (
//     <VStack>
//       <button onClick={() => setShow(true)}>Show FullscreenModal</button>
//       <FullscreenModal
//         onRequestClose={() => setShow(false)}
//         primaryContent={
//           <VStack>
//             <button onClick={() => setShow(false)}>Hide FullscreenModal</button>
//             <ContextTest />
//           </VStack>
//         }
//         visible={show}
//       />
//     </VStack>
//   );
// };

export const WithoutProvider = () => {
  return (
    <VStack>
      <ContextTest />
    </VStack>
  );
};

const disableA11yCheck = {
  a11y: {
    config: {
      rules: [{ id: 'aria-dialog-name', enabled: false }],
    },
  },
};

InModal.parameters = disableA11yCheck;
// InFullscreenModal.parameters = disableA11yCheck;
