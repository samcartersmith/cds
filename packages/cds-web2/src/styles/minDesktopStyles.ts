/**
 * These styles are used to power component style props.
 */
import { type LinariaClassName, css } from '@linaria/core';
import type { ThemeVars } from '@cbhq/cds-common2/new/vars';

import type { DynamicStyleProps } from './styleProps';

export const dynamic: Record<keyof DynamicStyleProps, LinariaClassName> = {
  width: css`
    @media (min-width: 1024px) {
      width: var(--minDesktop-width);
    }
  `,
  height: css`
    @media (min-width: 1024px) {
      height: var(--minDesktop-height);
    }
  `,
  minWidth: css`
    @media (min-width: 1024px) {
      min-width: var(--minDesktop-minWidth);
    }
  `,
  minHeight: css`
    @media (min-width: 1024px) {
      min-height: var(--minDesktop-minHeight);
    }
  `,
  maxWidth: css`
    @media (min-width: 1024px) {
      max-width: var(--minDesktop-maxWidth);
    }
  `,
  maxHeight: css`
    @media (min-width: 1024px) {
      max-height: var(--minDesktop-maxHeight);
    }
  `,
  aspectRatio: css`
    @media (min-width: 1024px) {
      aspect-ratio: var(--minDesktop-aspectRatio);
    }
  `,
  top: css`
    @media (min-width: 1024px) {
      top: var(--minDesktop-top);
    }
  `,
  bottom: css`
    @media (min-width: 1024px) {
      bottom: var(--minDesktop-bottom);
    }
  `,
  left: css`
    @media (min-width: 1024px) {
      left: var(--minDesktop-left);
    }
  `,
  right: css`
    @media (min-width: 1024px) {
      right: var(--minDesktop-right);
    }
  `,
  transform: css`
    @media (min-width: 1024px) {
      transform: var(--minDesktop-transform);
    }
  `,
  flexBasis: css`
    @media (min-width: 1024px) {
      flex-basis: var(--minDesktop-flexBasis);
    }
  `,
  flexShrink: css`
    @media (min-width: 1024px) {
      flex-shrink: var(--minDesktop-flexShrink);
    }
  `,
  flexGrow: css`
    @media (min-width: 1024px) {
      flex-grow: var(--minDesktop-flexGrow);
    }
  `,
  gridTemplateColumns: css`
    @media (min-width: 1024px) {
      grid-template-columns: var(--minDesktop-gridTemplateColumns);
    }
  `,
  gridTemplateRows: css`
    @media (min-width: 1024px) {
      grid-template-rows: var(--minDesktop-gridTemplateRows);
    }
  `,
  gridTemplateAreas: css`
    @media (min-width: 1024px) {
      grid-template-areas: var(--minDesktop-gridTemplateAreas);
    }
  `,
  gridTemplate: css`
    @media (min-width: 1024px) {
      grid-template: var(--minDesktop-gridTemplate);
    }
  `,
  gridAutoColumns: css`
    @media (min-width: 1024px) {
      grid-auto-columns: var(--minDesktop-gridAutoColumns);
    }
  `,
  gridAutoRows: css`
    @media (min-width: 1024px) {
      grid-auto-rows: var(--minDesktop-gridAutoRows);
    }
  `,
  gridAutoFlow: css`
    @media (min-width: 1024px) {
      grid-auto-flow: var(--minDesktop-gridAutoFlow);
    }
  `,
  grid: css`
    @media (min-width: 1024px) {
      grid: var(--minDesktop-grid);
    }
  `,
  gridRowStart: css`
    @media (min-width: 1024px) {
      grid-row-start: var(--minDesktop-gridRowStart);
    }
  `,
  gridColumnStart: css`
    @media (min-width: 1024px) {
      grid-column-start: var(--minDesktop-gridColumnStart);
    }
  `,
  gridRowEnd: css`
    @media (min-width: 1024px) {
      grid-row-end: var(--minDesktop-gridRowEnd);
    }
  `,
  gridColumnEnd: css`
    @media (min-width: 1024px) {
      grid-column-end: var(--minDesktop-gridColumnEnd);
    }
  `,
  gridRow: css`
    @media (min-width: 1024px) {
      grid-row: var(--minDesktop-gridRow);
    }
  `,
  gridColumn: css`
    @media (min-width: 1024px) {
      grid-column: var(--minDesktop-gridColumn);
    }
  `,
  gridArea: css`
    @media (min-width: 1024px) {
      grid-area: var(--minDesktop-gridArea);
    }
  `,
  opacity: css`
    @media (min-width: 1024px) {
      opacity: var(--minDesktop-opacity);
    }
  `,
} as const;

