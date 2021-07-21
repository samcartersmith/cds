/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, memo } from 'react';

import { switchPalette } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { css, cx } from 'linaria';

import { Box } from '../layout/Box';
import { round } from '../styles/borderRadius';
import { level1 } from '../styles/elevation';
import { ThemeProvider } from '../system/ThemeProvider';
import { control, palette } from '../tokens';
import { Control, ControlProps } from './Control';

export type SwitchProps = Omit<ControlBaseProps<string> & ControlProps, 'value'>;

const SwitchWithRef = forwardRef<HTMLInputElement, SwitchProps>(function SwitchWithRef(
  { children, checked, ...props },
  ref,
) {
  // Switch thumb is a special case where it should always be white.
  const thumbColor = useSpectrumConditional({
    light: primaryForegroundThumb,
    dark: foregroundThumb,
  });

  const switchNode = (
    <Control
      role="switch"
      type="checkbox"
      label={children}
      ref={ref}
      backgroundColor={checked ? 'primary' : 'backgroundAlternate'}
      borderRadius="pill"
      checked={checked}
      {...props}
    >
      <div className={cx(track, focusRing)} data-filled={checked}>
        <div
          className={cx(
            thumb,
            round,
            // TODO (hannah): Once elevation design is ready, revisit this.
            level1,
            thumbColor,
          )}
        />
      </div>
    </Control>
  );

  return (
    <ThemeProvider palette={switchPalette}>
      {children ? (
        <Box
          minHeight={control.switchHeight}
          width="fit-content"
          alignItems="center"
          role="presentation"
        >
          {switchNode}
        </Box>
      ) : (
        switchNode
      )}
    </ThemeProvider>
  );
});

export const Switch = memo(SwitchWithRef);

const track = css`
  width: ${control.switchWidth};
  height: ${control.switchHeight};
  border-radius: ${borderRadius.pill}px;
  flex-shrink: 0;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${palette.backgroundAlternate};
  transition: background-color 150ms ease-out;
  &[data-filled='true'] {
    background-color: ${palette.primary};
  }
`;

const thumb = css`
  width: ${control.switchThumbSize};
  height: ${control.switchThumbSize};
  position: absolute;
  top: 1px;
  left: 1px;
  background-color: ${palette.primaryForeground};
  border: 0.5 solid ${palette.line};

  transition: transform 150ms ease-out;
  [data-filled='true'] & {
    transform: translateX(calc(${control.switchWidth} - ${control.switchThumbSize} - 2px));
  }
`;

const primaryForegroundThumb = css`
  background-color: ${palette.primaryForeground};
`;

const foregroundThumb = css`
  background-color: ${palette.foreground};
`;

const FOCUS_PADDING = 4;

const focusRing = css`
  position: relative;
  &::after {
    content: '';
    border: ${borderWidth.focusRing}px solid ${palette.primary};
    border-radius: ${borderRadius.pill + 2}px;
    position: absolute;
    left: -${FOCUS_PADDING}px;
    top: -${FOCUS_PADDING}px;
    right: -${FOCUS_PADDING}px;
    bottom: -${FOCUS_PADDING}px;

    opacity: 0;
    transition: opacity 100ms ease-out;
  }

  /* for control inputs */
  .focus-visible + &::after {
    opacity: 1;
  }
`;
