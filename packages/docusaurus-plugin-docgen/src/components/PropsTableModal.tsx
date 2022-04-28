/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useToggler } from '@cbhq/cds-web';
import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';
import { ModalBody } from '@cbhq/cds-web/overlays/Modal/ModalBody';
import { ModalHeader } from '@cbhq/cds-web/overlays/Modal/ModalHeader';
import { Link } from '@cbhq/cds-web/typography/Link';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';

export type PropsTableModalProps = {
  title: string;
  modalContent: React.ReactNode;
};

export function PropsTableModal({ title, modalContent }: PropsTableModalProps) {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  return (
    <>
      <Link variant="headline" onPress={toggleOn}>
        {title}
      </Link>
      <Modal visible={visible} onRequestClose={toggleOff}>
        <ModalHeader title={title} />
        <ModalBody>
          {typeof modalContent === 'string' ? (
            <TextBody as="p">{modalContent}</TextBody>
          ) : (
            modalContent
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
