import { createStories, CreateModalProps } from ':cds-storybook/stories/Modal';

import { PortalProvider } from '../../context/PortalProvider';
import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal, ModalBody, ModalFooter } from '..';
import { ThemeProvider } from '../../system/ThemeProvider';

export default {
  title: 'Core Components/Modal',
  component: Modal,
};

export const { BasicModal, DarkModal, LongModal, PortalModal } = createStories({
  Modal,
  ModalBody,
  ModalFooter,
  ThemeProvider,
  Button,
  LoremIpsum,
  PortalProvider,
} as CreateModalProps);
