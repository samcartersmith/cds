/* eslint-disable react/jsx-sort-props */
import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';
import { ModalBody } from '@cbhq/cds-web/v7/overlays/Modal/ModalBody';

type Props = {
  visible: boolean;
  accessibilityLabel: string;
};

export function WrapperModal({ visible, accessibilityLabel }: Props) {
  return (
    <Modal visible={visible} accessibilityLabel={accessibilityLabel}>
      <ModalBody>Wrapper legacy body</ModalBody>
    </Modal>
  );
}
