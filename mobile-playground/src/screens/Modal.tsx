import React from 'react';
import { Button } from '@cbhq/cds-mobile/buttons';
import { TextInput } from '@cbhq/cds-mobile/controls/TextInput';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@cbhq/cds-mobile/overlays';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import { PortalProvider } from '@cbhq/cds-mobile/overlays/PortalProvider';
import { modalBuilder, CreateModalProps } from '@cbhq/cds-common/internal/modalBuilder';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';
import { LoremIpsum } from '../internal/LoremIpsum';

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
    <ExamplesScreen>
      <Example title="Basic Modal">
        <BasicModal />
      </Example>
      <Example title="Long Modal">
        <LongModal />
      </Example>
      <Example title="Portal Modal">
        <PortalModal />
      </Example>
    </ExamplesScreen>
  );
};

export default ModalScreen;
