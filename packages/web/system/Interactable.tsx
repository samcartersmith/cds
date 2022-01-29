import React, { createElement, forwardRef, useMemo } from 'react';
import { SharedProps, usePaletteConfig } from '@cbhq/cds-common';
import {
  ElevationChildrenProvider,
  ElevationProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { useInteractableBorderRadius } from '@cbhq/cds-common/hooks/useInteractableBorderRadius';
import { useInteractableTokens } from '@cbhq/cds-common/hooks/useInteractableTokens';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { useElevationStyles } from '../hooks/useElevationStyles';
import * as borderColors from '../styles/borderColor';
import * as borderWidths from '../styles/borderWidth';
import { focusRing } from '../styles/focus';
import {
  disabledState,
  fullWidth,
  interactable,
  interactableBackground,
  interactableTransparent,
  interactableTransparentActive,
  overlay,
  transparentChildren,
  underlay,
} from '../styles/interactable';
import { palette } from '../tokens';
import { cx } from '../utils/linaria';

export type InteractableInheritedProps = Omit<
  React.AllHTMLAttributes<Element>,
  'as' | 'className' | 'css'
>;

export type InteractableProps = {
  children: NonNullable<React.ReactNode>;
  /** Element or component to render the container as. */
  as:
    | 'a'
    | 'button'
    | 'div'
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
} & InteractableBaseProps &
  InteractableInheritedProps &
  SharedProps &
  SharedAccessibilityProps;

export const InteractableContent = forwardRef(function InteractableContent(
  {
    as: Container,
    backgroundColor,
    block,
    borderColor = 'transparent',
    borderRadius,
    borderWidth,
    children,
    className: customClassName,
    disabled,
    elevation,
    pressed,
    style: customStyle,
    testID,
    transparentWhileInactive,
    wrapWithLayeredElements,
    width,
    height,
    accessibilityLabel,
    ...props
  }: InteractableProps,
  ref: React.Ref<Element>,
) {
  const paletteConfig = usePaletteConfig();
  const elevationStyles = useElevationStyles(elevation);
  const spectrumAlias = backgroundColor === 'transparent' ? '' : paletteConfig[backgroundColor];
  const { underlayColor, hoverOpacity, pressedOpacity } = useInteractableTokens(backgroundColor);
  const borderRadiusValue = useInteractableBorderRadius(borderRadius);

  const backgroundStyles = useMemo(() => {
    // Transparent by default, opaque when interacted with
    if (transparentWhileInactive) {
      return [interactableTransparent, interactableTransparentActive];
    }
    // Always transparent
    if (!spectrumAlias) {
      return [interactableTransparent];
    }
    // Opaque and handles interactive states
    return [interactableBackground];
  }, [transparentWhileInactive, spectrumAlias]);

  const className = cx(
    interactable,
    ...backgroundStyles,
    !wrapWithLayeredElements && transparentChildren,
    borderColors[borderColor],
    borderWidth && borderWidths[borderWidth],
    disabled ? disabledState : focusRing,
    block && fullWidth,
    customClassName,
  );
  const style = useMemo(
    () =>
      ({
        ...customStyle,
        '--interactable-opacity-hovered': hoverOpacity,
        '--interactable-opacity-pressed': pressedOpacity,
        '--interactable-overlay': spectrumAlias ? (`var(--${spectrumAlias})` as const) : undefined,
        '--interactable-underlay': palette[underlayColor],
        '--interactable-border-radius': `${borderRadiusValue}px`,
        width,
        height,
        ...elevationStyles,
      } as React.CSSProperties),
    [
      borderRadiusValue,
      hoverOpacity,
      pressedOpacity,
      spectrumAlias,
      underlayColor,
      customStyle,
      elevationStyles,
      width,
      height,
    ],
  );

  const content =
    disabled || !wrapWithLayeredElements ? (
      children
    ) : (
      <>
        <span className={underlay} role="presentation" />
        <span className={overlay}>{children}</span>
      </>
    );

  return createElement(
    Container,
    {
      'aria-pressed': pressed,
      'data-testid': testID,
      'aria-label': accessibilityLabel,
      ...props,
      className,
      disabled,
      style,
      ref,
    },
    <ElevationChildrenProvider>{content}</ElevationChildrenProvider>,
  );
});

export const Interactable = forwardRef(function Interactable(
  { children, ...props }: InteractableProps,
  ref: React.Ref<Element>,
) {
  return (
    <ElevationProvider elevation={props?.elevation}>
      <InteractableContent ref={ref} {...props}>
        {children}
      </InteractableContent>
    </ElevationProvider>
  );
});
