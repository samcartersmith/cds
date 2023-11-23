import React from 'react';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';

const { BasicModal, LongModal, PortalModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  LoremIpsum,
  TextInput,
} as CreateModalProps);

const ModalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Modal">
        <BasicModal />
      </Example>
      <Example title="Long Modal">
        <LongModal visible={false} />
      </Example>
      <Example title="Portal Modal">
        <PortalModal />
      </Example>
    </ExampleScreen>
  );
};

export default ModalScreen;