export const color: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  textForeground: css`
    @media (min-width: 1024px) {
      color: var(--color-textForeground);
    }
  `,
  textForegroundInverse: css`
    @media (min-width: 1024px) {
      color: var(--color-textForegroundInverse);
    }
  `,
  textForegroundMuted: css`
    @media (min-width: 1024px) {
      color: var(--color-textForegroundMuted);
    }
  `,
  textPrimary: css`
    @media (min-width: 1024px) {
      color: var(--color-textPrimary);
    }
  `,
  textPositive: css`
    @media (min-width: 1024px) {
      color: var(--color-textPositive);
    }
  `,
  textNegative: css`
    @media (min-width: 1024px) {
      color: var(--color-textNegative);
    }
  `,
  textWarning: css`
    @media (min-width: 1024px) {
      color: var(--color-textWarning);
    }
  `,
  // Background
  background: css`
    @media (min-width: 1024px) {
      color: var(--color-background);
    }
  `,
  backgroundAlternate: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundAlternate);
    }
  `,
  backgroundInverse: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundInverse);
    }
  `,
  backgroundOverlay: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundOverlay);
    }
  `,
  backgroundPrimary: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPrimary);
    }
  `,
  backgroundPrimaryWash: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPrimaryWash);
    }
  `,
  backgroundSecondary: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundSecondary);
    }
  `,
  backgroundSecondaryWash: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundSecondaryWash);
    }
  `,
  backgroundNegative: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundNegative);
    }
  `,
  backgroundNegativeWash: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundNegativeWash);
    }
  `,
  backgroundPositive: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPositive);
    }
  `,
  backgroundPositiveWash: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPositiveWash);
    }
  `,
  backgroundWarning: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundWarning);
    }
  `,
  backgroundWarningWash: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 1024px) {
      color: var(--color-currentColor);
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPrimaryHover);
    }
  `,
  backgroundPrimaryPressed: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPrimaryPressed);
    }
  `,
  backgroundPrimaryDisabled: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondaryHover: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundSecondaryHover);
    }
  `,
  backgroundSecondaryPressed: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundSecondaryPressed);
    }
  `,
  backgroundSecondaryDisabled: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegativeHover: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundNegativeHover);
    }
  `,
  backgroundNegativePressed: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundNegativePressed);
    }
  `,
  backgroundNegativeDisabled: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositiveHover: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPositiveHover);
    }
  `,
  backgroundPositivePressed: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPositivePressed);
    }
  `,
  backgroundPositiveDisabled: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundPositiveDisabled);
    }
  `,
  // Line
  line: css`
    @media (min-width: 1024px) {
      color: var(--color-line);
    }
  `,
  lineInverse: css`
    @media (min-width: 1024px) {
      color: var(--color-lineInverse);
    }
  `,
  lineHeavy: css`
    @media (min-width: 1024px) {
      color: var(--color-lineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 1024px) {
      color: var(--color-linePrimary);
    }
  `,
  linePrimaryLight: css`
    @media (min-width: 1024px) {
      color: var(--color-linePrimaryLight);
    }
  `,
  // Elevation
  backgroundElevation1: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundElevation1);
    }
  `,
  backgroundElevation2: css`
    @media (min-width: 1024px) {
      color: var(--color-backgroundElevation2);
    }
  `,
  // Icon
  iconForeground: css`
    @media (min-width: 1024px) {
      color: var(--color-iconForeground);
    }
  `,
  iconForegroundInverse: css`
    @media (min-width: 1024px) {
      color: var(--color-iconForegroundInverse);
    }
  `,
  iconForegroundMuted: css`
    @media (min-width: 1024px) {
      color: var(--color-iconForegroundMuted);
    }
  `,
  iconPrimary: css`
    @media (min-width: 1024px) {
      color: var(--color-iconPrimary);
    }
  `,
  iconPositive: css`
    @media (min-width: 1024px) {
      color: var(--color-iconPositive);
    }
  `,
  iconNegative: css`
    @media (min-width: 1024px) {
      color: var(--color-iconNegative);
    }
  `,
  iconWarning: css`
    @media (min-width: 1024px) {
      color: var(--color-iconWarning);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 1024px) {
      color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 1024px) {
      color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 1024px) {
      color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 1024px) {
      color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 1024px) {
      color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 1024px) {
      color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 1024px) {
      color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 1024px) {
      color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 1024px) {
      color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 1024px) {
      color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 1024px) {
      color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 1024px) {
      color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 1024px) {
      color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 1024px) {
      color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 1024px) {
      color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 1024px) {
      color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const background: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  textForeground: css`
    @media (min-width: 1024px) {
      background-color: var(--color-textForeground);
    }
  `,
  textForegroundInverse: css`
    @media (min-width: 1024px) {
      background-color: var(--color-textForegroundInverse);
    }
  `,
  textForegroundMuted: css`
    @media (min-width: 1024px) {
      background-color: var(--color-textForegroundMuted);
    }
  `,
  textPrimary: css`
    @media (min-width: 1024px) {
      background-color: var(--color-textPrimary);
    }
  `,
  textPositive: css`
    @media (min-width: 1024px) {
      background-color: var(--color-textPositive);
    }
  `,
  textNegative: css`
    @media (min-width: 1024px) {
      background-color: var(--color-textNegative);
    }
  `,
  textWarning: css`
    @media (min-width: 1024px) {
      background-color: var(--color-textWarning);
    }
  `,
  // Background
  background: css`
    @media (min-width: 1024px) {
      background-color: var(--color-background);
    }
  `,
  backgroundAlternate: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundAlternate);
    }
  `,
  backgroundInverse: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundInverse);
    }
  `,
  backgroundOverlay: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundOverlay);
    }
  `,
  backgroundPrimary: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPrimary);
    }
  `,
  backgroundPrimaryWash: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPrimaryWash);
    }
  `,
  backgroundSecondary: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundSecondary);
    }
  `,
  backgroundSecondaryWash: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundSecondaryWash);
    }
  `,
  backgroundNegative: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundNegative);
    }
  `,
  backgroundNegativeWash: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundNegativeWash);
    }
  `,
  backgroundPositive: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPositive);
    }
  `,
  backgroundPositiveWash: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPositiveWash);
    }
  `,
  backgroundWarning: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundWarning);
    }
  `,
  backgroundWarningWash: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 1024px) {
      background-color: var(--color-currentColor);
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPrimaryHover);
    }
  `,
  backgroundPrimaryPressed: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPrimaryPressed);
    }
  `,
  backgroundPrimaryDisabled: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondaryHover: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundSecondaryHover);
    }
  `,
  backgroundSecondaryPressed: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundSecondaryPressed);
    }
  `,
  backgroundSecondaryDisabled: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegativeHover: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundNegativeHover);
    }
  `,
  backgroundNegativePressed: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundNegativePressed);
    }
  `,
  backgroundNegativeDisabled: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositiveHover: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPositiveHover);
    }
  `,
  backgroundPositivePressed: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPositivePressed);
    }
  `,
  backgroundPositiveDisabled: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundPositiveDisabled);
    }
  `,
  // Line
  line: css`
    @media (min-width: 1024px) {
      background-color: var(--color-line);
    }
  `,
  lineInverse: css`
    @media (min-width: 1024px) {
      background-color: var(--color-lineInverse);
    }
  `,
  lineHeavy: css`
    @media (min-width: 1024px) {
      background-color: var(--color-lineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 1024px) {
      background-color: var(--color-linePrimary);
    }
  `,
  linePrimaryLight: css`
    @media (min-width: 1024px) {
      background-color: var(--color-linePrimaryLight);
    }
  `,
  // Elevation
  backgroundElevation1: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundElevation1);
    }
  `,
  backgroundElevation2: css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundElevation2);
    }
  `,
  // Icon
  iconForeground: css`
    @media (min-width: 1024px) {
      background-color: var(--color-iconForeground);
    }
  `,
  iconForegroundInverse: css`
    @media (min-width: 1024px) {
      background-color: var(--color-iconForegroundInverse);
    }
  `,
  iconForegroundMuted: css`
    @media (min-width: 1024px) {
      background-color: var(--color-iconForegroundMuted);
    }
  `,
  iconPrimary: css`
    @media (min-width: 1024px) {
      background-color: var(--color-iconPrimary);
    }
  `,
  iconPositive: css`
    @media (min-width: 1024px) {
      background-color: var(--color-iconPositive);
    }
  `,
  iconNegative: css`
    @media (min-width: 1024px) {
      background-color: var(--color-iconNegative);
    }
  `,
  iconWarning: css`
    @media (min-width: 1024px) {
      background-color: var(--color-iconWarning);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 1024px) {
      background-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 1024px) {
      background-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 1024px) {
      background-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 1024px) {
      background-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 1024px) {
      background-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const borderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  textForeground: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-textForeground);
    }
  `,
  textForegroundInverse: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-textForegroundInverse);
    }
  `,
  textForegroundMuted: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-textForegroundMuted);
    }
  `,
  textPrimary: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-textPrimary);
    }
  `,
  textPositive: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-textPositive);
    }
  `,
  textNegative: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-textNegative);
    }
  `,
  textWarning: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-textWarning);
    }
  `,
  // Background
  background: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-background);
    }
  `,
  backgroundAlternate: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundAlternate);
    }
  `,
  backgroundInverse: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundInverse);
    }
  `,
  backgroundOverlay: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundOverlay);
    }
  `,
  backgroundPrimary: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPrimary);
    }
  `,
  backgroundPrimaryWash: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPrimaryWash);
    }
  `,
  backgroundSecondary: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundSecondary);
    }
  `,
  backgroundSecondaryWash: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundSecondaryWash);
    }
  `,
  backgroundNegative: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundNegative);
    }
  `,
  backgroundNegativeWash: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundNegativeWash);
    }
  `,
  backgroundPositive: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPositive);
    }
  `,
  backgroundPositiveWash: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPositiveWash);
    }
  `,
  backgroundWarning: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundWarning);
    }
  `,
  backgroundWarningWash: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-currentColor);
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPrimaryHover);
    }
  `,
  backgroundPrimaryPressed: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPrimaryPressed);
    }
  `,
  backgroundPrimaryDisabled: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondaryHover: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundSecondaryHover);
    }
  `,
  backgroundSecondaryPressed: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundSecondaryPressed);
    }
  `,
  backgroundSecondaryDisabled: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegativeHover: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundNegativeHover);
    }
  `,
  backgroundNegativePressed: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundNegativePressed);
    }
  `,
  backgroundNegativeDisabled: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositiveHover: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPositiveHover);
    }
  `,
  backgroundPositivePressed: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPositivePressed);
    }
  `,
  backgroundPositiveDisabled: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundPositiveDisabled);
    }
  `,
  // Line
  line: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-line);
    }
  `,
  lineInverse: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-lineInverse);
    }
  `,
  lineHeavy: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-lineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-linePrimary);
    }
  `,
  linePrimaryLight: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-linePrimaryLight);
    }
  `,
  // Elevation
  backgroundElevation1: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundElevation1);
    }
  `,
  backgroundElevation2: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-backgroundElevation2);
    }
  `,
  // Icon
  iconForeground: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-iconForeground);
    }
  `,
  iconForegroundInverse: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-iconForegroundInverse);
    }
  `,
  iconForegroundMuted: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-iconForegroundMuted);
    }
  `,
  iconPrimary: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-iconPrimary);
    }
  `,
  iconPositive: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-iconPositive);
    }
  `,
  iconNegative: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-iconNegative);
    }
  `,
  iconWarning: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-iconWarning);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 1024px) {
      border-style: solid;
      border-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const hoverColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  textForeground: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-textForeground);
      }
    }
  `,
  textForegroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-textForegroundInverse);
      }
    }
  `,
  textForegroundMuted: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-textForegroundMuted);
      }
    }
  `,
  textPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-textPrimary);
      }
    }
  `,
  textPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-textPositive);
      }
    }
  `,
  textNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-textNegative);
      }
    }
  `,
  textWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-textWarning);
      }
    }
  `,
  // Background
  background: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-background);
      }
    }
  `,
  backgroundAlternate: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundAlternate);
      }
    }
  `,
  backgroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundInverse);
      }
    }
  `,
  backgroundOverlay: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundOverlay);
      }
    }
  `,
  backgroundPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPrimary);
      }
    }
  `,
  backgroundPrimaryWash: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPrimaryWash);
      }
    }
  `,
  backgroundSecondary: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundSecondary);
      }
    }
  `,
  backgroundSecondaryWash: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundSecondaryWash);
      }
    }
  `,
  backgroundNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundNegative);
      }
    }
  `,
  backgroundNegativeWash: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundNegativeWash);
      }
    }
  `,
  backgroundPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPositive);
      }
    }
  `,
  backgroundPositiveWash: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPositiveWash);
      }
    }
  `,
  backgroundWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundWarning);
      }
    }
  `,
  backgroundWarningWash: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundWarningWash);
      }
    }
  `,
  currentColor: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-currentColor);
      }
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPrimaryHover);
      }
    }
  `,
  backgroundPrimaryPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPrimaryPressed);
      }
    }
  `,
  backgroundPrimaryDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPrimaryDisabled);
      }
    }
  `,
  backgroundSecondaryHover: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundSecondaryHover);
      }
    }
  `,
  backgroundSecondaryPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundSecondaryPressed);
      }
    }
  `,
  backgroundSecondaryDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundSecondaryDisabled);
      }
    }
  `,
  backgroundNegativeHover: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundNegativeHover);
      }
    }
  `,
  backgroundNegativePressed: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundNegativePressed);
      }
    }
  `,
  backgroundNegativeDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundNegativeDisabled);
      }
    }
  `,
  backgroundPositiveHover: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPositiveHover);
      }
    }
  `,
  backgroundPositivePressed: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPositivePressed);
      }
    }
  `,
  backgroundPositiveDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundPositiveDisabled);
      }
    }
  `,
  // Line
  line: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-line);
      }
    }
  `,
  lineInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-lineInverse);
      }
    }
  `,
  lineHeavy: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-lineHeavy);
      }
    }
  `,
  linePrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-linePrimary);
      }
    }
  `,
  linePrimaryLight: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-linePrimaryLight);
      }
    }
  `,
  // Elevation
  backgroundElevation1: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundElevation1);
      }
    }
  `,
  backgroundElevation2: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-backgroundElevation2);
      }
    }
  `,
  // Icon
  iconForeground: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-iconForeground);
      }
    }
  `,
  iconForegroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-iconForegroundInverse);
      }
    }
  `,
  iconForegroundMuted: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-iconForegroundMuted);
      }
    }
  `,
  iconPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-iconPrimary);
      }
    }
  `,
  iconPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-iconPositive);
      }
    }
  `,
  iconNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-iconNegative);
      }
    }
  `,
  iconWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-iconWarning);
      }
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentSubtleGreen);
      }
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentBoldGreen);
      }
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentSubtleBlue);
      }
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentBoldBlue);
      }
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentSubtlePurple);
      }
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentBoldPurple);
      }
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentSubtleYellow);
      }
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentBoldYellow);
      }
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentSubtleRed);
      }
    }
  `,
  accentBoldRed: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentBoldRed);
      }
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentSubtleGray);
      }
    }
  `,
  accentBoldGray: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-accentBoldGray);
      }
    }
  `,
  transparent: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-transparent);
      }
    }
  `,
  transparentHover: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-transparentHover);
      }
    }
  `,
  transparentPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-transparentPressed);
      }
    }
  `,
  transparentDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        color: var(--color-transparentDisabled);
      }
    }
  `,
} as const;

export const hoverBackground: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  textForeground: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-textForeground);
      }
    }
  `,
  textForegroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-textForegroundInverse);
      }
    }
  `,
  textForegroundMuted: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-textForegroundMuted);
      }
    }
  `,
  textPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-textPrimary);
      }
    }
  `,
  textPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-textPositive);
      }
    }
  `,
  textNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-textNegative);
      }
    }
  `,
  textWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-textWarning);
      }
    }
  `,
  // Background
  background: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-background);
      }
    }
  `,
  backgroundAlternate: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundAlternate);
      }
    }
  `,
  backgroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundInverse);
      }
    }
  `,
  backgroundOverlay: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundOverlay);
      }
    }
  `,
  backgroundPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPrimary);
      }
    }
  `,
  backgroundPrimaryWash: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPrimaryWash);
      }
    }
  `,
  backgroundSecondary: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundSecondary);
      }
    }
  `,
  backgroundSecondaryWash: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundSecondaryWash);
      }
    }
  `,
  backgroundNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundNegative);
      }
    }
  `,
  backgroundNegativeWash: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundNegativeWash);
      }
    }
  `,
  backgroundPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPositive);
      }
    }
  `,
  backgroundPositiveWash: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPositiveWash);
      }
    }
  `,
  backgroundWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundWarning);
      }
    }
  `,
  backgroundWarningWash: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundWarningWash);
      }
    }
  `,
  currentColor: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-currentColor);
      }
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPrimaryHover);
      }
    }
  `,
  backgroundPrimaryPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPrimaryPressed);
      }
    }
  `,
  backgroundPrimaryDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPrimaryDisabled);
      }
    }
  `,
  backgroundSecondaryHover: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundSecondaryHover);
      }
    }
  `,
  backgroundSecondaryPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundSecondaryPressed);
      }
    }
  `,
  backgroundSecondaryDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundSecondaryDisabled);
      }
    }
  `,
  backgroundNegativeHover: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundNegativeHover);
      }
    }
  `,
  backgroundNegativePressed: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundNegativePressed);
      }
    }
  `,
  backgroundNegativeDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundNegativeDisabled);
      }
    }
  `,
  backgroundPositiveHover: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPositiveHover);
      }
    }
  `,
  backgroundPositivePressed: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPositivePressed);
      }
    }
  `,
  backgroundPositiveDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundPositiveDisabled);
      }
    }
  `,
  // Line
  line: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-line);
      }
    }
  `,
  lineInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-lineInverse);
      }
    }
  `,
  lineHeavy: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-lineHeavy);
      }
    }
  `,
  linePrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-linePrimary);
      }
    }
  `,
  linePrimaryLight: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-linePrimaryLight);
      }
    }
  `,
  // Elevation
  backgroundElevation1: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundElevation1);
      }
    }
  `,
  backgroundElevation2: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-backgroundElevation2);
      }
    }
  `,
  // Icon
  iconForeground: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-iconForeground);
      }
    }
  `,
  iconForegroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-iconForegroundInverse);
      }
    }
  `,
  iconForegroundMuted: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-iconForegroundMuted);
      }
    }
  `,
  iconPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-iconPrimary);
      }
    }
  `,
  iconPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-iconPositive);
      }
    }
  `,
  iconNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-iconNegative);
      }
    }
  `,
  iconWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-iconWarning);
      }
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentSubtleGreen);
      }
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentBoldGreen);
      }
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentSubtleBlue);
      }
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentBoldBlue);
      }
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentSubtlePurple);
      }
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentBoldPurple);
      }
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentSubtleYellow);
      }
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentBoldYellow);
      }
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentSubtleRed);
      }
    }
  `,
  accentBoldRed: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentBoldRed);
      }
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentSubtleGray);
      }
    }
  `,
  accentBoldGray: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-accentBoldGray);
      }
    }
  `,
  transparent: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-transparent);
      }
    }
  `,
  transparentHover: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-transparentHover);
      }
    }
  `,
  transparentPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-transparentPressed);
      }
    }
  `,
  transparentDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        background-color: var(--color-transparentDisabled);
      }
    }
  `,
} as const;

