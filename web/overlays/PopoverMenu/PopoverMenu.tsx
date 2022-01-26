import React, { forwardRef, memo, ReactNode } from 'react';
import { popoverMenuMaxHeight } from '@cbhq/cds-common/tokens/menu';
import { ForwardedRef, PopoverMenuBaseProps } from '@cbhq/cds-common/types';
import { isDevelopment } from '@cbhq/cds-utils';
import { css } from 'linaria';
import { cx } from '../../utils/linaria';
import { usePopoverMenu } from './usePopoverMenu';
import { VStack, HStack } from '../../layout';
import { usePopoverChildren } from './usePopoverChildren';
import { PopoverProvider } from './PopoverContext';

export const popoverMenuStaticClassName = 'cds-popover-menu';

const popoverStyleOverrides = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

export type PopoverMenuProps = {
  children: ReactNode[];
} & PopoverMenuBaseProps;

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
        ...props,
      });
      const {
        popoverMenuRef,
        setPopper,
        popperAttributes,
        popoverStyles,
        controlledElementAccessibilityProps,
      } = context;

      const { trigger, childNodes } = usePopoverChildren(children);

      if (isDevelopment() && !trigger) {
        throw Error('Popover requires a trigger element to be wrapped in PopoverTrigger');
      }
      if (isDevelopment() && !children) {
        throw Error('Popover requires children');
      }

      return (
        <PopoverProvider value={context}>
          <HStack position="relative" width={flush ? '100%' : 'auto'} ref={ref} {...props}>
            {trigger}
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
