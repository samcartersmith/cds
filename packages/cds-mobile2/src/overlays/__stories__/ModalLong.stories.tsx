import React from 'react';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common2/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

const { LongModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  LoremIpsum,
  TextInput,
} as CreateModalProps);

const ModalLongScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Long Modal">
        <LongModal />
      </Example>
    </ExampleScreen>
  );
};

export default ModalLongScreen;
