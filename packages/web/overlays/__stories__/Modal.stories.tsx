import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '..';

export default {
  title: 'Core Components/Modal',
  component: Modal,
};

export const { BasicModal, VisibleModal, ModalWithoutPortal, LongModal, PortalModal } =
  modalBuilder({
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button,
    LoremIpsum,
  } as CreateModalProps);
