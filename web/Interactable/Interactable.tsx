import React, { useMemo, useState } from 'react';

import {
  PaletteBackground,
  PaletteValue,
  SpectrumHueStep,
  usePaletteConfig,
} from '@cbhq/cds-common';
import { cx, css } from 'linaria';

import { palette } from '../styles/palette';
import { opacityHovered, opacityPressed, opacityDisabled } from '../styles/tokens';

function extractOpacityFromSpectrum(
  value: Readonly<PaletteValue>,
  alphas: Record<SpectrumHueStep, number>
): number {
  const [alias] = typeof value === 'string' ? [value] : value;
  const [, , step] = alias.match(/([a-z]+)(\d+)/) || [];
  const num = Number(step) as SpectrumHueStep;

  return alphas[num] || alphas[60];
}

const parent = css`
  position: relative;
  display: inline-flex;
  width: auto;
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  transition: transform 100ms;
  transform: scale(1);
`;

const parentBlock = css`
  display: flex;
  width: 100%;
`;

const parentScaled = css`
  transform: scale(0.98);
`;

const parentScaledBlock = css`
  transform: scale(0.99);
`;

const child = css`
  position: relative;
  width: 100%;
  z-index: 1;
`;

const disabledState = css`
  opacity: ${opacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

const underlay = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
`;

const underlayHover = css`
  background-color: ${palette.background};
`;

const underlayPress = css`
  background-color: ${palette.foreground};
`;

export interface InteractableState {
  disabled: boolean;
  hovered: boolean;
  pressed: boolean;
}

export interface InteractableProps {
  /** Should this element expand to full width? */
  block?: boolean;
  /** Render children to interact with. */
  children: React.ReactElement | ((state: InteractableState) => React.ReactElement);
  /** Mark the element disabled and make transparent. */
  disabled?: boolean;
  /** Class name to apply custom styles to the overlay. */
  overlayClassName?: string;
  /** Color of the overlay (child being rendered) background. */
  overlayColor: PaletteBackground;
  /** Override the pressed logic with your own. */
  pressedOverride?: boolean;
  /** Scale down the element when being pressed. */
  scaleOnPress?: boolean;
  /** Class name to apply custom styles to the underlay. */
  underlayClassName?: string;
}

export const Interactable = ({
  block = false,
  children,
  disabled = false,
  overlayClassName,
  overlayColor,
  pressedOverride,
  scaleOnPress,
  underlayClassName,
}: InteractableProps) => {
  const paletteConfig = usePaletteConfig();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const props = useMemo(() => {
    const events: React.HTMLAttributes<HTMLSpanElement> = {};

    // Dont define handlers when disabled
    if (disabled) {
      return events;
    }

    // Dont define press handlers when being overridden
    if (!pressedOverride) {
      events.onMouseDown = () => setPressed(true);
      events.onMouseUp = () => setPressed(false);
    }

    events.onMouseEnter = () => setHovered(true);
    events.onMouseLeave = () => setHovered(false);

    return events;
  }, [disabled, pressedOverride]);

  const state: InteractableState = {
    disabled,
    hovered,
    pressed: pressedOverride ?? pressed,
  };

  let opacity = undefined;
  let underlayClass = '';

  if (state.pressed) {
    opacity = extractOpacityFromSpectrum(paletteConfig[overlayColor], opacityPressed);
    underlayClass = underlayPress;
  } else if (state.hovered) {
    opacity = extractOpacityFromSpectrum(paletteConfig[overlayColor], opacityHovered);
    underlayClass = underlayHover;
  }

  return (
    <span
      className={cx(
        parent,
        block && parentBlock,
        state.disabled && disabledState,
        scaleOnPress && state.pressed && (block ? parentScaledBlock : parentScaled)
      )}
      {...props}
    >
      {underlayClass && <span className={cx(underlay, underlayClass, underlayClassName)} />}

      <span className={cx(child, overlayClassName)} style={{ opacity }}>
        {typeof children === 'function' ? children(state) : children}
      </span>
    </span>
  );
};
