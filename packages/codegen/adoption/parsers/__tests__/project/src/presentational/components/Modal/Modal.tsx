import React from 'react';
import { Modal as MUIModal, ModalProps } from '@material-ui/core';

type Props = {
  title?: string;
  onBack?: () => void;
};

// eslint-disable-next-line prefer-arrow-callback
export const Modal = React.memo(function Modal(props: ModalProps & Props) {
  const { title, onBack, children, ...rest } = props;

  return (
    <MUIModal
      {...rest}
      id="modal"
      disableBackdropClick
      onClick={(event) => event.stopPropagation()}
    >
      <div>This is the Modal body</div>
    </MUIModal>
  );
});
