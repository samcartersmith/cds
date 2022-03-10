import React from 'react';
import { defaultPopoverPositionConfig } from '@cbhq/cds-common/tokens/menu';
import { isProduction } from '@cbhq/cds-utils';

import { PopoverContextType } from './usePopoverMenu';

const defaultContext: PopoverContextType = {
  triggerRef: {
    current: null,
  },
  selectOptionRef: {
    current: null,
  },
  popoverMenuRef: {
    current: null,
  },
  disabled: false,
  sanitizedValue: undefined,
  width: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
  flush: false,
  setTrigger: () => null,
  setPopper: () => null,
  togglePopoverMenuVisibility: () => null,
  trigger: null,
  popper: null,
  controlledElementAccessibilityProps: {
    id: '',
    accessibilityLabel: undefined,
  },
  triggerAccessibilityProps: {
    'aria-controls': '',
    'aria-expanded': false,
    'aria-haspopup': '',
  },
  handleExitMenu: () => null,
  handlePopoverMenuBlur: () => null,
  onChange: () => null,
  onBlur: () => null,
  popoverPositionConfig: defaultPopoverPositionConfig,
  visible: false,
  searchEnabled: false,
  openMenu: () => null,
};

const errorMessage =
  'PopoverContext is undefined. PopoverProvider was not found higher up the tree. ';

export const PopoverContext = React.createContext<PopoverContextType>(defaultContext);
export const PopoverProvider = PopoverContext.Provider;

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context.onChange && !isProduction()) {
    // eslint-disable-next-line no-console
    console.error(errorMessage);
  }
  return context;
};