export const hoverBorderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  textForeground: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-textForeground);
      }
    }
  `,
  textForegroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-textForegroundInverse);
      }
    }
  `,
  textForegroundMuted: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-textForegroundMuted);
      }
    }
  `,
  textPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-textPrimary);
      }
    }
  `,
  textPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-textPositive);
      }
    }
  `,
  textNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-textNegative);
      }
    }
  `,
  textWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-textWarning);
      }
    }
  `,
  // Background
  background: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-background);
      }
    }
  `,
  backgroundAlternate: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundAlternate);
      }
    }
  `,
  backgroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundInverse);
      }
    }
  `,
  backgroundOverlay: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundOverlay);
      }
    }
  `,
  backgroundPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPrimary);
      }
    }
  `,
  backgroundPrimaryWash: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPrimaryWash);
      }
    }
  `,
  backgroundSecondary: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundSecondary);
      }
    }
  `,
  backgroundSecondaryWash: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundSecondary);
      }
    }
  `,
  backgroundNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundNegative);
      }
    }
  `,
  backgroundNegativeWash: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundNegativeWash);
      }
    }
  `,
  backgroundPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPositive);
      }
    }
  `,
  backgroundPositiveWash: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPositiveWash);
      }
    }
  `,
  backgroundWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundWarning);
      }
    }
  `,
  backgroundWarningWash: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundWarningWash);
      }
    }
  `,
  currentColor: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-currentColor);
      }
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPrimaryHover);
      }
    }
  `,
  backgroundPrimaryPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPrimaryPressed);
      }
    }
  `,
  backgroundPrimaryDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPrimaryDisabled);
      }
    }
  `,
  backgroundSecondaryHover: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundSecondaryHover);
      }
    }
  `,
  backgroundSecondaryPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundSecondaryPressed);
      }
    }
  `,
  backgroundSecondaryDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundSecondaryDisabled);
      }
    }
  `,
  backgroundNegativeHover: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundNegativeHover);
      }
    }
  `,
  backgroundNegativePressed: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundNegativePressed);
      }
    }
  `,
  backgroundNegativeDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundNegativeDisabled);
      }
    }
  `,
  backgroundPositiveHover: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPositiveHover);
      }
    }
  `,
  backgroundPositivePressed: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPositivePressed);
      }
    }
  `,
  backgroundPositiveDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundPositiveDisabled);
      }
    }
  `,
  // Line
  line: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-line);
      }
    }
  `,
  lineInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-lineInverse);
      }
    }
  `,
  lineHeavy: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-lineHeavy);
      }
    }
  `,
  linePrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-linePrimary);
      }
    }
  `,
  linePrimaryLight: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-linePrimaryLight);
      }
    }
  `,
  // Elevation
  backgroundElevation1: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundElevation1);
      }
    }
  `,
  backgroundElevation2: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-backgroundElevation2);
      }
    }
  `,
  // Icon
  iconForeground: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-iconForeground);
      }
    }
  `,
  iconForegroundInverse: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-iconForegroundInverse);
      }
    }
  `,
  iconForegroundMuted: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-iconForegroundMuted);
      }
    }
  `,
  iconPrimary: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-iconPrimary);
      }
    }
  `,
  iconPositive: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-iconPositive);
      }
    }
  `,
  iconNegative: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-iconNegative);
      }
    }
  `,
  iconWarning: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-iconWarning);
      }
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentSubtleGreen);
      }
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentBoldGreen);
      }
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentSubtleBlue);
      }
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentBoldBlue);
      }
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentSubtlePurple);
      }
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentBoldPurple);
      }
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentSubtleYellow);
      }
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentBoldYellow);
      }
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentSubtleRed);
      }
    }
  `,
  accentBoldRed: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentBoldRed);
      }
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentSubtleGray);
      }
    }
  `,
  accentBoldGray: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-accentBoldGray);
      }
    }
  `,
  transparent: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-transparent);
      }
    }
  `,
  transparentHover: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-transparentHover);
      }
    }
  `,
  transparentPressed: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-transparentPressed);
      }
    }
  `,
  transparentDisabled: css`
    @media (min-width: 1024px) {
      &:hover {
        border-color: var(--color-transparentDisabled);
      }
    }
  `,
} as const;

