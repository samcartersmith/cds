import { isProduction } from '@cbhq/cds-utils/env';
import React from 'react';
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
  width: 0,
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
};

const errorMessage =
  'PopoverContext is undefined. PopoverProvider was not found higher up the tree. ';

const createPopoverContext = () => {
  const PopoverContext = React.createContext<PopoverContextType>(defaultContext);
  const PopoverProvider = PopoverContext.Provider;

  const usePopoverContext = () => {
    const context = React.useContext(PopoverContext);
    if (!context.onChange && !isProduction()) {
      // eslint-disable-next-line no-console
      console.error(errorMessage);
    }
    return context;
  };

  return {
    usePopoverContext,
    PopoverProvider,
    PopoverContext,
  };
};

export const { usePopoverContext, PopoverProvider, PopoverContext } = createPopoverContext();
