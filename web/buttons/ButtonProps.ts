import { ButtonBaseProps } from '@cbhq/cds-common';

import { InteractableProps } from './useInteractable';

export interface ButtonProps
  extends ButtonBaseProps,
    InteractableProps<HTMLButtonElement>,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'className' | 'onClick' | 'onClickCapture' | 'style'
    > {}
