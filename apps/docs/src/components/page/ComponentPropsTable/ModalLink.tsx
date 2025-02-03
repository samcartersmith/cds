import React, { createContext } from 'react';
import { useToggler } from '@cbhq/cds-common2';
import { Modal } from '@cbhq/cds-web2/overlays/modal/Modal';
import { ModalBody } from '@cbhq/cds-web2/overlays/modal/ModalBody';
import { ModalHeader } from '@cbhq/cds-web2/overlays/modal/ModalHeader';
import { Link, LinkProps } from '@cbhq/cds-web2/typography/Link';

export type ModalLinkProps = {
  children: string;
  content: React.ReactElement;
} & Omit<LinkProps, 'content'>;

/**
 * Gives us the ability to determine if a component is child of Modal.
 * This is useful since we want to hide hyperlink column in PropsTable when in Modal.
 */
export const ModalChildContext = createContext<boolean>(false);

function ModalLink({ children, content, ...props }: ModalLinkProps) {
  const [visible, { toggleOn, toggleOff }] = useToggler();
  return (
    <>
      <Link onClick={toggleOn} {...props}>
        {children}
      </Link>
      <ModalChildContext.Provider value>
        <Modal onRequestClose={toggleOff} visible={visible}>
          <ModalHeader title={children} />
          <ModalBody>{content}</ModalBody>
        </Modal>
      </ModalChildContext.Provider>
    </>
  );
}

export default ModalLink;
