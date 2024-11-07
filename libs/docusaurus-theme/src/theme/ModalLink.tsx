import React, { createContext, memo } from 'react';
import { useToggler } from '@cbhq/cds-web';
import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';
import { ModalBody } from '@cbhq/cds-web/overlays/Modal/ModalBody';
import { ModalHeader } from '@cbhq/cds-web/overlays/Modal/ModalHeader';
import { Link, LinkProps } from '@cbhq/cds-web/typography/Link';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';

export type ModalLinkProps = {
  children: string;
  content: React.ReactNode;
} & Omit<LinkProps, 'content'>;

/**
 * Gives us the ability to determine if a component is child of Modal.
 * This is useful since we want to hide hyperlink column in PropsTable when in Modal.
 */
export const ModalChildContext = createContext<boolean>(false);

const ModalLink = memo(function ModalLink({ children, content, ...props }: ModalLinkProps) {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  return (
    <>
      <Link onPress={toggleOn} {...props}>
        {children}
      </Link>
      {/* eslint-disable-next-line react/jsx-boolean-value */}
      <ModalChildContext.Provider value={true}>
        <Modal onRequestClose={toggleOff} visible={visible}>
          <ModalHeader title={children} />
          <ModalBody>
            {typeof content === 'string' ? <TextBody as="p">{content}</TextBody> : content}
          </ModalBody>
        </Modal>
      </ModalChildContext.Provider>
    </>
  );
});

export default ModalLink;
