import React, { forwardRef, memo } from 'react';

import { TextBaseProps, useSpectrum } from '@cbhq/cds-common';
import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';
import { css, cx } from 'linaria';

import { round } from '../styles/borderRadius';
import { level1 } from '../styles/elevation';
import { control, palette } from '../tokens';
import { FilteredHTMLAttributes } from '../types';
import { Control } from './Control';

export interface SwitchProps
  extends FilteredHTMLAttributes<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  /** Label for the switch. */
  children?: TextBaseProps['children'];
  /** Handle change event when user clicks on the switch. */
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const SwitchWithRef = forwardRef<HTMLInputElement, SwitchProps>(function SwitchWithRef(
  { children, ...props },
  ref
) {
  const { checked } = props;
  const spectrum = useSpectrum();
  return (
    <Control
      type="checkbox"
      label={children}
      ref={ref}
      backgroundColor={checked ? 'primary' : 'backgroundAlternate'}
      borderRadius="pill"
      {...props}
    >
      <div role="presentation" className={cx(track, focusRing)} data-filled={checked}>
        <div
          className={cx(
            thumb,
            round,
            level1,
            // NOTE (hannah): Switch thumb is a special case where it should always be white.
            spectrum === 'light' ? primaryForegroundThumb : foregroundThumb
          )}
        />
      </div>
    </Control>
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
