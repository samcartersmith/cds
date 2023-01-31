import React, { createElement, forwardRef, useMemo } from 'react';
import { css } from 'linaria';
import { SharedProps, usePaletteConfig, useSpectrum } from '@cbhq/cds-common';
import {
  ElevationChildrenProvider,
  ElevationProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { useInteractableBorderRadius } from '@cbhq/cds-common/hooks/useInteractableBorderRadius';
import { paletteConfigToInteractableTokens } from '@cbhq/cds-common/palette/paletteConfigToInteractableTokens';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { usePalette } from '../hooks/usePalette';
import * as borderColors from '../styles/borderColor';
import * as borderWidths from '../styles/borderWidth';
import { disabledBorder, disabledState } from '../styles/disabledState';
import { focusRing } from '../styles/focus';
import { cx } from '../utils/linaria';

import {
  interactableBackground,
  interactableBorderRadius,
  interactableDisabledBackground,
  interactableHoveredBackground,
  interactableHoveredOpacity,
  interactableOpacity,
  interactablePressedBackground,
  interactablePressedOpacity,
} from './interactableCSSProperties';

const interactable = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  border-radius: var(${interactableBorderRadius});
  background-color: var(${interactableBackground});

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &:hover {
    background-color: var(${interactableHoveredBackground});
    > * {
      opacity: var(${interactableHoveredOpacity});
    }
  }

  &:active {
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }
`;

// Apply opacity to children as well
const transparentChildren = css`
  & > * {
    opacity: var(${interactableOpacity}, 1);
  }
`;

const fullWidth = css`
  display: block;
  width: 100%;
`;

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
    | React.ComponentType<React.PropsWithChildren<any>>;
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
    loading,
    pressed,
    style: customStyle,
    testID,
    transparentWhileInactive,
    wrapWithLayeredElements,
    width,
    height,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityHint,
    ...props
  }: InteractableProps,
  ref: React.Ref<Element>,
) {
  const palette = usePalette();
  const paletteConfig = usePaletteConfig();
  const elevationStyles = useElevationStyles(elevation);
  const spectrum = useSpectrum();
  const {
    disabled: disabledToken,
    pressed: pressedToken,
    hovered: hoveredToken,
  } = paletteConfigToInteractableTokens({
    paletteConfig,
    spectrum,
    isWeb: true,
  })[backgroundColor];
  const borderRadiusValue = useInteractableBorderRadius(borderRadius);

  /**
   * this variable should only be used when conditionally rendering the disabled DOM attribute
   */
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const shouldBeDisabled = loading || disabled;

  const className = cx(
    interactable,
    !wrapWithLayeredElements && transparentChildren,
    disabled ? disabledState : focusRing,
    disabled && borderColor === 'transparent' ? disabledBorder : null,
    transparentWhileInactive ? borderColors.transparent : borderColors[borderColor],
    borderWidth && borderWidths[borderWidth],
    block && fullWidth,
    customClassName,
  );

  const style = useMemo(
    () => ({
      ...customStyle,
      [interactableBorderRadius]: `${borderRadiusValue}px`,
      [interactableBackground]: transparentWhileInactive ? 'transparent' : palette[backgroundColor],
      // Hover:
      [interactableHoveredBackground]: hoveredToken ? hoveredToken.backgroundColor : undefined,
      [interactableHoveredOpacity]: hoveredToken ? hoveredToken.contentOpacity : undefined,
      // Pressed:
      [interactablePressedBackground]: pressedToken.backgroundColor,
      [interactablePressedOpacity]: pressedToken.contentOpacity,
      // Disabled:
      [interactableDisabledBackground]: disabledToken.backgroundColor,
      width,
      height,
      ...elevationStyles,
    }),
    [
      backgroundColor,
      borderRadiusValue,
      customStyle,
      disabledToken.backgroundColor,
      elevationStyles,
      height,
      hoveredToken,
      palette,
      pressedToken.backgroundColor,
      pressedToken.contentOpacity,
      transparentWhileInactive,
      width,
    ],
  );

  return createElement(
    Container,
    {
      'aria-pressed': pressed,
      'data-testid': testID,
      'aria-label': accessibilityLabel,
      'aria-labelledby': accessibilityLabelledBy,
      'aria-describedby': accessibilityHint,
      ...props,
      className,
      disabled: shouldBeDisabled,
      style,
      ref,
    },
    <ElevationChildrenProvider>{children}</ElevationChildrenProvider>,
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