export const borderWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderTopWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-top-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-top-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-top-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-top-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-top-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-top-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderRightWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-right-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-right-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-right-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-right-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-right-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-right-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderBottomWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-bottom-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-bottom-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-bottom-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-bottom-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-bottom-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-bottom-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderLeftWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-left-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-left-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-left-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-left-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-left-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-left-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 1024px) {
      border-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 1024px) {
      border-top-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 1024px) {
      border-top-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 1024px) {
      border-bottom-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 1024px) {
      border-bottom-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const fontFamily: Record<ThemeVars.FontFamily, LinariaClassName> = {
  display1: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-display1);
    }
  `,
  display2: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-display2);
    }
  `,
  display3: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-display3);
    }
  `,
  title1: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-title1);
    }
  `,
  title2: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-title2);
    }
  `,
  title3: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-title3);
    }
  `,
  title4: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-title4);
    }
  `,
  headline: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-headline);
    }
  `,
  body: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-body);
    }
  `,
  label1: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-label1);
    }
  `,
  label2: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-label2);
    }
  `,
  caption: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-caption);
    }
  `,
  legal: css`
    @media (min-width: 1024px) {
      font-family: var(--fontFamily-legal);
    }
  `,
} as const;

export const fontSize: Record<ThemeVars.FontSize, LinariaClassName> = {
  display1: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-display1);
    }
  `,
  display2: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-display2);
    }
  `,
  display3: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-display3);
    }
  `,
  title1: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title1);
    }
  `,
  title2: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title2);
    }
  `,
  title3: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title3);
    }
  `,
  title4: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title4);
    }
  `,
  headline: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-headline);
    }
  `,
  body: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-body);
    }
  `,
  label1: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-label1);
    }
  `,
  label2: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-label2);
    }
  `,
  caption: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-caption);
    }
  `,
  legal: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-legal);
    }
  `,
} as const;

export const fontWeight: Record<ThemeVars.FontWeight, LinariaClassName> = {
  display1: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-display1);
    }
  `,
  display2: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-display2);
    }
  `,
  display3: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-display3);
    }
  `,
  title1: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-title1);
    }
  `,
  title2: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-title2);
    }
  `,
  title3: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-title3);
    }
  `,
  title4: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-title4);
    }
  `,
  headline: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-headline);
    }
  `,
  body: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-body);
    }
  `,
  label1: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-label1);
    }
  `,
  label2: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-label2);
    }
  `,
  caption: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-caption);
    }
  `,
  legal: css`
    @media (min-width: 1024px) {
      font-weight: var(--fontWeight-legal);
    }
  `,
} as const;

export const lineHeight: Record<ThemeVars.LineHeight, LinariaClassName> = {
  display1: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-display1);
    }
  `,
  display2: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-display2);
    }
  `,
  display3: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-display3);
    }
  `,
  title1: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-title1);
    }
  `,
  title2: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-title2);
    }
  `,
  title3: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-title3);
    }
  `,
  title4: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-title4);
    }
  `,
  headline: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-headline);
    }
  `,
  body: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-body);
    }
  `,
  label1: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-label1);
    }
  `,
  label2: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-label2);
    }
  `,
  caption: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-caption);
    }
  `,
  legal: css`
    @media (min-width: 1024px) {
      line-height: var(--lineHeight-legal);
    }
  `,
} as const;

export const font: Record<ThemeVars.FontFamily, LinariaClassName> = {
  display1: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-display1);
      line-height: var(--lineHeight-display1);
      font-weight: var(--fontWeight-display1);
      font-family: var(--fontFamily-display1);
    }
  `,
  display2: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-display2);
      line-height: var(--lineHeight-display2);
      font-weight: var(--fontWeight-display2);
      font-family: var(--fontFamily-display2);
    }
  `,
  display3: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-display3);
      line-height: var(--lineHeight-display3);
      font-weight: var(--fontWeight-display3);
      font-family: var(--fontFamily-display3);
    }
  `,
  title1: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title1);
      line-height: var(--lineHeight-title1);
      font-weight: var(--fontWeight-title1);
      font-family: var(--fontFamily-title1);
    }
  `,
  title2: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title2);
      line-height: var(--lineHeight-title2);
      font-weight: var(--fontWeight-title2);
      font-family: var(--fontFamily-title2);
    }
  `,
  title3: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title3);
      line-height: var(--lineHeight-title3);
      font-weight: var(--fontWeight-title3);
      font-family: var(--fontFamily-title3);
    }
  `,
  title4: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-title4);
      line-height: var(--lineHeight-title4);
      font-weight: var(--fontWeight-title4);
      font-family: var(--fontFamily-title4);
    }
  `,
  headline: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-headline);
      line-height: var(--lineHeight-headline);
      font-weight: var(--fontWeight-headline);
      font-family: var(--fontFamily-headline);
    }
  `,
  body: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-body);
      line-height: var(--lineHeight-body);
      font-weight: var(--fontWeight-body);
      font-family: var(--fontFamily-body);
    }
  `,
  label1: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-label1);
      line-height: var(--lineHeight-label1);
      font-weight: var(--fontWeight-label1);
      font-family: var(--fontFamily-label1);
    }
  `,
  label2: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-label2);
      line-height: var(--lineHeight-label2);
      font-weight: var(--fontWeight-label2);
      font-family: var(--fontFamily-label2);
    }
  `,
  caption: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-caption);
      line-height: var(--lineHeight-caption);
      font-weight: var(--fontWeight-caption);
      font-family: var(--fontFamily-caption);
    }
  `,
  legal: css`
    @media (min-width: 1024px) {
      font-size: var(--fontSize-legal);
      line-height: var(--lineHeight-legal);
      font-weight: var(--fontWeight-legal);
      font-family: var(--fontFamily-legal);
    }
  `,
} as const;

export const textDecoration = {
  none: css`
    @media (min-width: 1024px) {
      text-decoration: none;
    }
  `,
  underline: css`
    @media (min-width: 1024px) {
      text-decoration: underline;
    }
  `,
  overline: css`
    @media (min-width: 1024px) {
      text-decoration: overline;
    }
  `,
  'line-through': css`
    @media (min-width: 1024px) {
      text-decoration: line-through;
    }
  `,
  'underline overline': css`
    @media (min-width: 1024px) {
      text-decoration: underline overline;
    }
  `,
  'underline double': css`
    @media (min-width: 1024px) {
      text-decoration: underline double;
    }
  `,
} as const;

export const textDecorationThickness = {
  auto: css`
    @media (min-width: 1024px) {
      text-decoration-thickness: auto;
    }
  `,
  'from-font': css`
    @media (min-width: 1024px) {
      text-decoration-thickness: from-font;
    }
  `,
  thin: css`
    @media (min-width: 1024px) {
      text-decoration-thickness: thin;
    }
  `,
  medium: css`
    @media (min-width: 1024px) {
      text-decoration-thickness: medium;
    }
  `,
  thick: css`
    @media (min-width: 1024px) {
      text-decoration-thickness: thick;
    }
  `,
} as const;

export const textDecorationColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  textForeground: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-textForeground);
    }
  `,
  textForegroundInverse: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-textForegroundInverse);
    }
  `,
  textForegroundMuted: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-textForegroundMuted);
    }
  `,
  textPrimary: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-textPrimary);
    }
  `,
  textPositive: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-textPositive);
    }
  `,
  textNegative: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-textNegative);
    }
  `,
  textWarning: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-textWarning);
    }
  `,
  // Background
  background: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-background);
    }
  `,
  backgroundAlternate: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundAlternate);
    }
  `,
  backgroundInverse: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundInverse);
    }
  `,
  backgroundOverlay: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundOverlay);
    }
  `,
  backgroundPrimary: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPrimary);
    }
  `,
  backgroundPrimaryWash: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPrimaryWash);
    }
  `,
  backgroundSecondary: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundSecondary);
    }
  `,
  backgroundSecondaryWash: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundSecondaryWash);
    }
  `,
  backgroundNegative: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundNegative);
    }
  `,
  backgroundNegativeWash: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundNegativeWash);
    }
  `,
  backgroundPositive: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPositive);
    }
  `,
  backgroundPositiveWash: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPositiveWash);
    }
  `,
  backgroundWarning: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundWarning);
    }
  `,
  backgroundWarningWash: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-currentColor);
    }
  `,
  // Background states
  backgroundPrimaryHover: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPrimaryHover);
    }
  `,
  backgroundPrimaryPressed: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPrimaryPressed);
    }
  `,
  backgroundPrimaryDisabled: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondaryHover: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundSecondaryHover);
    }
  `,
  backgroundSecondaryPressed: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundSecondaryPressed);
    }
  `,
  backgroundSecondaryDisabled: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegativeHover: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundNegativeHover);
    }
  `,
  backgroundNegativePressed: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundNegativePressed);
    }
  `,
  backgroundNegativeDisabled: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositiveHover: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPositiveHover);
    }
  `,
  backgroundPositivePressed: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPositivePressed);
    }
  `,
  backgroundPositiveDisabled: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundPositiveDisabled);
    }
  `,
  // Line
  line: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-line);
    }
  `,
  lineInverse: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-lineInverse);
    }
  `,
  lineHeavy: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-lineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-linePrimary);
    }
  `,
  linePrimaryLight: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-linePrimaryLight);
    }
  `,
  // Elevation
  backgroundElevation1: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundElevation1);
    }
  `,
  backgroundElevation2: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-backgroundElevation2);
    }
  `,
  // Icon
  iconForeground: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-iconForeground);
    }
  `,
  iconForegroundInverse: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-iconForegroundInverse);
    }
  `,
  iconForegroundMuted: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-iconForegroundMuted);
    }
  `,
  iconPrimary: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-iconPrimary);
    }
  `,
  iconPositive: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-iconPositive);
    }
  `,
  iconNegative: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-iconNegative);
    }
  `,
  iconWarning: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-iconWarning);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 1024px) {
      text-decoration-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const textTransform = {
  none: css`
    @media (min-width: 1024px) {
      text-transform: none;
    }
  `,
  uppercase: css`
    @media (min-width: 1024px) {
      text-transform: uppercase;
    }
  `,
  lowercase: css`
    @media (min-width: 1024px) {
      text-transform: lowercase;
    }
  `,
  capitalize: css`
    @media (min-width: 1024px) {
      text-transform: capitalize;
    }
  `,
} as const;

export const userSelect = {
  none: css`
    @media (min-width: 1024px) {
      user-select: none;
    }
  `,
  text: css`
    @media (min-width: 1024px) {
      user-select: text;
    }
  `,
  all: css`
    @media (min-width: 1024px) {
      user-select: all;
    }
  `,
  auto: css`
    @media (min-width: 1024px) {
      user-select: auto;
    }
  `,
} as const;

export const display = {
  block: css`
    @media (min-width: 1024px) {
      display: block;
    }
  `,
  inline: css`
    @media (min-width: 1024px) {
      display: inline;
    }
  `,
  'inline-block': css`
    @media (min-width: 1024px) {
      display: inline-block;
    }
  `,
  flex: css`
    @media (min-width: 1024px) {
      display: flex;
    }
  `,
  'inline-flex': css`
    @media (min-width: 1024px) {
      display: inline-flex;
    }
  `,
  grid: css`
    @media (min-width: 1024px) {
      display: grid;
    }
  `,
  'inline-grid': css`
    @media (min-width: 1024px) {
      display: inline-grid;
    }
  `,
  contents: css`
    @media (min-width: 1024px) {
      display: contents;
    }
  `,
  'flow-root': css`
    @media (min-width: 1024px) {
      display: flow-root;
    }
  `,
} as const;

export const overflow = {
  auto: css`
    @media (min-width: 1024px) {
      overflow: auto;
    }
  `,
  visible: css`
    @media (min-width: 1024px) {
      overflow: visible;
    }
  `,
  hidden: css`
    @media (min-width: 1024px) {
      overflow: hidden;
    }
  `,
  clip: css`
    @media (min-width: 1024px) {
      overflow: clip;
    }
  `,
  scroll: css`
    @media (min-width: 1024px) {
      overflow: scroll;
    }
  `,
} as const;

export const gap = {
  '0': css`
    @media (min-width: 1024px) {
      gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      gap: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      gap: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      gap: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      gap: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      gap: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      gap: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      gap: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      gap: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      gap: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      gap: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      gap: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      gap: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      gap: var(--space-10);
    }
  `,
} as const;

export const columnGap = {
  '0': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      column-gap: var(--space-10);
    }
  `,
} as const;

