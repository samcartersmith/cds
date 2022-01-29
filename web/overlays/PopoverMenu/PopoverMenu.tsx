import React, { forwardRef, memo, ReactNode, useEffect, useMemo } from 'react';
import { popoverMenuMaxHeight, menuGutter } from '@cbhq/cds-common/tokens/menu';
import { ForwardedRef, PopoverMenuBaseProps } from '@cbhq/cds-common/types';
import { isDevelopment } from '@cbhq/cds-utils';
import { css } from 'linaria';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { cx } from '../../utils/linaria';
import { usePopoverMenu } from './usePopoverMenu';
import { VStack, HStack } from '../../layout';
import { usePopoverChildren } from './usePopoverChildren';
import { PopoverProvider } from './PopoverContext';
import { usePopoverPosition } from './usePopoverPosition';

export const popoverMenuStaticClassName = 'cds-popover-menu';

const popoverStyleOverrides = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

export type PopoverMenuProps = {
  children: ReactNode[];
} & PopoverMenuBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const PopoverMenu = memo(
  forwardRef(
    (
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
        ...props
      }: PopoverMenuProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
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
      const {
        popoverMenuRef,
        selectOptionRef,
        setPopper,
        trigger,
        popper,
        controlledElementAccessibilityProps,
      } = context;

      const { triggerNode, childNodes } = usePopoverChildren(children);
      const { popperStyles, popperAttributes } = usePopoverPosition(trigger, popper, menuGutter);

      const convertedWidth = typeof width === 'number' ? `${width}px` : width;

      const popoverStyles: React.CSSProperties = useMemo(
        () => ({
          ...popperStyles.popper,
          width: convertedWidth,
          zIndex: zIndex.overlays.popoverMenu,
        }),
        [popperStyles, convertedWidth],
      );

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

      if (isDevelopment() && !triggerNode) {
        throw Error('Popover requires a trigger element to be wrapped in PopoverTrigger');
      }
      if (isDevelopment() && !childNodes) {
        throw Error('Popover requires children');
      }

      return (
        <PopoverProvider value={context}>
          <HStack position="relative" width={flush ? '100%' : 'auto'} ref={ref} {...props}>
            {triggerNode}
            {visible && (
              <div ref={setPopper} {...popperAttributes.popper} style={popoverStyles}>
                <VStack
                  ref={popoverMenuRef}
                  {...controlledElementAccessibilityProps}
                  background
                  elevation={2}
                  width={width ?? '100%'}
                  borderRadius="popover"
                  role="menu"
                  maxHeight={maxHeight}
                  dangerouslySetClassName={cx(popoverMenuStaticClassName, popoverStyleOverrides)}
                >
                  {childNodes}
                </VStack>
              </div>
            )}
          </HStack>
        </PopoverProvider>
      );
    },
  ),
);
