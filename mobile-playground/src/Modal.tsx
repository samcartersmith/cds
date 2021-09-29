import React from 'react';
import { TextInput } from 'react-native';
import { Button } from '@cbhq/cds-mobile/buttons';
import { Modal, ModalBody, ModalFooter } from '@cbhq/cds-mobile/overlays';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import { PortalProvider } from '@cbhq/cds-mobile/context/PortalProvider';
import { CreateModalProps, createStories } from ':cds-storybook/stories/Modal';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';
import { LoremIpsum } from './internal/LoremIpsum';

const { BasicModal, LongModal, PortalModal } = createStories({
  Modal,
  ModalBody,
  ModalFooter,
  ThemeProvider,
  Button,
  LoremIpsum,
  PortalProvider,
  Input: TextInput,
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
