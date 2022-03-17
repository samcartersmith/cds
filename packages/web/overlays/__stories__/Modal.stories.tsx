import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { ThemeProvider } from '../../system/ThemeProvider';
import { PortalProvider } from '../PortalProvider';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '..';

export default {
  title: 'Core Components/Modal',
  component: Modal,
};

export const { BasicModal, VisibleModal, ModalWithoutPortal, DarkModal, LongModal, PortalModal } =
  modalBuilder({
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ThemeProvider,
    Button,
    LoremIpsum,
    PortalProvider,
  } as CreateModalProps);
