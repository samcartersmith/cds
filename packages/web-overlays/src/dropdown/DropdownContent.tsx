import React, { ForwardedRef, forwardRef, memo, useEffect } from 'react';
import { Placement } from '@popperjs/core';
import { AnimationProps, m as motion } from 'framer-motion';
import { css } from 'linaria';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@cbhq/cds-common/animation/dropdown';
import { FOCUSABLE_ELEMENTS } from '@cbhq/cds-common/tokens/overlays';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { DimensionValue, NoopFn } from '@cbhq/cds-common/types';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { useMotionProps } from '@cbhq/cds-web/motion/useMotionProps';
import { isBrowser } from '@cbhq/cds-web/utils/browser';
import { cx } from '@cbhq/cds-web/utils/linaria';

import { DropdownProps } from './DropdownProps';

const dropdownStyleOverrides = css`
  min-width: min-content;
`;

const dropdownStaticClassName = 'cds-dropdown';

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export type DropdownContentProps = {
  height?: DimensionValue;
  onOpen?: NoopFn;
  placement?: Placement;
} & Pick<DropdownProps, 'width' | 'maxHeight' | 'maxWidth' | 'minWidth' | 'children' | 'value'>;

const MotionVStack = motion(VStack);

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const DropdownContent = memo(
  forwardRef(
    (
      { children, value, onOpen, placement, minWidth, ...props }: DropdownContentProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const isHorizontal = placement?.includes('left') || placement?.includes('right');
      const translate = isHorizontal ? 'x' : 'y';

      const motionProps = useMotionProps({
        enterConfigs: [
          animateDropdownOpacityInConfig,
          { ...animateDropdownTransformInConfig, property: translate },
        ],
        exitConfigs: [
          animateDropdownOpacityOutConfig,
          { ...animateDropdownTransformOutConfig, property: translate },
        ],
        exit: 'exit',
      });

      // on mount focus the first option (unless there is an already selected value, then select option will focus it)
      useEffect(() => {
        onOpen?.();
        if (!value && isBrowser() && ref && typeof ref !== 'function') {
          const focusableElements = ref.current?.querySelectorAll(FOCUSABLE_ELEMENTS);
          if (focusableElements?.length && focusableElements[0]) {
            (focusableElements[0] as HTMLElement).focus();
          }
        }
      }, [ref, value, onOpen]);

      return (
        <MotionVStack
          ref={ref}
          background
          borderRadius="roundedLarge"
          dangerouslySetClassName={cx(
            dropdownStaticClassName,
            !minWidth ? dropdownStyleOverrides : undefined,
          )} // if there's a custom minWidth, we don't want to override that
          elevation={2}
          minWidth={minWidth}
          overflow="auto"
          role="menu"
          tabIndex={0}
          zIndex={zIndex.overlays.dropdown}
          {...props}
          {...(motionProps as AnimationProps)}
        >
          {children}
        </MotionVStack>
      );
    },
  ),
);
