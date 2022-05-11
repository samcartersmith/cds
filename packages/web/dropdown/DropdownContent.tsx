import React, { ForwardedRef, forwardRef, memo, useEffect, useRef } from 'react';
import { css } from 'linaria';
import { FOCUSABLE_ELEMENTS } from '@cbhq/cds-common/tokens/overlays';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { DimensionValue, NoopFn } from '@cbhq/cds-common/types';

import { VStack } from '../layout/VStack';
import { transparentScrollbar } from '../styles/scrollbar';
import { isBrowser } from '../utils/browser';
import { cx } from '../utils/linaria';

import { DropdownProps } from './DropdownProps';

const popoverStyleOverrides = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

const popoverMenuStaticClassName = 'cds-popover-menu';

type DropdownContentProps = {
  height?: DimensionValue;
  onOpen?: NoopFn;
} & Pick<DropdownProps, 'width' | 'maxHeight' | 'maxWidth' | 'minWidth' | 'children' | 'value'>;

export const DropdownContent = memo(
  forwardRef(
    (
      { children, value, onOpen, ...props }: DropdownContentProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const isMounted = useRef<boolean>(false);

      useEffect(() => {
        if (!isMounted.current) {
          onOpen?.();
          isMounted.current = true;
        }
      }, [onOpen]);

      // on mount focus the first option (unless there is an already selected value, then select option will focus it)
      useEffect(() => {
        if (!value && isBrowser() && ref && typeof ref !== 'function') {
          const focusableElements = ref.current?.querySelectorAll(FOCUSABLE_ELEMENTS);
          if (focusableElements) {
            (focusableElements[0] as HTMLElement).focus();
          }
        }
      }, [ref, value]);

      return (
        <VStack
          ref={ref}
          background
          elevation={2}
          borderRadius="popover"
          zIndex={zIndex.overlays.dropdown}
          role="menu"
          dangerouslySetClassName={cx(
            popoverMenuStaticClassName,
            popoverStyleOverrides,
            transparentScrollbar,
          )}
          {...props}
        >
          {children}
        </VStack>
      );
    },
  ),
);
