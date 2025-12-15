/* eslint-disable simple-import-sort/imports */
import styled from 'styled-components';

import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';

export const CustomModal = styled(Modal)<{ $isFullScreen?: boolean }>`
  ${({ $isFullScreen }) =>
    $isFullScreen
      ? `
    &[data-testid='modal-dialog-motion'] {
      width: 100%;
    }
  `
      : ''}
`;
