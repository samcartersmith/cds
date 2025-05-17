import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';

import { Control, type ControlBaseProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

const DotSvg = ({
  color = 'black',
  width = 20,
}: {
  color?: React.CSSProperties['color'];
  width?: React.CSSProperties['width'];
}) => {
  return (
    <svg fill="none" height={width} viewBox={`0 0 ${width} ${width}`} width={width}>
      <circle cx="50%" cy="50%" fill={color} r={`calc(${width} / 3)`} />
    </svg>
  );
};

const baseStyle = css`
  position: relative;
  width: var(--controlSize-radioSize);
  appearance: radio;
  height: var(--controlSize-radioSize);
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-bg);
  border-style: solid;
  border-width: var(--borderWidth-100);
  border-radius: var(--borderRadius-1000);

  /* Disable default focus ring before adding custom focus ring styles */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 2px;
  }
`;

export type RadioProps<T extends string> = ControlBaseProps<T>;

const RadioWithRef = forwardRef(function RadioWithRef<T extends string>(
  { children, ...props }: RadioProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const theme = useTheme();
  const iconWidth = theme.controlSize.radioSize;

  const { checked = false } = props;
  const { outerContainerMotionProps, innerContainerMotionProps } = useControlMotionProps({
    checked,
    shouldAnimateBackground: false,
  });

  return (
    <Control ref={ref} background="bg" borderRadius={1000} label={children} type="radio" {...props}>
      <motion.div
        className={baseStyle}
        data-filled={checked}
        role="presentation"
        {...outerContainerMotionProps}
      >
        <motion.div {...innerContainerMotionProps}>
          {checked && (
            <Box color="fgPrimary" testID="radio-icon">
              <DotSvg color="currentColor" width={iconWidth} />
            </Box>
          )}
        </motion.div>
      </motion.div>
    </Control>
  );
}) as <T extends string>(
  props: RadioProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;
