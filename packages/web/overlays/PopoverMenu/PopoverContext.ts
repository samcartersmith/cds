import React from 'react';
import { defaultPopoverPositionConfig } from '@cbhq/cds-common/tokens/menu';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { isProduction } from '@cbhq/cds-utils';

import { AriaHasPopupType } from '../../hooks/useA11yControlledVisibility';
import { useIsoEffect } from '../../hooks/useIsoEffect';

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
  setTrigger: NoopFn,
  setPopper: NoopFn,
  togglePopoverMenuVisibility: NoopFn,
  trigger: null,
  popper: null,
  controlledElementAccessibilityProps: {
    id: '',
    accessibilityLabel: undefined,
  },
  triggerAccessibilityProps: {
    'aria-controls': '',
    'aria-expanded': false,
    'aria-haspopup': 'dialog' as AriaHasPopupType,
  },
  handleExitMenu: NoopFn,
  handlePopoverMenuBlur: NoopFn,
  onChange: NoopFn,
  onBlur: NoopFn,
  popoverPositionConfig: defaultPopoverPositionConfig,
  visible: false,
  searchEnabled: false,
  openMenu: NoopFn,
};

const errorMessage =
  'PopoverContext is undefined. PopoverProvider was not found higher up the tree. ';

export const PopoverContext = React.createContext<PopoverContextType>(defaultContext);
export const PopoverProvider = PopoverContext.Provider;

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  const hasContext = context.openMenu !== NoopFn;
  useIsoEffect(() => {
    if (!hasContext && !isProduction()) {
      // eslint-disable-next-line no-console
      console.error(errorMessage);
    }
  });
  return context;
};
