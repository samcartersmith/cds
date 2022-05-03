import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { dropdownMaxHeight } from '@cbhq/cds-common/tokens/menu';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { ForwardedRef, PopoverMenuBaseProps, PopoverMenuRefProps } from '@cbhq/cds-common/types';
import { generateRandomId, isDevelopment } from '@cbhq/cds-utils';

import { HStack } from '../../layout';
import { isSSR } from '../../utils/browser';

import { PopoverContent } from './PopoverContent';
import { PopoverProvider } from './PopoverContext';
import { usePopoverChildren } from './usePopoverChildren';
import { usePopoverMenu } from './usePopoverMenu';

export const PopoverMenu = memo(
  forwardRef(function PopoverMenu(
    {
      children,
      onChange,
      value,
      width,
      maxHeight = dropdownMaxHeight,
      visible,
      flush,
      openMenu,
      closeMenu,
      disablePortal,
      popoverPositionConfig,
      minWidth,
      maxWidth,
      searchEnabled = false,
      ...props
    }: PopoverMenuBaseProps,
    ref: ForwardedRef<PopoverMenuRefProps>,
  ) {
    const { triggerNode, childNodes } = usePopoverChildren(children);
    const context = usePopoverMenu({
      onChange,
      value,
      width,
      maxHeight,
      visible,
      flush,
      openMenu,
      closeMenu,
      popoverPositionConfig,
      minWidth,
      maxWidth,
      searchEnabled,
      ...props,
    });
    const { handlePopoverMenuBlur, selectOptionRef, popoverMenuRef } = context;

    const containerPrefix = 'cds-popover-menu-container-';
    // have to store it in a ref because PopperJS renders twice on mount causing issues with createPortal grabbing the id
    const containerId = useRef<string>(generateRandomId(containerPrefix));
    const popoverPortalZIndex = zIndex.overlays.portal + zIndex.overlays.popoverMenu;

    const focusSelectOption = useCallback(() => {
      if (selectOptionRef.current) {
        selectOptionRef.current.focus();
      } else if (popoverMenuRef.current) {
        const selectOptions = popoverMenuRef.current?.querySelectorAll('[role="menuitem"]');
        if (selectOptions.length) {
          (selectOptions[0] as HTMLButtonElement).focus();
        }
      }
    }, [selectOptionRef, popoverMenuRef]);

    // when menu is opened, focuses already selected option or first option
    useEffect(() => {
      // disable for when searchEnabled is true because trigger needs to maintain focus
      if (visible && !searchEnabled) {
        focusSelectOption();
      }
    }, [focusSelectOption, searchEnabled, visible]);

    const renderContent = () => {
      // eslint-disable-next-line no-restricted-globals
      if (isSSR() || disablePortal || !document.getElementById(containerId.current)) {
        return <PopoverContent>{childNodes}</PopoverContent>;
      }
      return createPortal(
        <PopoverContent>{childNodes}</PopoverContent>,
        // eslint-disable-next-line no-restricted-globals
        document.getElementById(containerId.current) as Element,
      );
    };

    useImperativeHandle(
      ref,
      () => ({
        handlePopoverMenuBlur,
        focusSelectOption,
      }),
      [handlePopoverMenuBlur, focusSelectOption],
    );

    if (isDevelopment() && !triggerNode) {
      throw Error('Popover requires a trigger element to be wrapped in PopoverTrigger');
    }
    if (isDevelopment() && !childNodes) {
      throw Error('Popover requires children');
    }

    return (
      <PopoverProvider value={context}>
        <HStack position="relative" height="100%" width={flush ? '100%' : 'auto'} {...props}>
          {triggerNode}
          <div id={containerId.current} style={{ zIndex: popoverPortalZIndex }}>
            {visible && renderContent()}
          </div>
        </HStack>
      </PopoverProvider>
    );
  }),
);
