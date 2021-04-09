import { createElement, forwardRef } from 'react';

import { BorderRadius, PaletteBackground } from '@cbhq/cds-common';
import { useInteractableTokens } from '@cbhq/cds-common/hooks/useInteractableTokens';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { cx, css } from 'linaria';

import * as borderRadii from '../styles/borderRadius';
import { palette } from '../tokens';
import { DynamicElement } from '../types';

const parent = css`
  position: relative;
  display: inline-flex;
  width: fit-content;
  height: fit-content;
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  transition: transform 150ms;
  transform: scale(1);

  &:active[data-should-scale-on-press='true'] {
    transform: scale(0.98);
  }
`;

const parentBlock = css`
  display: flex;
  width: 100%;

  &:active[data-should-scale-on-press='true'] {
    transform: scale(0.99);
  }
`;

const overlay = css`
  position: relative;
  width: 100%;
  z-index: 1;
  transition: opacity 150ms ease-out;

  &:hover {
    opacity: var(--interactable-opacity-hovered);
  }
  &:active {
    opacity: var(--interactable-opacity-pressed);
  }

  label:hover & {
    opacity: var(--interactable-opacity-hovered);
  }
  label:active & {
    opacity: var(--interactable-opacity-pressed);
  }
`;

const disabledState = css`
  opacity: ${opacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

const underlay = css`
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  z-index: 0;
  overflow: hidden;
`;

export type InteractableProps = {
  /** Should this element expand to full width? */
  block?: boolean;
  /** Render children to interact with. */
  children: React.ReactElement;
  /** Mark the element disabled and make transparent. */
  disabled?: boolean;
  /** Set border radius on underlay */
  borderRadius?: BorderRadius;
  /** Color of the overlay (child being rendered) background. */
  backgroundColor: PaletteBackground;
  /** Scale down the element when being pressed. */
  shouldScaleOnPress?: boolean;
};

export const Interactable = forwardRef(function Interactable<T extends React.ElementType>(
  {
    as,
    block = false,
    children,
    disabled = false,
    loading = false,
    borderRadius,
    backgroundColor,
    shouldScaleOnPress,
    ...props
  }: Omit<DynamicElement<InteractableProps, T>, 'as'> & { as: T },
  ref: React.ForwardedRef<HTMLElement>
) {
  const { underlayColor, pressedOpacity, hoverOpacity } = useInteractableTokens(backgroundColor);
  const isDisabled = disabled || loading;

  return createElement(as, {
    ref,
    className: cx(parent, block && parentBlock, disabled && disabledState),
    'data-should-scale-on-press': shouldScaleOnPress,
    children: (
      <>
        {!isDisabled && (
          <span
            role="presentation"
            className={cx(underlay, borderRadii[borderRadius])}
            style={{
              backgroundColor: palette[underlayColor],
            }}
          />
        )}
        {isDisabled ? (
          children
        ) : (
          <span
            className={overlay}
            style={{
              '--interactable-opacity-pressed': pressedOpacity,
              '--interactable-opacity-hovered': hoverOpacity,
            }}
          >
            {children}
          </span>
        )}
      </>
    ),
    ...props,
  });
});
