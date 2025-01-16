import React, { forwardRef, memo } from 'react';
import type { Placement } from '@popperjs/core';
import { motion } from 'framer-motion';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@cbhq/cds-common2/animation/dropdown';
import type { DimensionValue } from '@cbhq/cds-common2/types';

import { VStack } from '../layout/VStack';
import { useMotionProps } from '../motion/useMotionProps';

import type { DropdownProps } from './DropdownProps';

const dropdownStaticClassName = 'cds-dropdown';

export type DropdownContentProps = {
  height?: DimensionValue;
  onOpen?: () => void;
  placement?: Placement;
} & Pick<DropdownProps, 'width' | 'maxHeight' | 'maxWidth' | 'minWidth' | 'children' | 'value'>;

const MotionVStack = motion(VStack);

export const DropdownContent = memo(
  forwardRef<HTMLDivElement, DropdownContentProps>(
    ({ children, value, onOpen, placement, minWidth = 'min-content', ...props }, ref) => {
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
          bordered
          background="backgroundPrimary"
          borderRadius={400}
          className={dropdownStaticClassName}
          elevation={2}
          minWidth={minWidth}
          overflow="auto"
          role="menu"
          tabIndex={0}
          zIndex="dropdown"
          {...props}
          {...motionProps}
        >
          {children}
        </MotionVStack>
      );
    },
  ),
);
