/**
 * These styles are used to power component style props.
 */
import { type LinariaClassName, css } from '@linaria/core';

import type { DynamicStyleProps } from './styleProps';
import type * as vars from './vars';

export const dynamic: Record<keyof DynamicStyleProps, LinariaClassName> = {
  width: css`
    width: var(--width);
  `,
  height: css`
    height: var(--height);
  `,
  minWidth: css`
    min-width: var(--minWidth);
  `,
  minHeight: css`
    min-height: var(--minHeight);
  `,
  maxWidth: css`
    max-width: var(--maxWidth);
  `,
  maxHeight: css`
    max-height: var(--maxHeight);
  `,
  aspectRatio: css`
    aspect-ratio: var(--aspectRatio);
  `,
  top: css`
    top: var(--top);
  `,
  bottom: css`
    bottom: var(--bottom);
  `,
  left: css`
    left: var(--left);
  `,
  right: css`
    right: var(--right);
  `,
  transform: css`
    transform: var(--transform);
  `,
  flexBasis: css`
    flex-basis: var(--flexBasis);
  `,
  flexShrink: css`
    flex-shrink: var(--flexShrink);
  `,
  flexGrow: css`
    flex-grow: var(--flexGrow);
  `,
  gridTemplateColumns: css`
    grid-template-columns: var(--gridTemplateColumns);
  `,
  gridTemplateRows: css`
    grid-template-rows: var(--gridTemplateRows);
  `,
  gridTemplateAreas: css`
    grid-template-areas: var(--gridTemplateAreas);
  `,
  gridTemplate: css`
    grid-template: var(--gridTemplate);
  `,
  gridAutoColumns: css`
    grid-auto-columns: var(--gridAutoColumns);
  `,
  gridAutoRows: css`
    grid-auto-rows: var(--gridAutoRows);
  `,
  gridAutoFlow: css`
    grid-auto-flow: var(--gridAutoFlow);
  `,
  grid: css`
    grid: var(--grid);
  `,
  gridRowStart: css`
    grid-row-start: var(--gridRowStart);
  `,
  gridColumnStart: css`
    grid-column-start: var(--gridColumnStart);
  `,
  gridRowEnd: css`
    grid-row-end: var(--gridRowEnd);
  `,
  gridColumnEnd: css`
    grid-column-end: var(--gridColumnEnd);
  `,
  gridRow: css`
    grid-row: var(--gridRow);
  `,
  gridColumn: css`
    grid-column: var(--gridColumn);
  `,
  gridArea: css`
    grid-area: var(--gridArea);
  `,
  opacity: css`
    opacity: var(--opacity);
  `,
} as const;

// TO DO: should we add values for currentcolor?
export const color: Record<keyof typeof vars.color, LinariaClassName> = {
  // Text
  textForeground: css`
    color: var(--color-textForeground);
  `,
  textForegroundInverse: css`
    color: var(--color-textForegroundInverse);
  `,
  textForegroundMuted: css`
    color: var(--color-textForegroundMuted);
  `,
  textPrimary: css`
    color: var(--color-textPrimary);
  `,
  textPositive: css`
    color: var(--color-textPositive);
  `,
  textNegative: css`
    color: var(--color-textNegative);
  `,
  textWarning: css`
    color: var(--color-textWarning);
  `,
  // Background
  background: css`
    color: var(--color-background);
  `,
  backgroundAlternate: css`
    color: var(--color-backgroundAlternate);
  `,
  backgroundInverse: css`
    color: var(--color-backgroundInverse);
  `,
  backgroundOverlay: css`
    color: var(--color-backgroundOverlay);
  `,
  backgroundPrimary: css`
    color: var(--color-backgroundPrimary);
  `,
  backgroundPrimaryWash: css`
    color: var(--color-backgroundPrimaryWash);
  `,
  backgroundSecondary: css`
    color: var(--color-backgroundSecondary);
  `,
  backgroundSecondaryWash: css`
    color: var(--color-backgroundSecondaryWash);
  `,
  backgroundNegative: css`
    color: var(--color-backgroundNegative);
  `,
  backgroundNegativeWash: css`
    color: var(--color-backgroundNegativeWash);
  `,
  backgroundPositive: css`
    color: var(--color-backgroundPositive);
  `,
  backgroundPositiveWash: css`
    color: var(--color-backgroundPositiveWash);
  `,
  backgroundWarning: css`
    color: var(--color-backgroundWarning);
  `,
  backgroundWarningWash: css`
    color: var(--color-backgroundWarningWash);
  `,
  currentColor: css`
    color: var(--color-currentColor);
  `,
  // Background states
  backgroundPrimaryHover: css`
    color: var(--color-backgroundPrimaryHover);
  `,
  backgroundPrimaryPressed: css`
    color: var(--color-backgroundPrimaryPressed);
  `,
  backgroundPrimaryDisabled: css`
    color: var(--color-backgroundPrimaryDisabled);
  `,
  backgroundSecondaryHover: css`
    color: var(--color-backgroundSecondaryHover);
  `,
  backgroundSecondaryPressed: css`
    color: var(--color-backgroundSecondaryPressed);
  `,
  backgroundSecondaryDisabled: css`
    color: var(--color-backgroundSecondaryDisabled);
  `,
  backgroundNegativeHover: css`
    color: var(--color-backgroundNegativeHover);
  `,
  backgroundNegativePressed: css`
    color: var(--color-backgroundNegativePressed);
  `,
  backgroundNegativeDisabled: css`
    color: var(--color-backgroundNegativeDisabled);
  `,
  backgroundPositiveHover: css`
    color: var(--color-backgroundPositiveHover);
  `,
  backgroundPositivePressed: css`
    color: var(--color-backgroundPositivePressed);
  `,
  backgroundPositiveDisabled: css`
    color: var(--color-backgroundPositiveDisabled);
  `,
  // Line
  line: css`
    color: var(--color-line);
  `,
  lineInverse: css`
    color: var(--color-lineInverse);
  `,
  lineHeavy: css`
    color: var(--color-lineHeavy);
  `,
  linePrimary: css`
    color: var(--color-linePrimary);
  `,
  linePrimaryLight: css`
    color: var(--color-linePrimaryLight);
  `,
  // Elevation
  backgroundElevation1: css`
    color: var(--color-backgroundElevation1);
  `,
  backgroundElevation2: css`
    color: var(--color-backgroundElevation2);
  `,
  // Icon
  iconForeground: css`
    color: var(--color-iconForeground);
  `,
  iconForegroundInverse: css`
    color: var(--color-iconForegroundInverse);
  `,
  iconForegroundMuted: css`
    color: var(--color-iconForegroundMuted);
  `,
  iconPrimary: css`
    color: var(--color-iconPrimary);
  `,
  iconPositive: css`
    color: var(--color-iconPositive);
  `,
  iconNegative: css`
    color: var(--color-iconNegative);
  `,
  iconWarning: css`
    color: var(--color-iconWarning);
  `,
  // Accent
  accentSubtleGreen: css`
    color: var(--color-accentSubtleGreen);
  `,
  accentBoldGreen: css`
    color: var(--color-accentBoldGreen);
  `,
  accentSubtleBlue: css`
    color: var(--color-accentSubtleBlue);
  `,
  accentBoldBlue: css`
    color: var(--color-accentBoldBlue);
  `,
  accentSubtlePurple: css`
    color: var(--color-accentSubtlePurple);
  `,
  accentBoldPurple: css`
    color: var(--color-accentBoldPurple);
  `,
  accentSubtleYellow: css`
    color: var(--color-accentSubtleYellow);
  `,
  accentBoldYellow: css`
    color: var(--color-accentBoldYellow);
  `,
  accentSubtleRed: css`
    color: var(--color-accentSubtleRed);
  `,
  accentBoldRed: css`
    color: var(--color-accentBoldRed);
  `,
  accentSubtleGray: css`
    color: var(--color-accentSubtleGray);
  `,
  accentBoldGray: css`
    color: var(--color-accentBoldGray);
  `,
  transparent: css`
    color: var(--color-transparent);
  `,
  transparentHover: css`
    color: var(--color-transparentHover);
  `,
  transparentPressed: css`
    color: var(--color-transparentPressed);
  `,
  transparentDisabled: css`
    color: var(--color-transparentDisabled);
  `,
} as const;

