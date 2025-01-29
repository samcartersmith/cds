import React from 'react';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common2/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

const { BackButtonModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  LoremIpsum,
} as CreateModalProps);

const ModalBackButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Back Button Modal">
        <BackButtonModal />
      </Example>
    </ExampleScreen>
  );
};

export default ModalBackButtonScreen;
