import React from 'react';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen, LoremIpsum } from '../../examples/ExampleScreen';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';
import { PortalProvider } from '../PortalProvider';

const { BasicModal, LongModal, PortalModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ThemeProvider,
  Button,
  LoremIpsum,
  PortalProvider,
  TextInput,
} as CreateModalProps);

const ModalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Modal">
        <BasicModal />
      </Example>
      <Example title="Long Modal">
        <LongModal />
      </Example>
      <Example title="Portal Modal">
        <PortalModal />
      </Example>
    </ExampleScreen>
  );
};

export default ModalScreen;