export const rowGap = {
  '0': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      row-gap: var(--space-10);
    }
  `,
} as const;

export const justifyContent = {
  normal: css`
    @media (min-width: 1024px) {
      justify-content: normal;
    }
  `,
  center: css`
    @media (min-width: 1024px) {
      justify-content: center;
    }
  `,
  start: css`
    @media (min-width: 1024px) {
      justify-content: start;
    }
  `,
  end: css`
    @media (min-width: 1024px) {
      justify-content: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 1024px) {
      justify-content: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 1024px) {
      justify-content: flex-end;
    }
  `,
  left: css`
    @media (min-width: 1024px) {
      justify-content: left;
    }
  `,
  right: css`
    @media (min-width: 1024px) {
      justify-content: right;
    }
  `,
  'space-between': css`
    @media (min-width: 1024px) {
      justify-content: space-between;
    }
  `,
  'space-around': css`
    @media (min-width: 1024px) {
      justify-content: space-around;
    }
  `,
  'space-evenly': css`
    @media (min-width: 1024px) {
      justify-content: space-evenly;
    }
  `,
  stretch: css`
    @media (min-width: 1024px) {
      justify-content: stretch;
    }
  `,
} as const;

export const alignContent = {
  normal: css`
    @media (min-width: 1024px) {
      align-content: normal;
    }
  `,
  center: css`
    @media (min-width: 1024px) {
      align-content: center;
    }
  `,
  start: css`
    @media (min-width: 1024px) {
      align-content: start;
    }
  `,
  end: css`
    @media (min-width: 1024px) {
      align-content: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 1024px) {
      align-content: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 1024px) {
      align-content: flex-end;
    }
  `,
  'space-between': css`
    @media (min-width: 1024px) {
      align-content: space-between;
    }
  `,
  'space-around': css`
    @media (min-width: 1024px) {
      align-content: space-around;
    }
  `,
  'space-evenly': css`
    @media (min-width: 1024px) {
      align-content: space-evenly;
    }
  `,
  stretch: css`
    @media (min-width: 1024px) {
      align-content: stretch;
    }
  `,
  baseline: css`
    @media (min-width: 1024px) {
      align-content: baseline;
    }
  `,
  'first baseline': css`
    @media (min-width: 1024px) {
      align-content: first baseline;
    }
  `,
  'last baseline': css`
    @media (min-width: 1024px) {
      align-content: last baseline;
    }
  `,
} as const;

export const alignItems = {
  normal: css`
    @media (min-width: 1024px) {
      align-items: normal;
    }
  `,
  center: css`
    @media (min-width: 1024px) {
      align-items: center;
    }
  `,
  start: css`
    @media (min-width: 1024px) {
      align-items: start;
    }
  `,
  end: css`
    @media (min-width: 1024px) {
      align-items: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 1024px) {
      align-items: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 1024px) {
      align-items: flex-end;
    }
  `,
  'self-start': css`
    @media (min-width: 1024px) {
      align-items: self-start;
    }
  `,
  'self-end': css`
    @media (min-width: 1024px) {
      align-items: self-end;
    }
  `,
  stretch: css`
    @media (min-width: 1024px) {
      align-items: stretch;
    }
  `,
  baseline: css`
    @media (min-width: 1024px) {
      align-items: baseline;
    }
  `,
  'first baseline': css`
    @media (min-width: 1024px) {
      align-items: first baseline;
    }
  `,
  'last baseline': css`
    @media (min-width: 1024px) {
      align-items: last baseline;
    }
  `,
} as const;

export const alignSelf = {
  auto: css`
    @media (min-width: 1024px) {
      align-self: auto;
    }
  `,
  normal: css`
    @media (min-width: 1024px) {
      align-self: normal;
    }
  `,
  center: css`
    @media (min-width: 1024px) {
      align-self: center;
    }
  `,
  start: css`
    @media (min-width: 1024px) {
      align-self: start;
    }
  `,
  end: css`
    @media (min-width: 1024px) {
      align-self: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 1024px) {
      align-self: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 1024px) {
      align-self: flex-end;
    }
  `,
  'self-start': css`
    @media (min-width: 1024px) {
      align-self: self-start;
    }
  `,
  'self-end': css`
    @media (min-width: 1024px) {
      align-self: self-end;
    }
  `,
  stretch: css`
    @media (min-width: 1024px) {
      align-self: stretch;
    }
  `,
  baseline: css`
    @media (min-width: 1024px) {
      align-self: baseline;
    }
  `,
  'first baseline': css`
    @media (min-width: 1024px) {
      align-self: first baseline;
    }
  `,
  'last baseline': css`
    @media (min-width: 1024px) {
      align-self: last baseline;
    }
  `,
} as const;

export const flexDirection = {
  row: css`
    @media (min-width: 1024px) {
      flex-direction: row;
    }
  `,
  'row-reverse': css`
    @media (min-width: 1024px) {
      flex-direction: row-reverse;
    }
  `,
  column: css`
    @media (min-width: 1024px) {
      flex-direction: column;
    }
  `,
  'column-reverse': css`
    @media (min-width: 1024px) {
      flex-direction: column-reverse;
    }
  `,
} as const;

export const flexWrap = {
  nowrap: css`
    @media (min-width: 1024px) {
      flex-wrap: nowrap;
    }
  `,
  wrap: css`
    @media (min-width: 1024px) {
      flex-wrap: wrap;
    }
  `,
  'wrap-reverse': css`
    @media (min-width: 1024px) {
      flex-wrap: wrap-reverse;
    }
  `,
} as const;

export const position = {
  static: css`
    @media (min-width: 1024px) {
      position: static;
    }
  `,
  relative: css`
    @media (min-width: 1024px) {
      position: relative;
    }
  `,
  absolute: css`
    @media (min-width: 1024px) {
      position: absolute;
    }
  `,
  fixed: css`
    @media (min-width: 1024px) {
      position: fixed;
    }
  `,
  sticky: css`
    @media (min-width: 1024px) {
      position: sticky;
    }
  `,
} as const;

export const zIndex: Record<ThemeVars.ZIndex, LinariaClassName> = {
  interactable: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-interactable);
    }
  `,
  navigation: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-navigation);
    }
  `,
  portal: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-portal);
    }
  `,
  popoverMenu: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-popoverMenu);
    }
  `,
  modal: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-modal);
    }
  `,
  dropdown: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-dropdown);
    }
  `,
  tooltip: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-tooltip);
    }
  `,
  toast: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-toast);
    }
  `,
  alert: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-alert);
    }
  `,
  max: css`
    @media (min-width: 1024px) {
      z-index: var(--zIndex-max);
    }
  `,
} as const;

