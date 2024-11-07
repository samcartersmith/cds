import React from 'react';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';

const { PortalModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  LoremIpsum,
} as CreateModalProps);

const ModalPortalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Portal Modal">
        <PortalModal />
      </Example>
    </ExampleScreen>
  );
};

export default ModalPortalScreen;
