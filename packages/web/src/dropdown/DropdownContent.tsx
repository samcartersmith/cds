import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { Placement } from '@popperjs/core';
import { AnimationProps, m as motion } from 'framer-motion';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@cbhq/cds-common/animation/dropdown';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { DimensionValue } from '@cbhq/cds-common/types';

import { VStack } from '../layout/VStack';
import { useMotionProps } from '../motion/useMotionProps';
import { cx } from '../utils/linaria';

import { DropdownProps } from './DropdownProps';

const dropdownStyleOverrides = css`
  min-width: min-content;
`;

const dropdownStaticClassName = 'cds-dropdown';

export type DropdownContentProps = {
  height?: DimensionValue;
  onOpen?: () => void;
  placement?: Placement;
} & Pick<DropdownProps, 'width' | 'maxHeight' | 'maxWidth' | 'minWidth' | 'children' | 'value'>;

const MotionVStack = motion(VStack);

export const DropdownContent = memo(
  forwardRef(
    (
      { children, value, onOpen, placement, minWidth, ...props }: DropdownContentProps,
      ref: React.ForwardedRef<HTMLElement>,
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

      return (
        <MotionVStack
          ref={ref}
          background
          borderRadius="roundedLarge"
          className={cx(dropdownStaticClassName, !minWidth ? dropdownStyleOverrides : undefined)} // if there's a custom minWidth, we don't want to override that
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