export const padding: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
      padding-left: var(--space-0);
      padding-right: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.25);
      padding-bottom: var(--space-0\\.25);
      padding-left: var(--space-0\\.25);
      padding-right: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.5);
      padding-bottom: var(--space-0\\.5);
      padding-left: var(--space-0\\.5);
      padding-right: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.75);
      padding-bottom: var(--space-0\\.75);
      padding-left: var(--space-0\\.75);
      padding-right: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
      padding-left: var(--space-1);
      padding-right: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-1\\.5);
      padding-bottom: var(--space-1\\.5);
      padding-left: var(--space-1\\.5);
      padding-right: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
      padding-left: var(--space-2);
      padding-right: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
      padding-left: var(--space-3);
      padding-right: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
      padding-left: var(--space-5);
      padding-right: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
      padding-left: var(--space-6);
      padding-right: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
      padding-left: var(--space-7);
      padding-right: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
      padding-left: var(--space-8);
      padding-right: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
      padding-left: var(--space-9);
      padding-right: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
      padding-left: var(--space-10);
      padding-right: var(--space-10);
    }
  `,
} as const;

export const paddingX: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0);
      padding-right: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0\\.25);
      padding-right: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0\\.5);
      padding-right: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0\\.75);
      padding-right: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-1);
      padding-right: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-1\\.5);
      padding-right: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-2);
      padding-right: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-3);
      padding-right: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-5);
      padding-right: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-6);
      padding-right: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-7);
      padding-right: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-8);
      padding-right: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-9);
      padding-right: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-10);
      padding-right: var(--space-10);
    }
  `,
} as const;

