/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useToggler } from '@cbhq/cds-web';
import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';
import { ModalBody } from '@cbhq/cds-web/overlays/Modal/ModalBody';
import { ModalHeader } from '@cbhq/cds-web/overlays/Modal/ModalHeader';
import { Link } from '@cbhq/cds-web/typography/Link';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';

export type ModalLinkProps = {
  title: string;
  content: React.ReactNode;
};

export function ModalLink({ title, content }: ModalLinkProps) {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  return (
    <>
      <Link variant="headline" onPress={toggleOn}>
        {title}
      </Link>
      <Modal visible={visible} onRequestClose={toggleOff}>
        <ModalHeader title={title} />
        <ModalBody>
          {typeof content === 'string' ? <TextBody as="p">{content}</TextBody> : content}
        </ModalBody>
      </Modal>
    </>
  );
}
