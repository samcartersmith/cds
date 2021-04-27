import React, { createElement, useMemo, forwardRef } from 'react';

import { usePaletteConfig } from '@cbhq/cds-common';
import { useInteractableTokens } from '@cbhq/cds-common/hooks/useInteractableTokens';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { cx } from 'linaria';

import * as borderColors from '../styles/borderColor';
import * as borderRadii from '../styles/borderRadius';
import * as borderWidths from '../styles/borderWidth';
import { focusRing } from '../styles/focus';
import {
  interactable,
  interactableBackground,
  interactableTransparent,
  interactableTransparentActive,
  disabledState,
  overlay,
  underlay,
  transparentChildren,
} from '../styles/interactable';
import { palette } from '../tokens';

export type InteractableInheritedProps = Omit<
  React.AllHTMLAttributes<Element>,
  'as' | 'className' | 'css' | 'style'
>;

export interface InteractableProps extends InteractableBaseProps, InteractableInheritedProps {
  children: NonNullable<React.ReactNode>;
  /** Element or component to render the container as. */
  as:
    | 'a'
    | 'button'
    | 'input'
    | 'label'
    | 'select'
    | 'span'
    | 'textarea'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<any>;
  /** Apply class names to the outer container. */
  className?: string;
  /** Inject and wrap the content with overlay and underlay elements. */
  wrapWithLayeredElements?: boolean;
}

export const Interactable = forwardRef(function Interactable(
  {
    as: Container,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    children,
    className: customClassName,
    disabled,
    pressed,
    transparentWhileInactive,
    wrapWithLayeredElements,
    ...props
  }: InteractableProps,
  ref: React.Ref<Element>
) {
  const paletteConfig = usePaletteConfig();
  const spectrumAlias = backgroundColor === 'transparent' ? '' : paletteConfig[backgroundColor];
  const isControls = wrapWithLayeredElements || !spectrumAlias;
  const { underlayColor, hoverOpacity, pressedOpacity } = useInteractableTokens(backgroundColor);
  const className = cx(
    interactable,
    !isControls && !transparentWhileInactive ? interactableBackground : interactableTransparent,
    transparentWhileInactive && interactableTransparentActive,
    !wrapWithLayeredElements && transparentChildren,
    borderColor && borderColors[borderColor],
    borderRadius && borderRadii[borderRadius],
    borderWidth && borderWidths[borderWidth],
    disabled ? disabledState : focusRing,
    customClassName
  );
  const style = useMemo(
    () =>
      ({
        '--interactable-opacity-hovered': hoverOpacity,
        '--interactable-opacity-pressed': pressedOpacity,
        '--interactable-overlay': spectrumAlias ? (`var(--${spectrumAlias})` as const) : '',
        '--interactable-underlay': palette[underlayColor],
      } as React.CSSProperties),
    [hoverOpacity, pressedOpacity, spectrumAlias, underlayColor]
  );

  const content =
    disabled || !wrapWithLayeredElements ? (
      children
    ) : (
      <>
        <span
          className={cx(underlay, borderRadius && borderRadii[borderRadius])}
          role="presentation"
        />
        <span className={overlay}>{children}</span>
      </>
    );

  return createElement(
    Container,
    {
      'aria-pressed': pressed,
      ...props,
      className,
      disabled,
      style,
      ref,
    },
    content
  );
});