export const paddingY: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.25);
      padding-bottom: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.5);
      padding-bottom: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.75);
      padding-bottom: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-1\\.5);
      padding-bottom: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingTop: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      padding-top: var(--space-10);
    }
  `,
} as const;

export const paddingBottom: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingLeft: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      padding-left: var(--space-10);
    }
  `,
} as const;

export const paddingRight: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 1024px) {
      padding-right: var(--space-10);
    }
  `,
} as const;

export const margin: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
      margin-right: calc(-1 * var(--space-0));
      margin-left: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.25));
      margin-bottom: calc(-1 * var(--space-0\\.25));
      margin-right: calc(-1 * var(--space-0\\.25));
      margin-left: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.5));
      margin-bottom: calc(-1 * var(--space-0\\.5));
      margin-right: calc(-1 * var(--space-0\\.5));
      margin-left: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.75));
      margin-bottom: calc(-1 * var(--space-0\\.75));
      margin-right: calc(-1 * var(--space-0\\.75));
      margin-left: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
      margin-right: calc(-1 * var(--space-1));
      margin-left: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-1\\.5));
      margin-bottom: calc(-1 * var(--space-1\\.5));
      margin-right: calc(-1 * var(--space-1\\.5));
      margin-left: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
      margin-right: calc(-1 * var(--space-2));
      margin-left: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
      margin-right: calc(-1 * var(--space-3));
      margin-left: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
      margin-right: calc(-1 * var(--space-4));
      margin-left: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
      margin-right: calc(-1 * var(--space-5));
      margin-left: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
      margin-right: calc(-1 * var(--space-6));
      margin-left: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
      margin-right: calc(-1 * var(--space-7));
      margin-left: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
      margin-right: calc(-1 * var(--space-8));
      margin-left: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
      margin-right: calc(-1 * var(--space-9));
      margin-left: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
      margin-right: calc(-1 * var(--space-10));
      margin-left: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginX: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0));
      margin-left: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0\\.25));
      margin-left: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0\\.5));
      margin-left: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0\\.75));
      margin-left: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-1));
      margin-left: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-1\\.5));
      margin-left: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-2));
      margin-left: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-3));
      margin-left: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-4));
      margin-left: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-5));
      margin-left: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-6));
      margin-left: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-7));
      margin-left: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-8));
      margin-left: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-9));
      margin-left: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-10));
      margin-left: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginY: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.25));
      margin-bottom: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.5));
      margin-bottom: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.75));
      margin-bottom: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-1\\.5));
      margin-bottom: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginTop: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 1024px) {
      margin-top: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginBottom: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 1024px) {
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginRight: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 1024px) {
      margin-right: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginLeft: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 1024px) {
      margin-left: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const elevation = {
  '1': css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundElevation1);
      box-shadow: var(--shadow-elevation1);
    }
  `,
  '2': css`
    @media (min-width: 1024px) {
      background-color: var(--color-backgroundElevation2);
      box-shadow: var(--shadow-elevation2);
    }
  `,
} as const;

export const textAlign = {
  start: css`
    @media (min-width: 1024px) {
      text-align: start;
    }
  `,
  end: css`
    @media (min-width: 1024px) {
      text-align: end;
    }
  `,
  center: css`
    @media (min-width: 1024px) {
      text-align: center;
    }
  `,
  justify: css`
    @media (min-width: 1024px) {
      text-align: justify;
    }
  `,
} as const;

export const visibility = {
  hidden: css`
    @media (min-width: 1024px) {
      visibility: hidden;
    }
  `,
  visible: css`
    @media (min-width: 1024px) {
      visibility: visible;
    }
  `,
} as const;
