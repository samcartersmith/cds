import { noop } from '@cbhq/cds-utils';
import { createContext, useContext } from 'react';
import type { ModalBaseProps } from '../types';

export const ModalParentContext = createContext<
  Omit<ModalBaseProps, 'children'> & { accessibilityLabelledBy?: string }
>({
  visible: false,
  onRequestClose: noop,
  hideDividers: false,
  hideCloseButton: false,
});

export const useModalParent = () => useContext(ModalParentContext);