export const background: Record<keyof typeof vars.color, LinariaClassName> = {
  // Text
  textForeground: css`
    background-color: var(--color-textForeground);
  `,
  textForegroundInverse: css`
    background-color: var(--color-textForegroundInverse);
  `,
  textForegroundMuted: css`
    background-color: var(--color-textForegroundMuted);
  `,
  textPrimary: css`
    background-color: var(--color-textPrimary);
  `,
  textPositive: css`
    background-color: var(--color-textPositive);
  `,
  textNegative: css`
    background-color: var(--color-textNegative);
  `,
  textWarning: css`
    background-color: var(--color-textWarning);
  `,
  // Background
  background: css`
    background-color: var(--color-background);
  `,
  backgroundAlternate: css`
    background-color: var(--color-backgroundAlternate);
  `,
  backgroundInverse: css`
    background-color: var(--color-backgroundInverse);
  `,
  backgroundOverlay: css`
    background-color: var(--color-backgroundOverlay);
  `,
  backgroundPrimary: css`
    background-color: var(--color-backgroundPrimary);
  `,
  backgroundPrimaryWash: css`
    background-color: var(--color-backgroundPrimaryWash);
  `,
  backgroundSecondary: css`
    background-color: var(--color-backgroundSecondary);
  `,
  backgroundSecondaryWash: css`
    background-color: var(--color-backgroundSecondaryWash);
  `,
  backgroundNegative: css`
    background-color: var(--color-backgroundNegative);
  `,
  backgroundNegativeWash: css`
    background-color: var(--color-backgroundNegativeWash);
  `,
  backgroundPositive: css`
    background-color: var(--color-backgroundPositive);
  `,
  backgroundPositiveWash: css`
    background-color: var(--color-backgroundPositiveWash);
  `,
  backgroundWarning: css`
    background-color: var(--color-backgroundWarning);
  `,
  backgroundWarningWash: css`
    background-color: var(--color-backgroundWarningWash);
  `,
  currentColor: css`
    background-color: var(--color-currentColor);
  `,
  // Background states
  backgroundPrimaryHover: css`
    background-color: var(--color-backgroundPrimaryHover);
  `,
  backgroundPrimaryPressed: css`
    background-color: var(--color-backgroundPrimaryPressed);
  `,
  backgroundPrimaryDisabled: css`
    background-color: var(--color-backgroundPrimaryDisabled);
  `,
  backgroundSecondaryHover: css`
    background-color: var(--color-backgroundSecondaryHover);
  `,
  backgroundSecondaryPressed: css`
    background-color: var(--color-backgroundSecondaryPressed);
  `,
  backgroundSecondaryDisabled: css`
    background-color: var(--color-backgroundSecondaryDisabled);
  `,
  backgroundNegativeHover: css`
    background-color: var(--color-backgroundNegativeHover);
  `,
  backgroundNegativePressed: css`
    background-color: var(--color-backgroundNegativePressed);
  `,
  backgroundNegativeDisabled: css`
    background-color: var(--color-backgroundNegativeDisabled);
  `,
  backgroundPositiveHover: css`
    background-color: var(--color-backgroundPositiveHover);
  `,
  backgroundPositivePressed: css`
    background-color: var(--color-backgroundPositivePressed);
  `,
  backgroundPositiveDisabled: css`
    background-color: var(--color-backgroundPositiveDisabled);
  `,
  // Line
  line: css`
    background-color: var(--color-line);
  `,
  lineInverse: css`
    background-color: var(--color-lineInverse);
  `,
  lineHeavy: css`
    background-color: var(--color-lineHeavy);
  `,
  linePrimary: css`
    background-color: var(--color-linePrimary);
  `,
  linePrimaryLight: css`
    background-color: var(--color-linePrimaryLight);
  `,
  // Elevation
  backgroundElevation1: css`
    background-color: var(--color-backgroundElevation1);
  `,
  backgroundElevation2: css`
    background-color: var(--color-backgroundElevation2);
  `,
  // Icon
  iconForeground: css`
    background-color: var(--color-iconForeground);
  `,
  iconForegroundInverse: css`
    background-color: var(--color-iconForegroundInverse);
  `,
  iconForegroundMuted: css`
    background-color: var(--color-iconForegroundMuted);
  `,
  iconPrimary: css`
    background-color: var(--color-iconPrimary);
  `,
  iconPositive: css`
    background-color: var(--color-iconPositive);
  `,
  iconNegative: css`
    background-color: var(--color-iconNegative);
  `,
  iconWarning: css`
    background-color: var(--color-iconWarning);
  `,
  // Accent
  accentSubtleGreen: css`
    background-color: var(--color-accentSubtleGreen);
  `,
  accentBoldGreen: css`
    background-color: var(--color-accentBoldGreen);
  `,
  accentSubtleBlue: css`
    background-color: var(--color-accentSubtleBlue);
  `,
  accentBoldBlue: css`
    background-color: var(--color-accentBoldBlue);
  `,
  accentSubtlePurple: css`
    background-color: var(--color-accentSubtlePurple);
  `,
  accentBoldPurple: css`
    background-color: var(--color-accentBoldPurple);
  `,
  accentSubtleYellow: css`
    background-color: var(--color-accentSubtleYellow);
  `,
  accentBoldYellow: css`
    background-color: var(--color-accentBoldYellow);
  `,
  accentSubtleRed: css`
    background-color: var(--color-accentSubtleRed);
  `,
  accentBoldRed: css`
    background-color: var(--color-accentBoldRed);
  `,
  accentSubtleGray: css`
    background-color: var(--color-accentSubtleGray);
  `,
  accentBoldGray: css`
    background-color: var(--color-accentBoldGray);
  `,
  transparent: css`
    background-color: var(--color-transparent);
  `,
  transparentHover: css`
    background-color: var(--color-transparentHover);
  `,
  transparentPressed: css`
    background-color: var(--color-transparentPressed);
  `,
  transparentDisabled: css`
    background-color: var(--color-transparentDisabled);
  `,
} as const;

export const borderColor: Record<keyof typeof vars.color, LinariaClassName> = {
  // Text
  textForeground: css`
    border-style: solid;
    border-color: var(--color-textForeground);
  `,
  textForegroundInverse: css`
    border-style: solid;
    border-color: var(--color-textForegroundInverse);
  `,
  textForegroundMuted: css`
    border-style: solid;
    border-color: var(--color-textForegroundMuted);
  `,
  textPrimary: css`
    border-style: solid;
    border-color: var(--color-textPrimary);
  `,
  textPositive: css`
    border-style: solid;
    border-color: var(--color-textPositive);
  `,
  textNegative: css`
    border-style: solid;
    border-color: var(--color-textNegative);
  `,
  textWarning: css`
    border-style: solid;
    border-color: var(--color-textWarning);
  `,
  // Background
  background: css`
    border-style: solid;
    border-color: var(--color-background);
  `,
  backgroundAlternate: css`
    border-style: solid;
    border-color: var(--color-backgroundAlternate);
  `,
  backgroundInverse: css`
    border-style: solid;
    border-color: var(--color-backgroundInverse);
  `,
  backgroundOverlay: css`
    border-style: solid;
    border-color: var(--color-backgroundOverlay);
  `,
  backgroundPrimary: css`
    border-style: solid;
    border-color: var(--color-backgroundPrimary);
  `,
  backgroundPrimaryWash: css`
    border-style: solid;
    border-color: var(--color-backgroundPrimaryWash);
  `,
  backgroundSecondary: css`
    border-style: solid;
    border-color: var(--color-backgroundSecondary);
  `,
  backgroundSecondaryWash: css`
    border-style: solid;
    border-color: var(--color-backgroundSecondaryWash);
  `,
  backgroundNegative: css`
    border-style: solid;
    border-color: var(--color-backgroundNegative);
  `,
  backgroundNegativeWash: css`
    border-style: solid;
    border-color: var(--color-backgroundNegativeWash);
  `,
  backgroundPositive: css`
    border-style: solid;
    border-color: var(--color-backgroundPositive);
  `,
  backgroundPositiveWash: css`
    border-style: solid;
    border-color: var(--color-backgroundPositiveWash);
  `,
  backgroundWarning: css`
    border-style: solid;
    border-color: var(--color-backgroundWarning);
  `,
  backgroundWarningWash: css`
    border-style: solid;
    border-color: var(--color-backgroundWarningWash);
  `,
  currentColor: css`
    border-style: solid;
    border-color: var(--color-currentColor);
  `,
  // Background states
  backgroundPrimaryHover: css`
    border-style: solid;
    border-color: var(--color-backgroundPrimaryHover);
  `,
  backgroundPrimaryPressed: css`
    border-style: solid;
    border-color: var(--color-backgroundPrimaryPressed);
  `,
  backgroundPrimaryDisabled: css`
    border-style: solid;
    border-color: var(--color-backgroundPrimaryDisabled);
  `,
  backgroundSecondaryHover: css`
    border-style: solid;
    border-color: var(--color-backgroundSecondaryHover);
  `,
  backgroundSecondaryPressed: css`
    border-style: solid;
    border-color: var(--color-backgroundSecondaryPressed);
  `,
  backgroundSecondaryDisabled: css`
    border-style: solid;
    border-color: var(--color-backgroundSecondaryDisabled);
  `,
  backgroundNegativeHover: css`
    border-style: solid;
    border-color: var(--color-backgroundNegativeHover);
  `,
  backgroundNegativePressed: css`
    border-style: solid;
    border-color: var(--color-backgroundNegativePressed);
  `,
  backgroundNegativeDisabled: css`
    border-style: solid;
    border-color: var(--color-backgroundNegativeDisabled);
  `,
  backgroundPositiveHover: css`
    border-style: solid;
    border-color: var(--color-backgroundPositiveHover);
  `,
  backgroundPositivePressed: css`
    border-style: solid;
    border-color: var(--color-backgroundPositivePressed);
  `,
  backgroundPositiveDisabled: css`
    border-style: solid;
    border-color: var(--color-backgroundPositiveDisabled);
  `,
  // Line
  line: css`
    border-style: solid;
    border-color: var(--color-line);
  `,
  lineInverse: css`
    border-style: solid;
    border-color: var(--color-lineInverse);
  `,
  lineHeavy: css`
    border-style: solid;
    border-color: var(--color-lineHeavy);
  `,
  linePrimary: css`
    border-style: solid;
    border-color: var(--color-linePrimary);
  `,
  linePrimaryLight: css`
    border-style: solid;
    border-color: var(--color-linePrimaryLight);
  `,
  // Elevation
  backgroundElevation1: css`
    border-style: solid;
    border-color: var(--color-backgroundElevation1);
  `,
  backgroundElevation2: css`
    border-style: solid;
    border-color: var(--color-backgroundElevation2);
  `,
  // Icon
  iconForeground: css`
    border-style: solid;
    border-color: var(--color-iconForeground);
  `,
  iconForegroundInverse: css`
    border-style: solid;
    border-color: var(--color-iconForegroundInverse);
  `,
  iconForegroundMuted: css`
    border-style: solid;
    border-color: var(--color-iconForegroundMuted);
  `,
  iconPrimary: css`
    border-style: solid;
    border-color: var(--color-iconPrimary);
  `,
  iconPositive: css`
    border-style: solid;
    border-color: var(--color-iconPositive);
  `,
  iconNegative: css`
    border-style: solid;
    border-color: var(--color-iconNegative);
  `,
  iconWarning: css`
    border-style: solid;
    border-color: var(--color-iconWarning);
  `,
  // Accent
  accentSubtleGreen: css`
    border-style: solid;
    border-color: var(--color-accentSubtleGreen);
  `,
  accentBoldGreen: css`
    border-style: solid;
    border-color: var(--color-accentBoldGreen);
  `,
  accentSubtleBlue: css`
    border-style: solid;
    border-color: var(--color-accentSubtleBlue);
  `,
  accentBoldBlue: css`
    border-style: solid;
    border-color: var(--color-accentBoldBlue);
  `,
  accentSubtlePurple: css`
    border-style: solid;
    border-color: var(--color-accentSubtlePurple);
  `,
  accentBoldPurple: css`
    border-style: solid;
    border-color: var(--color-accentBoldPurple);
  `,
  accentSubtleYellow: css`
    border-style: solid;
    border-color: var(--color-accentSubtleYellow);
  `,
  accentBoldYellow: css`
    border-style: solid;
    border-color: var(--color-accentBoldYellow);
  `,
  accentSubtleRed: css`
    border-style: solid;
    border-color: var(--color-accentSubtleRed);
  `,
  accentBoldRed: css`
    border-style: solid;
    border-color: var(--color-accentBoldRed);
  `,
  accentSubtleGray: css`
    border-style: solid;
    border-color: var(--color-accentSubtleGray);
  `,
  accentBoldGray: css`
    border-style: solid;
    border-color: var(--color-accentBoldGray);
  `,
  transparent: css`
    border-style: solid;
    border-color: var(--color-transparent);
  `,
  transparentHover: css`
    border-style: solid;
    border-color: var(--color-transparentHover);
  `,
  transparentPressed: css`
    border-style: solid;
    border-color: var(--color-transparentPressed);
  `,
  transparentDisabled: css`
    border-style: solid;
    border-color: var(--color-transparentDisabled);
  `,
} as const;

