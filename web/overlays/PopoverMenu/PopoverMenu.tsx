import React, { forwardRef, memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { popoverMenuMaxHeight } from '@cbhq/cds-common/tokens/menu';
import { ForwardedRef, PopoverMenuBaseProps } from '@cbhq/cds-common/types';
import { generateRandomId, isDevelopment } from '@cbhq/cds-utils';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { isSSR } from '../../utils/browser';
import { usePopoverMenu } from './usePopoverMenu';
import { HStack } from '../../layout';
import { usePopoverChildren } from './usePopoverChildren';
import { PopoverProvider } from './PopoverContext';
import { PopoverContent } from './PopoverContent';

export const PopoverMenu = memo(
  forwardRef(function PopoverMenu(
    {
      children,
      onChange,
      value,
      width,
      maxHeight = popoverMenuMaxHeight,
      visible,
      flush,
      openMenu,
      closeMenu,
      disablePortal,
      ...props
    }: PopoverMenuBaseProps,
    ref: ForwardedRef<HTMLElement>,
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
      ...props,
    });
    const { popoverMenuRef, selectOptionRef } = context;

    const containerPrefix = 'cds-popover-menu-container-';
    // have to store it in a ref because PopperJS renders twice on mount causing issues with createPortal grabbing the id
    const containerId = useRef<string>(generateRandomId(containerPrefix));

    // when menu is opened, focuses already selected option or first option
    useEffect(() => {
      if (visible) {
        if (selectOptionRef.current) {
          selectOptionRef.current.focus();
        } else if (popoverMenuRef.current) {
          const selectOptions = popoverMenuRef.current?.querySelectorAll('[role="menuitem"]');
          if (selectOptions.length) {
            (selectOptions[0] as HTMLButtonElement).focus();
          }
        }
      }
    }, [popoverMenuRef, selectOptionRef, visible]);

    const renderContent = () => {
      if (isSSR() || disablePortal || !document.getElementById(containerId.current)) {
        return <PopoverContent>{childNodes}</PopoverContent>;
      }
      return createPortal(
        <PopoverContent>{childNodes}</PopoverContent>,
        document.getElementById(containerId.current) as Element,
      );
    };

    if (isDevelopment() && !triggerNode) {
      throw Error('Popover requires a trigger element to be wrapped in PopoverTrigger');
    }
    if (isDevelopment() && !childNodes) {
      throw Error('Popover requires children');
    }

    return (
      <PopoverProvider value={context}>
        <HStack
          position="relative"
          height="100%"
          width={flush ? '100%' : 'auto'}
          ref={ref}
          {...props}
        >
          {triggerNode}
          <div id={containerId.current} style={{ zIndex: zIndex.overlays.popoverMenu }}>
            {visible && renderContent()}
          </div>
        </HStack>
      </PopoverProvider>
    );
  }),
);
