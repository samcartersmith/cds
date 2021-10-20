import { createStories, CreateModalProps } from ':cds-storybook/stories/Modal';
import { PortalProvider } from '../PortalProvider';
import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '..';
import { ThemeProvider } from '../../system/ThemeProvider';

export default {
  title: 'Core Components/Modal',
  component: Modal,
};

export const { BasicModal, ModalWithoutPortal, DarkModal, LongModal, PortalModal } = createStories({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ThemeProvider,
  Button,
  LoremIpsum,
  PortalProvider,
} as CreateModalProps);