export const hoverColor: Record<keyof typeof vars.color, LinariaClassName> = {
  // Text
  textForeground: css`
    &:hover {
      color: var(--color-textForeground);
    }
  `,
  textForegroundInverse: css`
    &:hover {
      color: var(--color-textForegroundInverse);
    }
  `,
  textForegroundMuted: css`
    &:hover {
      color: var(--color-textForegroundMuted);
    }
  `,
  textPrimary: css`
    &:hover {
      color: var(--color-textPrimary);
    }
  `,
  textPositive: css`
    &:hover {
      color: var(--color-textPositive);
    }
  `,
  textNegative: css`
    &:hover {
      color: var(--color-textNegative);
    }
  `,
  textWarning: css`
    &:hover {
      color: var(--color-textWarning);
    }
  `,
  // Background
  background: css`
    &:hover {
      color: var(--color-background);
    }
  `,
  backgroundAlternate: css`
    &:hover {
      color: var(--color-backgroundAlternate);
    }
  `,
  backgroundInverse: css`
    &:hover {
      color: var(--color-backgroundInverse);
    }
  `,
  backgroundOverlay: css`
    &:hover {
      color: var(--color-backgroundOverlay);
    }
  `,
  backgroundPrimary: css`
    &:hover {
      color: var(--color-backgroundPrimary);
    }
  `,
  backgroundPrimaryWash: css`
    &:hover {
      color: var(--color-backgroundPrimaryWash);
    }
  `,
  backgroundSecondary: css`
    &:hover {
      color: var(--color-backgroundSecondary);
    }
  `,
  backgroundSecondaryWash: css`
    &:hover {
      color: var(--color-backgroundSecondaryWash);
    }
  `,
  backgroundNegative: css`
    &:hover {
      color: var(--color-backgroundNegative);
    }
  `,
  backgroundNegativeWash: css`
    &:hover {
      color: var(--color-backgroundNegativeWash);
    }
  `,
  backgroundPositive: css`
    &:hover {
      color: var(--color-backgroundPositive);
    }
  `,
  backgroundPositiveWash: css`
    &:hover {
      color: var(--color-backgroundPositiveWash);
    }
  `,
  backgroundWarning: css`
    &:hover {
      color: var(--color-backgroundWarning);
    }
  `,
  backgroundWarningWash: css`
    &:hover {
      color: var(--color-backgroundWarningWash);
    }
  `,
  currentColor: css`
    &:hover {
      color: var(--color-currentColor);
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    &:hover {
      color: var(--color-backgroundPrimaryHover);
    }
  `,
  backgroundPrimaryPressed: css`
    &:hover {
      color: var(--color-backgroundPrimaryPressed);
    }
  `,
  backgroundPrimaryDisabled: css`
    &:hover {
      color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondaryHover: css`
    &:hover {
      color: var(--color-backgroundSecondaryHover);
    }
  `,
  backgroundSecondaryPressed: css`
    &:hover {
      color: var(--color-backgroundSecondaryPressed);
    }
  `,
  backgroundSecondaryDisabled: css`
    &:hover {
      color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegativeHover: css`
    &:hover {
      color: var(--color-backgroundNegativeHover);
    }
  `,
  backgroundNegativePressed: css`
    &:hover {
      color: var(--color-backgroundNegativePressed);
    }
  `,
  backgroundNegativeDisabled: css`
    &:hover {
      color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositiveHover: css`
    &:hover {
      color: var(--color-backgroundPositiveHover);
    }
  `,
  backgroundPositivePressed: css`
    &:hover {
      color: var(--color-backgroundPositivePressed);
    }
  `,
  backgroundPositiveDisabled: css`
    &:hover {
      color: var(--color-backgroundPositiveDisabled);
    }
  `,
  // Line
  line: css`
    &:hover {
      color: var(--color-line);
    }
  `,
  lineInverse: css`
    &:hover {
      color: var(--color-lineInverse);
    }
  `,
  lineHeavy: css`
    &:hover {
      color: var(--color-lineHeavy);
    }
  `,
  linePrimary: css`
    &:hover {
      color: var(--color-linePrimary);
    }
  `,
  linePrimaryLight: css`
    &:hover {
      color: var(--color-linePrimaryLight);
    }
  `,
  // Elevation
  backgroundElevation1: css`
    &:hover {
      color: var(--color-backgroundElevation1);
    }
  `,
  backgroundElevation2: css`
    &:hover {
      color: var(--color-backgroundElevation2);
    }
  `,
  // Icon
  iconForeground: css`
    &:hover {
      color: var(--color-iconForeground);
    }
  `,
  iconForegroundInverse: css`
    &:hover {
      color: var(--color-iconForegroundInverse);
    }
  `,
  iconForegroundMuted: css`
    &:hover {
      color: var(--color-iconForegroundMuted);
    }
  `,
  iconPrimary: css`
    &:hover {
      color: var(--color-iconPrimary);
    }
  `,
  iconPositive: css`
    &:hover {
      color: var(--color-iconPositive);
    }
  `,
  iconNegative: css`
    &:hover {
      color: var(--color-iconNegative);
    }
  `,
  iconWarning: css`
    &:hover {
      color: var(--color-iconWarning);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    &:hover {
      color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    &:hover {
      color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    &:hover {
      color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    &:hover {
      color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    &:hover {
      color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    &:hover {
      color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    &:hover {
      color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    &:hover {
      color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    &:hover {
      color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    &:hover {
      color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    &:hover {
      color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    &:hover {
      color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    &:hover {
      color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    &:hover {
      color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    &:hover {
      color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    &:hover {
      color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const hoverBackground: Record<keyof typeof vars.color, LinariaClassName> = {
  // Text
  textForeground: css`
    &:hover {
      background-color: var(--color-textForeground);
    }
  `,
  textForegroundInverse: css`
    &:hover {
      background-color: var(--color-textForegroundInverse);
    }
  `,
  textForegroundMuted: css`
    &:hover {
      background-color: var(--color-textForegroundMuted);
    }
  `,
  textPrimary: css`
    &:hover {
      background-color: var(--color-textPrimary);
    }
  `,
  textPositive: css`
    &:hover {
      background-color: var(--color-textPositive);
    }
  `,
  textNegative: css`
    &:hover {
      background-color: var(--color-textNegative);
    }
  `,
  textWarning: css`
    &:hover {
      background-color: var(--color-textWarning);
    }
  `,
  // Background
  background: css`
    &:hover {
      background-color: var(--color-background);
    }
  `,
  backgroundAlternate: css`
    &:hover {
      background-color: var(--color-backgroundAlternate);
    }
  `,
  backgroundInverse: css`
    &:hover {
      background-color: var(--color-backgroundInverse);
    }
  `,
  backgroundOverlay: css`
    &:hover {
      background-color: var(--color-backgroundOverlay);
    }
  `,
  backgroundPrimary: css`
    &:hover {
      background-color: var(--color-backgroundPrimary);
    }
  `,
  backgroundPrimaryWash: css`
    &:hover {
      background-color: var(--color-backgroundPrimaryWash);
    }
  `,
  backgroundSecondary: css`
    &:hover {
      background-color: var(--color-backgroundSecondary);
    }
  `,
  backgroundSecondaryWash: css`
    &:hover {
      background-color: var(--color-backgroundSecondaryWash);
    }
  `,
  backgroundNegative: css`
    &:hover {
      background-color: var(--color-backgroundNegative);
    }
  `,
  backgroundNegativeWash: css`
    &:hover {
      background-color: var(--color-backgroundNegativeWash);
    }
  `,
  backgroundPositive: css`
    &:hover {
      background-color: var(--color-backgroundPositive);
    }
  `,
  backgroundPositiveWash: css`
    &:hover {
      background-color: var(--color-backgroundPositiveWash);
    }
  `,
  backgroundWarning: css`
    &:hover {
      background-color: var(--color-backgroundWarning);
    }
  `,
  backgroundWarningWash: css`
    &:hover {
      background-color: var(--color-backgroundWarningWash);
    }
  `,
  currentColor: css`
    &:hover {
      background-color: var(--color-currentColor);
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    &:hover {
      background-color: var(--color-backgroundPrimaryHover);
    }
  `,
  backgroundPrimaryPressed: css`
    &:hover {
      background-color: var(--color-backgroundPrimaryPressed);
    }
  `,
  backgroundPrimaryDisabled: css`
    &:hover {
      background-color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondaryHover: css`
    &:hover {
      background-color: var(--color-backgroundSecondaryHover);
    }
  `,
  backgroundSecondaryPressed: css`
    &:hover {
      background-color: var(--color-backgroundSecondaryPressed);
    }
  `,
  backgroundSecondaryDisabled: css`
    &:hover {
      background-color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegativeHover: css`
    &:hover {
      background-color: var(--color-backgroundNegativeHover);
    }
  `,
  backgroundNegativePressed: css`
    &:hover {
      background-color: var(--color-backgroundNegativePressed);
    }
  `,
  backgroundNegativeDisabled: css`
    &:hover {
      background-color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositiveHover: css`
    &:hover {
      background-color: var(--color-backgroundPositiveHover);
    }
  `,
  backgroundPositivePressed: css`
    &:hover {
      background-color: var(--color-backgroundPositivePressed);
    }
  `,
  backgroundPositiveDisabled: css`
    &:hover {
      background-color: var(--color-backgroundPositiveDisabled);
    }
  `,
  // Line
  line: css`
    &:hover {
      background-color: var(--color-line);
    }
  `,
  lineInverse: css`
    &:hover {
      background-color: var(--color-lineInverse);
    }
  `,
  lineHeavy: css`
    &:hover {
      background-color: var(--color-lineHeavy);
    }
  `,
  linePrimary: css`
    &:hover {
      background-color: var(--color-linePrimary);
    }
  `,
  linePrimaryLight: css`
    &:hover {
      background-color: var(--color-linePrimaryLight);
    }
  `,
  // Elevation
  backgroundElevation1: css`
    &:hover {
      background-color: var(--color-backgroundElevation1);
    }
  `,
  backgroundElevation2: css`
    &:hover {
      background-color: var(--color-backgroundElevation2);
    }
  `,
  // Icon
  iconForeground: css`
    &:hover {
      background-color: var(--color-iconForeground);
    }
  `,
  iconForegroundInverse: css`
    &:hover {
      background-color: var(--color-iconForegroundInverse);
    }
  `,
  iconForegroundMuted: css`
    &:hover {
      background-color: var(--color-iconForegroundMuted);
    }
  `,
  iconPrimary: css`
    &:hover {
      background-color: var(--color-iconPrimary);
    }
  `,
  iconPositive: css`
    &:hover {
      background-color: var(--color-iconPositive);
    }
  `,
  iconNegative: css`
    &:hover {
      background-color: var(--color-iconNegative);
    }
  `,
  iconWarning: css`
    &:hover {
      background-color: var(--color-iconWarning);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    &:hover {
      background-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    &:hover {
      background-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    &:hover {
      background-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    &:hover {
      background-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    &:hover {
      background-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    &:hover {
      background-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    &:hover {
      background-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    &:hover {
      background-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    &:hover {
      background-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    &:hover {
      background-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    &:hover {
      background-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    &:hover {
      background-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    &:hover {
      background-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    &:hover {
      background-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    &:hover {
      background-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    &:hover {
      background-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const hoverBorderColor: Record<keyof typeof vars.color, LinariaClassName> = {
  // Text
  textForeground: css`
    &:hover {
      border-color: var(--color-textForeground);
    }
  `,
  textForegroundInverse: css`
    &:hover {
      border-color: var(--color-textForegroundInverse);
    }
  `,
  textForegroundMuted: css`
    &:hover {
      border-color: var(--color-textForegroundMuted);
    }
  `,
  textPrimary: css`
    &:hover {
      border-color: var(--color-textPrimary);
    }
  `,
  textPositive: css`
    &:hover {
      border-color: var(--color-textPositive);
    }
  `,
  textNegative: css`
    &:hover {
      border-color: var(--color-textNegative);
    }
  `,
  textWarning: css`
    &:hover {
      border-color: var(--color-textWarning);
    }
  `,
  // Background
  background: css`
    &:hover {
      border-color: var(--color-background);
    }
  `,
  backgroundAlternate: css`
    &:hover {
      border-color: var(--color-backgroundAlternate);
    }
  `,
  backgroundInverse: css`
    &:hover {
      border-color: var(--color-backgroundInverse);
    }
  `,
  backgroundOverlay: css`
    &:hover {
      border-color: var(--color-backgroundOverlay);
    }
  `,
  backgroundPrimary: css`
    &:hover {
      border-color: var(--color-backgroundPrimary);
    }
  `,
  backgroundPrimaryWash: css`
    &:hover {
      border-color: var(--color-backgroundPrimaryWash);
    }
  `,
  backgroundSecondary: css`
    &:hover {
      border-color: var(--color-backgroundSecondary);
    }
  `,
  backgroundSecondaryWash: css`
    &:hover {
      border-color: var(--color-backgroundSecondaryWash);
    }
  `,
  backgroundNegative: css`
    &:hover {
      border-color: var(--color-backgroundNegative);
    }
  `,
  backgroundNegativeWash: css`
    &:hover {
      border-color: var(--color-backgroundNegativeWash);
    }
  `,
  backgroundPositive: css`
    &:hover {
      border-color: var(--color-backgroundPositive);
    }
  `,
  backgroundPositiveWash: css`
    &:hover {
      border-color: var(--color-backgroundPositiveWash);
    }
  `,
  backgroundWarning: css`
    &:hover {
      border-color: var(--color-backgroundWarning);
    }
  `,
  backgroundWarningWash: css`
    &:hover {
      border-color: var(--color-backgroundWarningWash);
    }
  `,
  currentColor: css`
    &:hover {
      border-color: var(--color-currentColor);
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    &:hover {
      border-color: var(--color-backgroundPrimaryHover);
    }
  `,
  backgroundPrimaryPressed: css`
    &:hover {
      border-color: var(--color-backgroundPrimaryPressed);
    }
  `,
  backgroundPrimaryDisabled: css`
    &:hover {
      border-color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondaryHover: css`
    &:hover {
      border-color: var(--color-backgroundSecondaryHover);
    }
  `,
  backgroundSecondaryPressed: css`
    &:hover {
      border-color: var(--color-backgroundSecondaryPressed);
    }
  `,
  backgroundSecondaryDisabled: css`
    &:hover {
      border-color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegativeHover: css`
    &:hover {
      border-color: var(--color-backgroundNegativeHover);
    }
  `,
  backgroundNegativePressed: css`
    &:hover {
      border-color: var(--color-backgroundNegativePressed);
    }
  `,
  backgroundNegativeDisabled: css`
    &:hover {
      border-color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositiveHover: css`
    &:hover {
      border-color: var(--color-backgroundPositiveHover);
    }
  `,
  backgroundPositivePressed: css`
    &:hover {
      border-color: var(--color-backgroundPositivePressed);
    }
  `,
  backgroundPositiveDisabled: css`
    &:hover {
      border-color: var(--color-backgroundPositiveDisabled);
    }
  `,
  // Line
  line: css`
    &:hover {
      border-color: var(--color-line);
    }
  `,
  lineInverse: css`
    &:hover {
      border-color: var(--color-lineInverse);
    }
  `,
  lineHeavy: css`
    &:hover {
      border-color: var(--color-lineHeavy);
    }
  `,
  linePrimary: css`
    &:hover {
      border-color: var(--color-linePrimary);
    }
  `,
  linePrimaryLight: css`
    &:hover {
      border-color: var(--color-linePrimaryLight);
    }
  `,
  // Elevation
  backgroundElevation1: css`
    &:hover {
      border-color: var(--color-backgroundElevation1);
    }
  `,
  backgroundElevation2: css`
    &:hover {
      border-color: var(--color-backgroundElevation2);
    }
  `,
  // Icon
  iconForeground: css`
    &:hover {
      border-color: var(--color-iconForeground);
    }
  `,
  iconForegroundInverse: css`
    &:hover {
      border-color: var(--color-iconForegroundInverse);
    }
  `,
  iconForegroundMuted: css`
    &:hover {
      border-color: var(--color-iconForegroundMuted);
    }
  `,
  iconPrimary: css`
    &:hover {
      border-color: var(--color-iconPrimary);
    }
  `,
  iconPositive: css`
    &:hover {
      border-color: var(--color-iconPositive);
    }
  `,
  iconNegative: css`
    &:hover {
      border-color: var(--color-iconNegative);
    }
  `,
  iconWarning: css`
    &:hover {
      border-color: var(--color-iconWarning);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    &:hover {
      border-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    &:hover {
      border-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    &:hover {
      border-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    &:hover {
      border-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    &:hover {
      border-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    &:hover {
      border-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    &:hover {
      border-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    &:hover {
      border-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    &:hover {
      border-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    &:hover {
      border-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    &:hover {
      border-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    &:hover {
      border-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    &:hover {
      border-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    &:hover {
      border-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    &:hover {
      border-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    &:hover {
      border-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const borderWidth: Record<keyof typeof vars.borderWidth, LinariaClassName> = {
  none: css`
    border-width: var(--borderWidth-none);
  `,
  thin: css`
    border-width: var(--borderWidth-thin);
  `,
  thick: css`
    border-width: var(--borderWidth-thick);
  `,
} as const;

export const borderRadius: Record<keyof typeof vars.borderRadius, LinariaClassName> = {
  none: css`
    border-radius: var(--borderRadius-none);
  `,
  roundedSmall: css`
    border-radius: var(--borderRadius-roundedSmall);
  `,
  rounded: css`
    border-radius: var(--borderRadius-rounded);
  `,
  roundedMedium: css`
    border-radius: var(--borderRadius-roundedMedium);
  `,
  roundedLarge: css`
    border-radius: var(--borderRadius-roundedLarge);
  `,
  roundedXLarge: css`
    border-radius: var(--borderRadius-roundedXLarge);
  `,
  roundedFull: css`
    border-radius: var(--borderRadius-roundedFull);
  `,
} as const;

export const fontFamily: Record<keyof typeof vars.fontFamily, LinariaClassName> = {
  display1: css`
    font-family: var(--fontFamily-display1);
  `,
  display2: css`
    font-family: var(--fontFamily-display2);
  `,
  display3: css`
    font-family: var(--fontFamily-display3);
  `,
  title1: css`
    font-family: var(--fontFamily-title1);
  `,
  title2: css`
    font-family: var(--fontFamily-title2);
  `,
  title3: css`
    font-family: var(--fontFamily-title3);
  `,
  title4: css`
    font-family: var(--fontFamily-title4);
  `,
  headline: css`
    font-family: var(--fontFamily-headline);
  `,
  body: css`
    font-family: var(--fontFamily-body);
  `,
  label1: css`
    font-family: var(--fontFamily-label1);
  `,
  label2: css`
    font-family: var(--fontFamily-label2);
  `,
  caption: css`
    font-family: var(--fontFamily-caption);
  `,
  legal: css`
    font-family: var(--fontFamily-legal);
  `,
} as const;

export const fontSize: Record<keyof typeof vars.fontSize, LinariaClassName> = {
  display1: css`
    font-size: var(--fontSize-display1);
  `,
  display2: css`
    font-size: var(--fontSize-display2);
  `,
  display3: css`
    font-size: var(--fontSize-display3);
  `,
  title1: css`
    font-size: var(--fontSize-title1);
  `,
  title2: css`
    font-size: var(--fontSize-title2);
  `,
  title3: css`
    font-size: var(--fontSize-title3);
  `,
  title4: css`
    font-size: var(--fontSize-title4);
  `,
  headline: css`
    font-size: var(--fontSize-headline);
  `,
  body: css`
    font-size: var(--fontSize-body);
  `,
  label1: css`
    font-size: var(--fontSize-label1);
  `,
  label2: css`
    font-size: var(--fontSize-label2);
  `,
  caption: css`
    font-size: var(--fontSize-caption);
  `,
  legal: css`
    font-size: var(--fontSize-legal);
  `,
} as const;

export const fontWeight: Record<keyof typeof vars.fontWeight, LinariaClassName> = {
  display1: css`
    font-weight: var(--fontWeight-display1);
  `,
  display2: css`
    font-weight: var(--fontWeight-display2);
  `,
  display3: css`
    font-weight: var(--fontWeight-display3);
  `,
  title1: css`
    font-weight: var(--fontWeight-title1);
  `,
  title2: css`
    font-weight: var(--fontWeight-title2);
  `,
  title3: css`
    font-weight: var(--fontWeight-title3);
  `,
  title4: css`
    font-weight: var(--fontWeight-title4);
  `,
  headline: css`
    font-weight: var(--fontWeight-headline);
  `,
  body: css`
    font-weight: var(--fontWeight-body);
  `,
  label1: css`
    font-weight: var(--fontWeight-label1);
  `,
  label2: css`
    font-weight: var(--fontWeight-label2);
  `,
  caption: css`
    font-weight: var(--fontWeight-caption);
  `,
  legal: css`
    font-weight: var(--fontWeight-legal);
  `,
} as const;

export const lineHeight: Record<keyof typeof vars.lineHeight, LinariaClassName> = {
  display1: css`
    line-height: var(--lineHeight-display1);
  `,
  display2: css`
    line-height: var(--lineHeight-display2);
  `,
  display3: css`
    line-height: var(--lineHeight-display3);
  `,
  title1: css`
    line-height: var(--lineHeight-title1);
  `,
  title2: css`
    line-height: var(--lineHeight-title2);
  `,
  title3: css`
    line-height: var(--lineHeight-title3);
  `,
  title4: css`
    line-height: var(--lineHeight-title4);
  `,
  headline: css`
    line-height: var(--lineHeight-headline);
  `,
  body: css`
    line-height: var(--lineHeight-body);
  `,
  label1: css`
    line-height: var(--lineHeight-label1);
  `,
  label2: css`
    line-height: var(--lineHeight-label2);
  `,
  caption: css`
    line-height: var(--lineHeight-caption);
  `,
  legal: css`
    line-height: var(--lineHeight-legal);
  `,
} as const;

export const font: Record<keyof typeof vars.fontFamily, LinariaClassName> = {
  display1: css`
    font-size: var(--fontSize-display1);
    line-height: var(--lineHeight-display1);
    font-weight: var(--fontWeight-display1);
    font-family: var(--fontFamily-display1);
  `,
  display2: css`
    font-size: var(--fontSize-display2);
    line-height: var(--lineHeight-display2);
    font-weight: var(--fontWeight-display2);
    font-family: var(--fontFamily-display2);
  `,
  display3: css`
    font-size: var(--fontSize-display3);
    line-height: var(--lineHeight-display3);
    font-weight: var(--fontWeight-display3);
    font-family: var(--fontFamily-display3);
  `,
  title1: css`
    font-size: var(--fontSize-title1);
    line-height: var(--lineHeight-title1);
    font-weight: var(--fontWeight-title1);
    font-family: var(--fontFamily-title1);
  `,
  title2: css`
    font-size: var(--fontSize-title2);
    line-height: var(--lineHeight-title2);
    font-weight: var(--fontWeight-title2);
    font-family: var(--fontFamily-title2);
  `,
  title3: css`
    font-size: var(--fontSize-title3);
    line-height: var(--lineHeight-title3);
    font-weight: var(--fontWeight-title3);
    font-family: var(--fontFamily-title3);
  `,
  title4: css`
    font-size: var(--fontSize-title4);
    line-height: var(--lineHeight-title4);
    font-weight: var(--fontWeight-title4);
    font-family: var(--fontFamily-title4);
  `,
  headline: css`
    font-size: var(--fontSize-headline);
    line-height: var(--lineHeight-headline);
    font-weight: var(--fontWeight-headline);
    font-family: var(--fontFamily-headline);
  `,
  body: css`
    font-size: var(--fontSize-body);
    line-height: var(--lineHeight-body);
    font-weight: var(--fontWeight-body);
    font-family: var(--fontFamily-body);
  `,
  label1: css`
    font-size: var(--fontSize-label1);
    line-height: var(--lineHeight-label1);
    font-weight: var(--fontWeight-label1);
    font-family: var(--fontFamily-label1);
  `,
  label2: css`
    font-size: var(--fontSize-label2);
    line-height: var(--lineHeight-label2);
    font-weight: var(--fontWeight-label2);
    font-family: var(--fontFamily-label2);
  `,
  caption: css`
    font-size: var(--fontSize-caption);
    line-height: var(--lineHeight-caption);
    font-weight: var(--fontWeight-caption);
    font-family: var(--fontFamily-caption);
  `,
  legal: css`
    font-size: var(--fontSize-legal);
    line-height: var(--lineHeight-legal);
    font-weight: var(--fontWeight-legal);
    font-family: var(--fontFamily-legal);
  `,
} as const;

export const textDecoration = {
  none: css`
    text-decoration: none;
  `,
  underline: css`
    text-decoration: underline;
  `,
  overline: css`
    text-decoration: overline;
  `,
  'line-through': css`
    text-decoration: line-through;
  `,
  'underline overline': css`
    text-decoration: underline overline;
  `,
  'underline double': css`
    text-decoration: underline double;
  `,
} as const;

export const textDecorationThickness = {
  auto: css`
    text-decoration-thickness: auto;
  `,
  'from-font': css`
    text-decoration-thickness: from-font;
  `,
  thin: css`
    text-decoration-thickness: thin;
  `,
  medium: css`
    text-decoration-thickness: medium;
  `,
  thick: css`
    text-decoration-thickness: thick;
  `,
} as const;

export const textDecorationColor: Record<keyof typeof vars.color, LinariaClassName> = {
  // Text
  textForeground: css`
    text-decoration-color: var(--color-textForeground);
  `,
  textForegroundInverse: css`
    text-decoration-color: var(--color-textForegroundInverse);
  `,
  textForegroundMuted: css`
    text-decoration-color: var(--color-textForegroundMuted);
  `,
  textPrimary: css`
    text-decoration-color: var(--color-textPrimary);
  `,
  textPositive: css`
    text-decoration-color: var(--color-textPositive);
  `,
  textNegative: css`
    text-decoration-color: var(--color-textNegative);
  `,
  textWarning: css`
    text-decoration-color: var(--color-textWarning);
  `,
  // Background
  background: css`
    text-decoration-color: var(--color-background);
  `,
  backgroundAlternate: css`
    text-decoration-color: var(--color-backgroundAlternate);
  `,
  backgroundInverse: css`
    text-decoration-color: var(--color-backgroundInverse);
  `,
  backgroundOverlay: css`
    text-decoration-color: var(--color-backgroundOverlay);
  `,
  backgroundPrimary: css`
    text-decoration-color: var(--color-backgroundPrimary);
  `,
  backgroundPrimaryWash: css`
    text-decoration-color: var(--color-backgroundPrimaryWash);
  `,
  backgroundSecondary: css`
    text-decoration-color: var(--color-backgroundSecondary);
  `,
  backgroundSecondaryWash: css`
    text-decoration-color: var(--color-backgroundSecondaryWash);
  `,
  backgroundNegative: css`
    text-decoration-color: var(--color-backgroundNegative);
  `,
  backgroundNegativeWash: css`
    text-decoration-color: var(--color-backgroundNegativeWash);
  `,
  backgroundPositive: css`
    text-decoration-color: var(--color-backgroundPositive);
  `,
  backgroundPositiveWash: css`
    text-decoration-color: var(--color-backgroundPositiveWash);
  `,
  backgroundWarning: css`
    text-decoration-color: var(--color-backgroundWarning);
  `,
  backgroundWarningWash: css`
    text-decoration-color: var(--color-backgroundWarningWash);
  `,
  currentColor: css`
    text-decoration-color: var(--color-currentColor);
  `,
  // Background states
  backgroundPrimaryHover: css`
    text-decoration-color: var(--color-backgroundPrimaryHover);
  `,
  backgroundPrimaryPressed: css`
    text-decoration-color: var(--color-backgroundPrimaryPressed);
  `,
  backgroundPrimaryDisabled: css`
    text-decoration-color: var(--color-backgroundPrimaryDisabled);
  `,
  backgroundSecondaryHover: css`
    text-decoration-color: var(--color-backgroundSecondaryHover);
  `,
  backgroundSecondaryPressed: css`
    text-decoration-color: var(--color-backgroundSecondaryPressed);
  `,
  backgroundSecondaryDisabled: css`
    text-decoration-color: var(--color-backgroundSecondaryDisabled);
  `,
  backgroundNegativeHover: css`
    text-decoration-color: var(--color-backgroundNegativeHover);
  `,
  backgroundNegativePressed: css`
    text-decoration-color: var(--color-backgroundNegativePressed);
  `,
  backgroundNegativeDisabled: css`
    text-decoration-color: var(--color-backgroundNegativeDisabled);
  `,
  backgroundPositiveHover: css`
    text-decoration-color: var(--color-backgroundPositiveHover);
  `,
  backgroundPositivePressed: css`
    text-decoration-color: var(--color-backgroundPositivePressed);
  `,
  backgroundPositiveDisabled: css`
    text-decoration-color: var(--color-backgroundPositiveDisabled);
  `,
  // Line
  line: css`
    text-decoration-color: var(--color-line);
  `,
  lineInverse: css`
    text-decoration-color: var(--color-lineInverse);
  `,
  lineHeavy: css`
    text-decoration-color: var(--color-lineHeavy);
  `,
  linePrimary: css`
    text-decoration-color: var(--color-linePrimary);
  `,
  linePrimaryLight: css`
    text-decoration-color: var(--color-linePrimaryLight);
  `,
  // Elevation
  backgroundElevation1: css`
    text-decoration-color: var(--color-backgroundElevation1);
  `,
  backgroundElevation2: css`
    text-decoration-color: var(--color-backgroundElevation2);
  `,
  // Icon
  iconForeground: css`
    text-decoration-color: var(--color-iconForeground);
  `,
  iconForegroundInverse: css`
    text-decoration-color: var(--color-iconForegroundInverse);
  `,
  iconForegroundMuted: css`
    text-decoration-color: var(--color-iconForegroundMuted);
  `,
  iconPrimary: css`
    text-decoration-color: var(--color-iconPrimary);
  `,
  iconPositive: css`
    text-decoration-color: var(--color-iconPositive);
  `,
  iconNegative: css`
    text-decoration-color: var(--color-iconNegative);
  `,
  iconWarning: css`
    text-decoration-color: var(--color-iconWarning);
  `,
  // Accent
  accentSubtleGreen: css`
    text-decoration-color: var(--color-accentSubtleGreen);
  `,
  accentBoldGreen: css`
    text-decoration-color: var(--color-accentBoldGreen);
  `,
  accentSubtleBlue: css`
    text-decoration-color: var(--color-accentSubtleBlue);
  `,
  accentBoldBlue: css`
    text-decoration-color: var(--color-accentBoldBlue);
  `,
  accentSubtlePurple: css`
    text-decoration-color: var(--color-accentSubtlePurple);
  `,
  accentBoldPurple: css`
    text-decoration-color: var(--color-accentBoldPurple);
  `,
  accentSubtleYellow: css`
    text-decoration-color: var(--color-accentSubtleYellow);
  `,
  accentBoldYellow: css`
    text-decoration-color: var(--color-accentBoldYellow);
  `,
  accentSubtleRed: css`
    text-decoration-color: var(--color-accentSubtleRed);
  `,
  accentBoldRed: css`
    text-decoration-color: var(--color-accentBoldRed);
  `,
  accentSubtleGray: css`
    text-decoration-color: var(--color-accentSubtleGray);
  `,
  accentBoldGray: css`
    text-decoration-color: var(--color-accentBoldGray);
  `,
  transparent: css`
    text-decoration-color: var(--color-transparent);
  `,
  transparentHover: css`
    text-decoration-color: var(--color-transparentHover);
  `,
  transparentPressed: css`
    text-decoration-color: var(--color-transparentPressed);
  `,
  transparentDisabled: css`
    text-decoration-color: var(--color-transparentDisabled);
  `,
} as const;

export const textTransform = {
  none: css`
    text-transform: none;
  `,
  uppercase: css`
    text-transform: uppercase;
  `,
  lowercase: css`
    text-transform: lowercase;
  `,
  capitalize: css`
    text-transform: capitalize;
  `,
} as const;

export const userSelect = {
  none: css`
    user-select: none;
  `,
  text: css`
    user-select: text;
  `,
  all: css`
    user-select: all;
  `,
  auto: css`
    user-select: auto;
  `,
} as const;

export const display = {
  block: css`
    display: block;
  `,
  inline: css`
    display: inline;
  `,
  'inline-block': css`
    display: inline-block;
  `,
  flex: css`
    display: flex;
  `,
  'inline-flex': css`
    display: inline-flex;
  `,
  grid: css`
    display: grid;
  `,
  'inline-grid': css`
    display: inline-grid;
  `,
  contents: css`
    display: contents;
  `,
  'flow-root': css`
    display: flow-root;
  `,
} as const;

export const overflow = {
  auto: css`
    overflow: auto;
  `,
  visible: css`
    overflow: visible;
  `,
  hidden: css`
    overflow: hidden;
  `,
  clip: css`
    overflow: clip;
  `,
  scroll: css`
    overflow: scroll;
  `,
} as const;

export const gap: Record<keyof typeof vars.space, LinariaClassName> = {
  '0': css`
    gap: var(--space-0);
  `,
  '0.25': css`
    gap: var(--space-0\.25);
  `,
  '0.5': css`
    gap: var(--space-0\.5);
  `,
  '0.75': css`
    gap: var(--space-0\.75);
  `,
  '1': css`
    gap: var(--space-1);
  `,
  '1.5': css`
    gap: var(--space-1.5);
  `,
  '2': css`
    gap: var(--space-2);
  `,
  '3': css`
    gap: var(--space-3);
  `,
  '4': css`
    gap: var(--space-4);
  `,
  '5': css`
    gap: var(--space-5);
  `,
  '6': css`
    gap: var(--space-6);
  `,
  '7': css`
    gap: var(--space-7);
  `,
  '8': css`
    gap: var(--space-8);
  `,
  '9': css`
    gap: var(--space-9);
  `,
  '10': css`
    gap: var(--space-10);
  `,
} as const;

export const columnGap: Record<keyof typeof vars.space, LinariaClassName> = {
  '0': css`
    column-gap: var(--space-0);
  `,
  '0.25': css`
    column-gap: var(--space-0\.25);
  `,
  '0.5': css`
    column-gap: var(--space-0\.5);
  `,
  '0.75': css`
    column-gap: var(--space-0\.75);
  `,
  '1': css`
    column-gap: var(--space-1);
  `,
  '1.5': css`
    column-gap: var(--space-1.5);
  `,
  '2': css`
    column-gap: var(--space-2);
  `,
  '3': css`
    column-gap: var(--space-3);
  `,
  '4': css`
    column-gap: var(--space-4);
  `,
  '5': css`
    column-gap: var(--space-5);
  `,
  '6': css`
    column-gap: var(--space-6);
  `,
  '7': css`
    column-gap: var(--space-7);
  `,
  '8': css`
    column-gap: var(--space-8);
  `,
  '9': css`
    column-gap: var(--space-9);
  `,
  '10': css`
    column-gap: var(--space-10);
  `,
} as const;

export const rowGap: Record<keyof typeof vars.space, LinariaClassName> = {
  '0': css`
    row-gap: var(--space-0);
  `,
  '0.25': css`
    row-gap: var(--space-0\.25);
  `,
  '0.5': css`
    row-gap: var(--space-0\.5);
  `,
  '0.75': css`
    row-gap: var(--space-0\.75);
  `,
  '1': css`
    row-gap: var(--space-1);
  `,
  '1.5': css`
    row-gap: var(--space-1.5);
  `,
  '2': css`
    row-gap: var(--space-2);
  `,
  '3': css`
    row-gap: var(--space-3);
  `,
  '4': css`
    row-gap: var(--space-4);
  `,
  '5': css`
    row-gap: var(--space-5);
  `,
  '6': css`
    row-gap: var(--space-6);
  `,
  '7': css`
    row-gap: var(--space-7);
  `,
  '8': css`
    row-gap: var(--space-8);
  `,
  '9': css`
    row-gap: var(--space-9);
  `,
  '10': css`
    row-gap: var(--space-10);
  `,
} as const;

export const justifyContent = {
  normal: css`
    justify-content: normal;
  `,
  center: css`
    justify-content: center;
  `,
  start: css`
    justify-content: start;
  `,
  end: css`
    justify-content: end;
  `,
  'flex-start': css`
    justify-content: flex-start;
  `,
  'flex-end': css`
    justify-content: flex-end;
  `,
  left: css`
    justify-content: left;
  `,
  right: css`
    justify-content: right;
  `,
  'space-between': css`
    justify-content: space-between;
  `,
  'space-around': css`
    justify-content: space-around;
  `,
  'space-evenly': css`
    justify-content: space-evenly;
  `,
  stretch: css`
    justify-content: stretch;
  `,
} as const;

export const alignContent = {
  normal: css`
    align-content: normal;
  `,
  center: css`
    align-content: center;
  `,
  start: css`
    align-content: start;
  `,
  end: css`
    align-content: end;
  `,
  'flex-start': css`
    align-content: flex-start;
  `,
  'flex-end': css`
    align-content: flex-end;
  `,
  'space-between': css`
    align-content: space-between;
  `,
  'space-around': css`
    align-content: space-around;
  `,
  'space-evenly': css`
    align-content: space-evenly;
  `,
  stretch: css`
    align-content: stretch;
  `,
  baseline: css`
    align-content: baseline;
  `,
  'first baseline': css`
    align-content: first baseline;
  `,
  'last baseline': css`
    align-content: last baseline;
  `,
} as const;

export const alignItems = {
  normal: css`
    align-items: normal;
  `,
  center: css`
    align-items: center;
  `,
  start: css`
    align-items: start;
  `,
  end: css`
    align-items: end;
  `,
  'flex-start': css`
    align-items: flex-start;
  `,
  'flex-end': css`
    align-items: flex-end;
  `,
  'self-start': css`
    align-items: self-start;
  `,
  'self-end': css`
    align-items: self-end;
  `,
  stretch: css`
    align-items: stretch;
  `,
  baseline: css`
    align-items: baseline;
  `,
  'first baseline': css`
    align-items: first baseline;
  `,
  'last baseline': css`
    align-items: last baseline;
  `,
} as const;

export const alignSelf = {
  auto: css`
    align-self: auto;
  `,
  normal: css`
    align-self: normal;
  `,
  center: css`
    align-self: center;
  `,
  start: css`
    align-self: start;
  `,
  end: css`
    align-self: end;
  `,
  'flex-start': css`
    align-self: flex-start;
  `,
  'flex-end': css`
    align-self: flex-end;
  `,
  'self-start': css`
    align-self: self-start;
  `,
  'self-end': css`
    align-self: self-end;
  `,
  stretch: css`
    align-self: stretch;
  `,
  baseline: css`
    align-self: baseline;
  `,
  'first baseline': css`
    align-self: first baseline;
  `,
  'last baseline': css`
    align-self: last baseline;
  `,
} as const;

export const flexDirection = {
  row: css`
    flex-direction: row;
  `,
  'row-reverse': css`
    flex-direction: row-reverse;
  `,
  column: css`
    flex-direction: column;
  `,
  'column-reverse': css`
    flex-direction: column-reverse;
  `,
} as const;

export const flexWrap = {
  nowrap: css`
    flex-wrap: nowrap;
  `,
  wrap: css`
    flex-wrap: wrap;
  `,
  'wrap-reverse': css`
    flex-wrap: wrap-reverse;
  `,
} as const;

export const position = {
  static: css`
    position: static;
  `,
  relative: css`
    position: relative;
  `,
  absolute: css`
    position: absolute;
  `,
  fixed: css`
    position: fixed;
  `,
  sticky: css`
    position: sticky;
  `,
} as const;

export const zIndex: Record<keyof typeof vars.zIndex, LinariaClassName> = {
  interactable: css`
    z-index: var(--zIndex-interactable);
  `,
  navigation: css`
    z-index: var(--zIndex-navigation);
  `,
  portal: css`
    z-index: var(--zIndex-portal);
  `,
  popoverMenu: css`
    z-index: var(--zIndex-popoverMenu);
  `,
  modal: css`
    z-index: var(--zIndex-modal);
  `,
  dropdown: css`
    z-index: var(--zIndex-dropdown);
  `,
  tooltip: css`
    z-index: var(--zIndex-tooltip);
  `,
  toast: css`
    z-index: var(--zIndex-toast);
  `,
  alert: css`
    z-index: var(--zIndex-alert);
  `,
  max: css`
    z-index: var(--zIndex-max);
  `,
} as const;

export const padding = {
  '0': css`
    padding-top: var(--space-0);
    padding-bottom: var(--space-0);
    padding-left: var(--space-0);
    padding-right: var(--space-0);
  `,
  '0.5': css`
    padding-top: var(--space-0\.5);
    padding-bottom: var(--space-0\.5);
    padding-left: var(--space-0\.5);
    padding-right: var(--space-0\.5);
  `,
  '1': css`
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
    padding-left: var(--space-1);
    padding-right: var(--space-1);
  `,
  '2': css`
    padding-top: var(--space-2);
    padding-bottom: var(--space-2);
    padding-left: var(--space-2);
    padding-right: var(--space-2);
  `,
  '3': css`
    padding-top: var(--space-3);
    padding-bottom: var(--space-3);
    padding-left: var(--space-3);
    padding-right: var(--space-3);
  `,
  '4': css`
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  `,
  '5': css`
    padding-top: var(--space-5);
    padding-bottom: var(--space-5);
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  `,
  '6': css`
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  `,
  '7': css`
    padding-top: var(--space-7);
    padding-bottom: var(--space-7);
    padding-left: var(--space-7);
    padding-right: var(--space-7);
  `,
  '8': css`
    padding-top: var(--space-8);
    padding-bottom: var(--space-8);
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  `,
  '9': css`
    padding-top: var(--space-9);
    padding-bottom: var(--space-9);
    padding-left: var(--space-9);
    padding-right: var(--space-9);
  `,
  '10': css`
    padding-top: var(--space-10);
    padding-bottom: var(--space-10);
    padding-left: var(--space-10);
    padding-right: var(--space-10);
  `,
} as const;

export const paddingX = {
  '0': css`
    padding-left: var(--space-0);
    padding-right: var(--space-0);
  `,
  '0.5': css`
    padding-left: var(--space-0\.5);
    padding-right: var(--space-0\.5);
  `,
  '1': css`
    padding-left: var(--space-1);
    padding-right: var(--space-1);
  `,
  '2': css`
    padding-left: var(--space-2);
    padding-right: var(--space-2);
  `,
  '3': css`
    padding-left: var(--space-3);
    padding-right: var(--space-3);
  `,
  '4': css`
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  `,
  '5': css`
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  `,
  '6': css`
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  `,
  '7': css`
    padding-left: var(--space-7);
    padding-right: var(--space-7);
  `,
  '8': css`
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  `,
  '9': css`
    padding-left: var(--space-9);
    padding-right: var(--space-9);
  `,
  '10': css`
    padding-left: var(--space-10);
    padding-right: var(--space-10);
  `,
} as const;

export const paddingY = {
  '0': css`
    padding-top: var(--space-0);
    padding-bottom: var(--space-0);
  `,
  '0.5': css`
    padding-top: var(--space-0\.5);
    padding-bottom: var(--space-0\.5);
  `,
  '1': css`
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
  `,
  '2': css`
    padding-top: var(--space-2);
    padding-bottom: var(--space-2);
  `,
  '3': css`
    padding-top: var(--space-3);
    padding-bottom: var(--space-3);
  `,
  '4': css`
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
  `,
  '5': css`
    padding-top: var(--space-5);
    padding-bottom: var(--space-5);
  `,
  '6': css`
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
  `,
  '7': css`
    padding-top: var(--space-7);
    padding-bottom: var(--space-7);
  `,
  '8': css`
    padding-top: var(--space-8);
    padding-bottom: var(--space-8);
  `,
  '9': css`
    padding-top: var(--space-9);
    padding-bottom: var(--space-9);
  `,
  '10': css`
    padding-top: var(--space-10);
    padding-bottom: var(--space-10);
  `,
} as const;

export const paddingTop = {
  '0': css`
    padding-top: var(--space-0);
  `,
  '0.5': css`
    padding-top: var(--space-0\.5);
  `,
  '1': css`
    padding-top: var(--space-1);
  `,
  '2': css`
    padding-top: var(--space-2);
  `,
  '3': css`
    padding-top: var(--space-3);
  `,
  '4': css`
    padding-top: var(--space-4);
  `,
  '5': css`
    padding-top: var(--space-5);
  `,
  '6': css`
    padding-top: var(--space-6);
  `,
  '7': css`
    padding-top: var(--space-7);
  `,
  '8': css`
    padding-top: var(--space-8);
  `,
  '9': css`
    padding-top: var(--space-9);
  `,
  '10': css`
    padding-top: var(--space-10);
  `,
} as const;

export const paddingBottom = {
  '0': css`
    padding-bottom: var(--space-0);
  `,
  '0.5': css`
    padding-bottom: var(--space-0\.5);
  `,
  '1': css`
    padding-bottom: var(--space-1);
  `,
  '2': css`
    padding-bottom: var(--space-2);
  `,
  '3': css`
    padding-bottom: var(--space-3);
  `,
  '4': css`
    padding-bottom: var(--space-4);
  `,
  '5': css`
    padding-bottom: var(--space-5);
  `,
  '6': css`
    padding-bottom: var(--space-6);
  `,
  '7': css`
    padding-bottom: var(--space-7);
  `,
  '8': css`
    padding-bottom: var(--space-8);
  `,
  '9': css`
    padding-bottom: var(--space-9);
  `,
  '10': css`
    padding-bottom: var(--space-10);
  `,
} as const;

export const paddingLeft = {
  '0': css`
    padding-left: var(--space-0);
  `,
  '0.5': css`
    padding-left: var(--space-0\.5);
  `,
  '1': css`
    padding-left: var(--space-1);
  `,
  '2': css`
    padding-left: var(--space-2);
  `,
  '3': css`
    padding-left: var(--space-3);
  `,
  '4': css`
    padding-left: var(--space-4);
  `,
  '5': css`
    padding-left: var(--space-5);
  `,
  '6': css`
    padding-left: var(--space-6);
  `,
  '7': css`
    padding-left: var(--space-7);
  `,
  '8': css`
    padding-left: var(--space-8);
  `,
  '9': css`
    padding-left: var(--space-9);
  `,
  '10': css`
    padding-left: var(--space-10);
  `,
} as const;

export const paddingRight = {
  '0': css`
    padding-right: var(--space-0);
  `,
  '0.5': css`
    padding-right: var(--space-0\.5);
  `,
  '1': css`
    padding-right: var(--space-1);
  `,
  '2': css`
    padding-right: var(--space-2);
  `,
  '3': css`
    padding-right: var(--space-3);
  `,
  '4': css`
    padding-right: var(--space-4);
  `,
  '5': css`
    padding-right: var(--space-5);
  `,
  '6': css`
    padding-right: var(--space-6);
  `,
  '7': css`
    padding-right: var(--space-7);
  `,
  '8': css`
    padding-right: var(--space-8);
  `,
  '9': css`
    padding-right: var(--space-9);
  `,
  '10': css`
    padding-right: var(--space-10);
  `,
} as const;

export const margin = {
  '0': css`
    margin-top: calc(-1 * var(--space-0));
    margin-bottom: calc(-1 * var(--space-0));
    margin-right: calc(-1 * var(--space-0));
    margin-left: calc(-1 * var(--space-0));
  `,
  '-0.5': css`
    margin-top: calc(-1 * var(--space-0\.5));
    margin-bottom: calc(-1 * var(--space-0\.5));
    margin-right: calc(-1 * var(--space-0\.5));
    margin-left: calc(-1 * var(--space-0\.5));
  `,
  '-1': css`
    margin-top: calc(-1 * var(--space-1));
    margin-bottom: calc(-1 * var(--space-1));
    margin-right: calc(-1 * var(--space-1));
    margin-left: calc(-1 * var(--space-1));
  `,
  '-2': css`
    margin-top: calc(-1 * var(--space-2));
    margin-bottom: calc(-1 * var(--space-2));
    margin-right: calc(-1 * var(--space-2));
    margin-left: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-top: calc(-1 * var(--space-3));
    margin-bottom: calc(-1 * var(--space-3));
    margin-right: calc(-1 * var(--space-3));
    margin-left: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-top: calc(-1 * var(--space-4));
    margin-bottom: calc(-1 * var(--space-4));
    margin-right: calc(-1 * var(--space-4));
    margin-left: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-top: calc(-1 * var(--space-5));
    margin-bottom: calc(-1 * var(--space-5));
    margin-right: calc(-1 * var(--space-5));
    margin-left: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-top: calc(-1 * var(--space-6));
    margin-bottom: calc(-1 * var(--space-6));
    margin-right: calc(-1 * var(--space-6));
    margin-left: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-top: calc(-1 * var(--space-7));
    margin-bottom: calc(-1 * var(--space-7));
    margin-right: calc(-1 * var(--space-7));
    margin-left: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-top: calc(-1 * var(--space-8));
    margin-bottom: calc(-1 * var(--space-8));
    margin-right: calc(-1 * var(--space-8));
    margin-left: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-top: calc(-1 * var(--space-9));
    margin-bottom: calc(-1 * var(--space-9));
    margin-right: calc(-1 * var(--space-9));
    margin-left: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-top: calc(-1 * var(--space-10));
    margin-bottom: calc(-1 * var(--space-10));
    margin-right: calc(-1 * var(--space-10));
    margin-left: calc(-1 * var(--space-10));
  `,
} as const;

export const marginX = {
  '0': css`
    margin-right: calc(-1 * var(--space-0));
    margin-left: calc(-1 * var(--space-0));
  `,
  '-0.5': css`
    margin-right: calc(-1 * var(--space-0\.5));
    margin-left: calc(-1 * var(--space-0\.5));
  `,
  '-1': css`
    margin-right: calc(-1 * var(--space-1));
    margin-left: calc(-1 * var(--space-1));
  `,
  '-2': css`
    margin-right: calc(-1 * var(--space-2));
    margin-left: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-right: calc(-1 * var(--space-3));
    margin-left: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-right: calc(-1 * var(--space-4));
    margin-left: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-right: calc(-1 * var(--space-5));
    margin-left: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-right: calc(-1 * var(--space-6));
    margin-left: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-right: calc(-1 * var(--space-7));
    margin-left: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-right: calc(-1 * var(--space-8));
    margin-left: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-right: calc(-1 * var(--space-9));
    margin-left: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-right: calc(-1 * var(--space-10));
    margin-left: calc(-1 * var(--space-10));
  `,
} as const;

export const marginY = {
  '0': css`
    margin-top: calc(-1 * var(--space-0));
    margin-bottom: calc(-1 * var(--space-0));
  `,
  '-0.5': css`
    margin-top: calc(-1 * var(--space-0\.5));
    margin-bottom: calc(-1 * var(--space-0\.5));
  `,
  '-1': css`
    margin-top: calc(-1 * var(--space-1));
    margin-bottom: calc(-1 * var(--space-1));
  `,
  '-2': css`
    margin-top: calc(-1 * var(--space-2));
    margin-bottom: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-top: calc(-1 * var(--space-3));
    margin-bottom: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-top: calc(-1 * var(--space-4));
    margin-bottom: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-top: calc(-1 * var(--space-5));
    margin-bottom: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-top: calc(-1 * var(--space-6));
    margin-bottom: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-top: calc(-1 * var(--space-7));
    margin-bottom: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-top: calc(-1 * var(--space-8));
    margin-bottom: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-top: calc(-1 * var(--space-9));
    margin-bottom: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-top: calc(-1 * var(--space-10));
    margin-bottom: calc(-1 * var(--space-10));
  `,
} as const;

export const marginTop = {
  '0': css`
    margin-top: calc(-1 * var(--space-0));
  `,
  '-0.5': css`
    margin-top: calc(-1 * var(--space-0\.5));
  `,
  '-1': css`
    margin-top: calc(-1 * var(--space-1));
  `,
  '-2': css`
    margin-top: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-top: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-top: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-top: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-top: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-top: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-top: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-top: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-top: calc(-1 * var(--space-10));
  `,
} as const;

export const marginBottom = {
  '0': css`
    margin-bottom: calc(-1 * var(--space-0));
  `,
  '-0.5': css`
    margin-bottom: calc(-1 * var(--space-0\.5));
  `,
  '-1': css`
    margin-bottom: calc(-1 * var(--space-1));
  `,
  '-2': css`
    margin-bottom: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-bottom: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-bottom: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-bottom: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-bottom: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-bottom: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-bottom: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-bottom: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-bottom: calc(-1 * var(--space-10));
  `,
} as const;

export const marginRight = {
  '0': css`
    margin-right: calc(-1 * var(--space-0));
  `,
  '-0.5': css`
    margin-right: calc(-1 * var(--space-0\.5));
  `,
  '-1': css`
    margin-right: calc(-1 * var(--space-1));
  `,
  '-2': css`
    margin-right: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-right: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-right: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-right: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-right: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-right: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-right: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-right: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-right: calc(-1 * var(--space-10));
  `,
} as const;

export const marginLeft = {
  '0': css`
    margin-left: calc(-1 * var(--space-0));
  `,
  '-0.5': css`
    margin-left: calc(-1 * var(--space-0\.5));
  `,
  '-1': css`
    margin-left: calc(-1 * var(--space-1));
  `,
  '-2': css`
    margin-left: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-left: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-left: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-left: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-left: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-left: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-left: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-left: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-left: calc(-1 * var(--space-10));
  `,
} as const;

export const elevation = {
  '1': css`
    background-color: var(--color-backgroundElevation1);
    box-shadow: var(--shadow-elevation1);
  `,
  '2': css`
    background-color: var(--color-backgroundElevation2);
    box-shadow: var(--shadow-elevation2);
  `,
} as const;

export const textAlign = {
  start: css`
    text-align: start;
  `,
  end: css`
    text-align: end;
  `,
  center: css`
    text-align: center;
  `,
  justify: css`
    text-align: justify;
  `,
} as const;

export const visibility = {
  hidden: css`
    visibility: hidden;
  `,
  visible: css`
    visibility: visible;
  `,
} as const;

export const borderTopLeftRadius: Record<keyof typeof vars.borderRadius, LinariaClassName> = {
  none: css`
    border-top-left-radius: var(--borderRadius-none);
  `,
  roundedSmall: css`
    border-top-left-radius: var(--borderRadius-roundedSmall);
  `,
  rounded: css`
    border-top-left-radius: var(--borderRadius-rounded);
  `,
  roundedMedium: css`
    border-top-left-radius: var(--borderRadius-roundedMedium);
  `,
  roundedLarge: css`
    border-top-left-radius: var(--borderRadius-roundedLarge);
  `,
  roundedXLarge: css`
    border-top-left-radius: var(--borderRadius-roundedXLarge);
  `,
  roundedFull: css`
    border-top-left-radius: var(--borderRadius-roundedFull);
  `,
} as const;

export const borderTopRightRadius: Record<keyof typeof vars.borderRadius, LinariaClassName> = {
  none: css`
    border-top-right-radius: var(--borderRadius-none);
  `,
  roundedSmall: css`
    border-top-right-radius: var(--borderRadius-roundedSmall);
  `,
  rounded: css`
    border-top-right-radius: var(--borderRadius-rounded);
  `,
  roundedMedium: css`
    border-top-right-radius: var(--borderRadius-roundedMedium);
  `,
  roundedLarge: css`
    border-top-right-radius: var(--borderRadius-roundedLarge);
  `,
  roundedXLarge: css`
    border-top-right-radius: var(--borderRadius-roundedXLarge);
  `,
  roundedFull: css`
    border-top-right-radius: var(--borderRadius-roundedFull);
  `,
} as const;

export const borderBottomLeftRadius: Record<keyof typeof vars.borderRadius, LinariaClassName> = {
  none: css`
    border-bottom-left-radius: var(--borderRadius-none);
  `,
  roundedSmall: css`
    border-bottom-left-radius: var(--borderRadius-roundedSmall);
  `,
  rounded: css`
    border-bottom-left-radius: var(--borderRadius-rounded);
  `,
  roundedMedium: css`
    border-bottom-left-radius: var(--borderRadius-roundedMedium);
  `,
  roundedLarge: css`
    border-bottom-left-radius: var(--borderRadius-roundedLarge);
  `,
  roundedXLarge: css`
    border-bottom-left-radius: var(--borderRadius-roundedXLarge);
  `,
  roundedFull: css`
    border-bottom-left-radius: var(--borderRadius-roundedFull);
  `,
} as const;

export const borderBottomRightRadius: Record<keyof typeof vars.borderRadius, LinariaClassName> = {
  none: css`
    border-bottom-right-radius: var(--borderRadius-none);
  `,
  roundedSmall: css`
    border-bottom-right-radius: var(--borderRadius-roundedSmall);
  `,
  rounded: css`
    border-bottom-right-radius: var(--borderRadius-rounded);
  `,
  roundedMedium: css`
    border-bottom-right-radius: var(--borderRadius-roundedMedium);
  `,
  roundedLarge: css`
    border-bottom-right-radius: var(--borderRadius-roundedLarge);
  `,
  roundedXLarge: css`
    border-bottom-right-radius: var(--borderRadius-roundedXLarge);
  `,
  roundedFull: css`
    border-bottom-right-radius: var(--borderRadius-roundedFull);
  `,
} as const;

export const borderTopWidth: Record<keyof typeof vars.borderWidth, LinariaClassName> = {
  none: css`
    border-top-width: var(--borderWidth-none);
  `,
  thin: css`
    border-top-width: var(--borderWidth-thin);
  `,
  thick: css`
    border-top-width: var(--borderWidth-thick);
  `,
} as const;

export const borderRightWidth: Record<keyof typeof vars.borderWidth, LinariaClassName> = {
  none: css`
    border-right-width: var(--borderWidth-none);
  `,
  thin: css`
    border-right-width: var(--borderWidth-thin);
  `,
  thick: css`
    border-right-width: var(--borderWidth-thick);
  `,
} as const;

export const borderBottomWidth: Record<keyof typeof vars.borderWidth, LinariaClassName> = {
  none: css`
    border-bottom-width: var(--borderWidth-none);
  `,
  thin: css`
    border-bottom-width: var(--borderWidth-thin);
  `,
  thick: css`
    border-bottom-width: var(--borderWidth-thick);
  `,
} as const;

export const borderLeftWidth: Record<keyof typeof vars.borderWidth, LinariaClassName> = {
  none: css`
    border-left-width: var(--borderWidth-none);
  `,
  thin: css`
    border-left-width: var(--borderWidth-thin);
  `,
  thick: css`
    border-left-width: var(--borderWidth-thick);
  `,
} as const;
