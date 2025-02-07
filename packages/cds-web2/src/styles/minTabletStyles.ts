/**
 * These styles are used to power component style props.
 */
import { type LinariaClassName, css } from '@linaria/core';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';

import type { DynamicStyleProps } from './styleProps';

export const dynamic: Record<keyof DynamicStyleProps, LinariaClassName> = {
  width: css`
    @media (min-width: 768px) {
      width: var(--minTablet-width);
    }
  `,
  height: css`
    @media (min-width: 768px) {
      height: var(--minTablet-height);
    }
  `,
  minWidth: css`
    @media (min-width: 768px) {
      min-width: var(--minTablet-minWidth);
    }
  `,
  minHeight: css`
    @media (min-width: 768px) {
      min-height: var(--minTablet-minHeight);
    }
  `,
  maxWidth: css`
    @media (min-width: 768px) {
      max-width: var(--minTablet-maxWidth);
    }
  `,
  maxHeight: css`
    @media (min-width: 768px) {
      max-height: var(--minTablet-maxHeight);
    }
  `,
  aspectRatio: css`
    @media (min-width: 768px) {
      aspect-ratio: var(--minTablet-aspectRatio);
    }
  `,
  top: css`
    @media (min-width: 768px) {
      top: var(--minTablet-top);
    }
  `,
  bottom: css`
    @media (min-width: 768px) {
      bottom: var(--minTablet-bottom);
    }
  `,
  left: css`
    @media (min-width: 768px) {
      left: var(--minTablet-left);
    }
  `,
  right: css`
    @media (min-width: 768px) {
      right: var(--minTablet-right);
    }
  `,
  transform: css`
    @media (min-width: 768px) {
      transform: var(--minTablet-transform);
    }
  `,
  flexBasis: css`
    @media (min-width: 768px) {
      flex-basis: var(--minTablet-flexBasis);
    }
  `,
  flexShrink: css`
    @media (min-width: 768px) {
      flex-shrink: var(--minTablet-flexShrink);
    }
  `,
  flexGrow: css`
    @media (min-width: 768px) {
      flex-grow: var(--minTablet-flexGrow);
    }
  `,
  gridTemplateColumns: css`
    @media (min-width: 768px) {
      grid-template-columns: var(--minTablet-gridTemplateColumns);
    }
  `,
  gridTemplateRows: css`
    @media (min-width: 768px) {
      grid-template-rows: var(--minTablet-gridTemplateRows);
    }
  `,
  gridTemplateAreas: css`
    @media (min-width: 768px) {
      grid-template-areas: var(--minTablet-gridTemplateAreas);
    }
  `,
  gridTemplate: css`
    @media (min-width: 768px) {
      grid-template: var(--minTablet-gridTemplate);
    }
  `,
  gridAutoColumns: css`
    @media (min-width: 768px) {
      grid-auto-columns: var(--minTablet-gridAutoColumns);
    }
  `,
  gridAutoRows: css`
    @media (min-width: 768px) {
      grid-auto-rows: var(--minTablet-gridAutoRows);
    }
  `,
  gridAutoFlow: css`
    @media (min-width: 768px) {
      grid-auto-flow: var(--minTablet-gridAutoFlow);
    }
  `,
  grid: css`
    @media (min-width: 768px) {
      grid: var(--minTablet-grid);
    }
  `,
  gridRowStart: css`
    @media (min-width: 768px) {
      grid-row-start: var(--minTablet-gridRowStart);
    }
  `,
  gridColumnStart: css`
    @media (min-width: 768px) {
      grid-column-start: var(--minTablet-gridColumnStart);
    }
  `,
  gridRowEnd: css`
    @media (min-width: 768px) {
      grid-row-end: var(--minTablet-gridRowEnd);
    }
  `,
  gridColumnEnd: css`
    @media (min-width: 768px) {
      grid-column-end: var(--minTablet-gridColumnEnd);
    }
  `,
  gridRow: css`
    @media (min-width: 768px) {
      grid-row: var(--minTablet-gridRow);
    }
  `,
  gridColumn: css`
    @media (min-width: 768px) {
      grid-column: var(--minTablet-gridColumn);
    }
  `,
  gridArea: css`
    @media (min-width: 768px) {
      grid-area: var(--minTablet-gridArea);
    }
  `,
  opacity: css`
    @media (min-width: 768px) {
      opacity: var(--minTablet-opacity);
    }
  `,
  zIndex: css`
    @media (min-width: 768px) {
      z-index: var(--zIndex);
    }
  `,
} as const;

export const color: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media (min-width: 768px) {
      color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media (min-width: 768px) {
      color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media (min-width: 768px) {
      color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media (min-width: 768px) {
      color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media (min-width: 768px) {
      color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media (min-width: 768px) {
      color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media (min-width: 768px) {
      color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media (min-width: 768px) {
      color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media (min-width: 768px) {
      color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media (min-width: 768px) {
      color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media (min-width: 768px) {
      color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media (min-width: 768px) {
      color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media (min-width: 768px) {
      color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media (min-width: 768px) {
      color: var(--color-bgSecondary);
    }
  `,
  bgSecondaryWash: css`
    @media (min-width: 768px) {
      color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media (min-width: 768px) {
      color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media (min-width: 768px) {
      color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media (min-width: 768px) {
      color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media (min-width: 768px) {
      color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media (min-width: 768px) {
      color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media (min-width: 768px) {
      color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 768px) {
      color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media (min-width: 768px) {
      color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media (min-width: 768px) {
      color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media (min-width: 768px) {
      color: var(--color-bgLineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 768px) {
      color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media (min-width: 768px) {
      color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media (min-width: 768px) {
      color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media (min-width: 768px) {
      color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 768px) {
      color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 768px) {
      color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 768px) {
      color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 768px) {
      color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 768px) {
      color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 768px) {
      color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 768px) {
      color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 768px) {
      color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 768px) {
      color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 768px) {
      color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 768px) {
      color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 768px) {
      color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 768px) {
      color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 768px) {
      color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 768px) {
      color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 768px) {
      color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const background: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media (min-width: 768px) {
      background-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media (min-width: 768px) {
      background-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media (min-width: 768px) {
      background-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media (min-width: 768px) {
      background-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media (min-width: 768px) {
      background-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media (min-width: 768px) {
      background-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media (min-width: 768px) {
      background-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media (min-width: 768px) {
      background-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgSecondary);
    }
  `,
  bgSecondaryWash: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 768px) {
      background-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgLineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media (min-width: 768px) {
      background-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 768px) {
      background-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 768px) {
      background-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 768px) {
      background-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 768px) {
      background-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 768px) {
      background-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const borderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgSecondary);
    }
  `,
  bgSecondaryWash: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgLineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 768px) {
      border-style: solid;
      border-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const hoverColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-fg);
      }
    }
  `,
  fgInverse: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-fgInverse);
      }
    }
  `,
  fgMuted: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-fgMuted);
      }
    }
  `,
  fgPrimary: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-fgPrimary);
      }
    }
  `,
  fgPositive: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-fgPositive);
      }
    }
  `,
  fgNegative: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-fgNegative);
      }
    }
  `,
  fgWarning: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-fgWarning);
      }
    }
  `,
  // Background
  bg: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bg);
      }
    }
  `,
  bgAlternate: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgAlternate);
      }
    }
  `,
  bgInverse: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgInverse);
      }
    }
  `,
  bgOverlay: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgOverlay);
      }
    }
  `,
  bgPrimary: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgPrimary);
      }
    }
  `,
  bgPrimaryWash: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgPrimaryWash);
      }
    }
  `,
  bgSecondary: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgSecondary);
      }
    }
  `,
  bgSecondaryWash: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgSecondaryWash);
      }
    }
  `,
  bgNegative: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgNegative);
      }
    }
  `,
  bgNegativeWash: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgNegativeWash);
      }
    }
  `,
  bgPositive: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgPositive);
      }
    }
  `,
  bgPositiveWash: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgPositiveWash);
      }
    }
  `,
  bgWarning: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgWarning);
      }
    }
  `,
  bgWarningWash: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgWarningWash);
      }
    }
  `,
  currentColor: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-currentColor);
      }
    }
  `,
  // Line
  bgLine: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgLine);
      }
    }
  `,
  bgLineInverse: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgLineInverse);
      }
    }
  `,
  bgLineHeavy: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgLineHeavy);
      }
    }
  `,
  linePrimary: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgLinePrimary);
      }
    }
  `,
  bgLinePrimarySubtle: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgLinePrimarySubtle);
      }
    }
  `,
  // Elevation
  bgElevation1: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgElevation1);
      }
    }
  `,
  bgElevation2: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-bgElevation2);
      }
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentSubtleGreen);
      }
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentBoldGreen);
      }
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentSubtleBlue);
      }
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentBoldBlue);
      }
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentSubtlePurple);
      }
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentBoldPurple);
      }
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentSubtleYellow);
      }
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentBoldYellow);
      }
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentSubtleRed);
      }
    }
  `,
  accentBoldRed: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentBoldRed);
      }
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentSubtleGray);
      }
    }
  `,
  accentBoldGray: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-accentBoldGray);
      }
    }
  `,
  transparent: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-transparent);
      }
    }
  `,
  transparentHover: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-transparentHover);
      }
    }
  `,
  transparentPressed: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-transparentPressed);
      }
    }
  `,
  transparentDisabled: css`
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-transparentDisabled);
      }
    }
  `,
} as const;

export const hoverBackground: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-fg);
      }
    }
  `,
  fgInverse: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-fgInverse);
      }
    }
  `,
  fgMuted: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-fgMuted);
      }
    }
  `,
  fgPrimary: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-fgPrimary);
      }
    }
  `,
  fgPositive: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-fgPositive);
      }
    }
  `,
  fgNegative: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-fgNegative);
      }
    }
  `,
  fgWarning: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-fgWarning);
      }
    }
  `,
  // Background
  bg: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bg);
      }
    }
  `,
  bgAlternate: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgAlternate);
      }
    }
  `,
  bgInverse: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgInverse);
      }
    }
  `,
  bgOverlay: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgOverlay);
      }
    }
  `,
  bgPrimary: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgPrimary);
      }
    }
  `,
  bgPrimaryWash: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgPrimaryWash);
      }
    }
  `,
  bgSecondary: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgSecondary);
      }
    }
  `,
  bgSecondaryWash: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgSecondaryWash);
      }
    }
  `,
  bgNegative: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgNegative);
      }
    }
  `,
  bgNegativeWash: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgNegativeWash);
      }
    }
  `,
  bgPositive: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgPositive);
      }
    }
  `,
  bgPositiveWash: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgPositiveWash);
      }
    }
  `,
  bgWarning: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgWarning);
      }
    }
  `,
  bgWarningWash: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgWarningWash);
      }
    }
  `,
  currentColor: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-currentColor);
      }
    }
  `,
  // Line
  bgLine: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgLine);
      }
    }
  `,
  bgLineInverse: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgLineInverse);
      }
    }
  `,
  bgLineHeavy: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgLineHeavy);
      }
    }
  `,
  linePrimary: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgLinePrimary);
      }
    }
  `,
  bgLinePrimarySubtle: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgLinePrimarySubtle);
      }
    }
  `,
  // Elevation
  bgElevation1: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgElevation1);
      }
    }
  `,
  bgElevation2: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-bgElevation2);
      }
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentSubtleGreen);
      }
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentBoldGreen);
      }
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentSubtleBlue);
      }
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentBoldBlue);
      }
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentSubtlePurple);
      }
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentBoldPurple);
      }
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentSubtleYellow);
      }
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentBoldYellow);
      }
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentSubtleRed);
      }
    }
  `,
  accentBoldRed: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentBoldRed);
      }
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentSubtleGray);
      }
    }
  `,
  accentBoldGray: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-accentBoldGray);
      }
    }
  `,
  transparent: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-transparent);
      }
    }
  `,
  transparentHover: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-transparentHover);
      }
    }
  `,
  transparentPressed: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-transparentPressed);
      }
    }
  `,
  transparentDisabled: css`
    @media (min-width: 768px) {
      &:hover {
        background-color: var(--color-transparentDisabled);
      }
    }
  `,
} as const;

export const hoverBorderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-fg);
      }
    }
  `,
  fgInverse: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-fgInverse);
      }
    }
  `,
  fgMuted: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-fgMuted);
      }
    }
  `,
  fgPrimary: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-fgPrimary);
      }
    }
  `,
  fgPositive: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-fgPositive);
      }
    }
  `,
  fgNegative: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-fgNegative);
      }
    }
  `,
  fgWarning: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-fgWarning);
      }
    }
  `,
  // Background
  bg: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bg);
      }
    }
  `,
  bgAlternate: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgAlternate);
      }
    }
  `,
  bgInverse: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgInverse);
      }
    }
  `,
  bgOverlay: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgOverlay);
      }
    }
  `,
  bgPrimary: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgPrimary);
      }
    }
  `,
  bgPrimaryWash: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgPrimaryWash);
      }
    }
  `,
  bgSecondary: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgSecondary);
      }
    }
  `,
  bgSecondaryWash: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgSecondary);
      }
    }
  `,
  bgNegative: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgNegative);
      }
    }
  `,
  bgNegativeWash: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgNegativeWash);
      }
    }
  `,
  bgPositive: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgPositive);
      }
    }
  `,
  bgPositiveWash: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgPositiveWash);
      }
    }
  `,
  bgWarning: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgWarning);
      }
    }
  `,
  bgWarningWash: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgWarningWash);
      }
    }
  `,
  currentColor: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-currentColor);
      }
    }
  `,
  // Line
  bgLine: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgLine);
      }
    }
  `,
  bgLineInverse: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgLineInverse);
      }
    }
  `,
  bgLineHeavy: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgLineHeavy);
      }
    }
  `,
  linePrimary: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgLinePrimary);
      }
    }
  `,
  bgLinePrimarySubtle: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgLinePrimarySubtle);
      }
    }
  `,
  // Elevation
  bgElevation1: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgElevation1);
      }
    }
  `,
  bgElevation2: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-bgElevation2);
      }
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentSubtleGreen);
      }
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentBoldGreen);
      }
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentSubtleBlue);
      }
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentBoldBlue);
      }
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentSubtlePurple);
      }
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentBoldPurple);
      }
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentSubtleYellow);
      }
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentBoldYellow);
      }
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentSubtleRed);
      }
    }
  `,
  accentBoldRed: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentBoldRed);
      }
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentSubtleGray);
      }
    }
  `,
  accentBoldGray: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-accentBoldGray);
      }
    }
  `,
  transparent: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-transparent);
      }
    }
  `,
  transparentHover: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-transparentHover);
      }
    }
  `,
  transparentPressed: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-transparentPressed);
      }
    }
  `,
  transparentDisabled: css`
    @media (min-width: 768px) {
      &:hover {
        border-color: var(--color-transparentDisabled);
      }
    }
  `,
} as const;

export const borderWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderTopWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-top-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-top-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-top-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-top-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-top-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-top-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderRightWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-right-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-right-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-right-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-right-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-right-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-right-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderBottomWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-bottom-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-bottom-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-bottom-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-bottom-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-bottom-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-bottom-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderLeftWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-left-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-left-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-left-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-left-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-left-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-left-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 768px) {
      border-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 768px) {
      border-top-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 768px) {
      border-top-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 768px) {
      border-bottom-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media (min-width: 768px) {
      border-bottom-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const fontFamily: Record<ThemeVars.FontFamily, LinariaClassName> = {
  display1: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-display1);
    }
  `,
  display2: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-display2);
    }
  `,
  display3: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-display3);
    }
  `,
  title1: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-title1);
    }
  `,
  title2: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-title2);
    }
  `,
  title3: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-title3);
    }
  `,
  title4: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-title4);
    }
  `,
  headline: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-headline);
    }
  `,
  body: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-body);
    }
  `,
  label1: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-label1);
    }
  `,
  label2: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-label2);
    }
  `,
  caption: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-caption);
    }
  `,
  legal: css`
    @media (min-width: 768px) {
      font-family: var(--fontFamily-legal);
    }
  `,
} as const;

export const fontSize: Record<ThemeVars.FontSize, LinariaClassName> = {
  display1: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-display1);
    }
  `,
  display2: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-display2);
    }
  `,
  display3: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-display3);
    }
  `,
  title1: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-title1);
    }
  `,
  title2: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-title2);
    }
  `,
  title3: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-title3);
    }
  `,
  title4: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-title4);
    }
  `,
  headline: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-headline);
    }
  `,
  body: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-body);
    }
  `,
  label1: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-label1);
    }
  `,
  label2: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-label2);
    }
  `,
  caption: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-caption);
    }
  `,
  legal: css`
    @media (min-width: 768px) {
      font-size: var(--fontSize-legal);
    }
  `,
} as const;

export const fontWeight: Record<ThemeVars.FontWeight, LinariaClassName> = {
  display1: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-display1);
    }
  `,
  display2: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-display2);
    }
  `,
  display3: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-display3);
    }
  `,
  title1: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-title1);
    }
  `,
  title2: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-title2);
    }
  `,
  title3: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-title3);
    }
  `,
  title4: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-title4);
    }
  `,
  headline: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-headline);
    }
  `,
  body: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-body);
    }
  `,
  label1: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-label1);
    }
  `,
  label2: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-label2);
    }
  `,
  caption: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-caption);
    }
  `,
  legal: css`
    @media (min-width: 768px) {
      font-weight: var(--fontWeight-legal);
    }
  `,
} as const;

export const lineHeight: Record<ThemeVars.LineHeight, LinariaClassName> = {
  display1: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-display1);
    }
  `,
  display2: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-display2);
    }
  `,
  display3: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-display3);
    }
  `,
  title1: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-title1);
    }
  `,
  title2: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-title2);
    }
  `,
  title3: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-title3);
    }
  `,
  title4: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-title4);
    }
  `,
  headline: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-headline);
    }
  `,
  body: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-body);
    }
  `,
  label1: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-label1);
    }
  `,
  label2: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-label2);
    }
  `,
  caption: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-caption);
    }
  `,
  legal: css`
    @media (min-width: 768px) {
      line-height: var(--lineHeight-legal);
    }
  `,
} as const;

export const textDecoration = {
  none: css`
    @media (min-width: 768px) {
      text-decoration: none;
    }
  `,
  underline: css`
    @media (min-width: 768px) {
      text-decoration: underline;
    }
  `,
  overline: css`
    @media (min-width: 768px) {
      text-decoration: overline;
    }
  `,
  'line-through': css`
    @media (min-width: 768px) {
      text-decoration: line-through;
    }
  `,
  'underline overline': css`
    @media (min-width: 768px) {
      text-decoration: underline overline;
    }
  `,
  'underline double': css`
    @media (min-width: 768px) {
      text-decoration: underline double;
    }
  `,
} as const;

export const textDecorationThickness = {
  auto: css`
    @media (min-width: 768px) {
      text-decoration-thickness: auto;
    }
  `,
  'from-font': css`
    @media (min-width: 768px) {
      text-decoration-thickness: from-font;
    }
  `,
  thin: css`
    @media (min-width: 768px) {
      text-decoration-thickness: thin;
    }
  `,
  medium: css`
    @media (min-width: 768px) {
      text-decoration-thickness: medium;
    }
  `,
  thick: css`
    @media (min-width: 768px) {
      text-decoration-thickness: thick;
    }
  `,
} as const;

export const textDecorationColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgSecondary);
    }
  `,
  bgSecondaryWash: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgLineHeavy);
    }
  `,
  linePrimary: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-transparent);
    }
  `,
  transparentHover: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-transparentHover);
    }
  `,
  transparentPressed: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-transparentPressed);
    }
  `,
  transparentDisabled: css`
    @media (min-width: 768px) {
      text-decoration-color: var(--color-transparentDisabled);
    }
  `,
} as const;

export const textTransform = {
  none: css`
    @media (min-width: 768px) {
      text-transform: none;
    }
  `,
  uppercase: css`
    @media (min-width: 768px) {
      text-transform: uppercase;
    }
  `,
  lowercase: css`
    @media (min-width: 768px) {
      text-transform: lowercase;
    }
  `,
  capitalize: css`
    @media (min-width: 768px) {
      text-transform: capitalize;
    }
  `,
} as const;

export const userSelect = {
  none: css`
    @media (min-width: 768px) {
      user-select: none;
    }
  `,
  text: css`
    @media (min-width: 768px) {
      user-select: text;
    }
  `,
  all: css`
    @media (min-width: 768px) {
      user-select: all;
    }
  `,
  auto: css`
    @media (min-width: 768px) {
      user-select: auto;
    }
  `,
} as const;

export const display = {
  none: css`
    @media (min-width: 768px) {
      display: none;
    }
  `,
  block: css`
    @media (min-width: 768px) {
      display: block;
    }
  `,
  inbgLine: css`
    @media (min-width: 768px) {
      display: inline;
    }
  `,
  'inline-block': css`
    @media (min-width: 768px) {
      display: inline-block;
    }
  `,
  flex: css`
    @media (min-width: 768px) {
      display: flex;
    }
  `,
  'inline-flex': css`
    @media (min-width: 768px) {
      display: inline-flex;
    }
  `,
  grid: css`
    @media (min-width: 768px) {
      display: grid;
    }
  `,
  'inline-grid': css`
    @media (min-width: 768px) {
      display: inline-grid;
    }
  `,
  contents: css`
    @media (min-width: 768px) {
      display: contents;
    }
  `,
  'flow-root': css`
    @media (min-width: 768px) {
      display: flow-root;
    }
  `,
} as const;

export const overflow = {
  auto: css`
    @media (min-width: 768px) {
      overflow: auto;
    }
  `,
  visible: css`
    @media (min-width: 768px) {
      overflow: visible;
    }
  `,
  hidden: css`
    @media (min-width: 768px) {
      overflow: hidden;
    }
  `,
  clip: css`
    @media (min-width: 768px) {
      overflow: clip;
    }
  `,
  scroll: css`
    @media (min-width: 768px) {
      overflow: scroll;
    }
  `,
} as const;

export const gap = {
  '0': css`
    @media (min-width: 768px) {
      gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      gap: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      gap: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      gap: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      gap: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      gap: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      gap: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      gap: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      gap: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      gap: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      gap: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      gap: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      gap: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      gap: var(--space-10);
    }
  `,
} as const;

export const columnGap = {
  '0': css`
    @media (min-width: 768px) {
      column-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      column-gap: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      column-gap: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      column-gap: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      column-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      column-gap: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      column-gap: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      column-gap: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      column-gap: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      column-gap: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      column-gap: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      column-gap: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      column-gap: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      column-gap: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      column-gap: var(--space-10);
    }
  `,
} as const;

export const rowGap = {
  '0': css`
    @media (min-width: 768px) {
      row-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      row-gap: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      row-gap: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      row-gap: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      row-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      row-gap: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      row-gap: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      row-gap: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      row-gap: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      row-gap: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      row-gap: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      row-gap: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      row-gap: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      row-gap: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      row-gap: var(--space-10);
    }
  `,
} as const;

export const justifyContent = {
  normal: css`
    @media (min-width: 768px) {
      justify-content: normal;
    }
  `,
  center: css`
    @media (min-width: 768px) {
      justify-content: center;
    }
  `,
  start: css`
    @media (min-width: 768px) {
      justify-content: start;
    }
  `,
  end: css`
    @media (min-width: 768px) {
      justify-content: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 768px) {
      justify-content: flex-end;
    }
  `,
  left: css`
    @media (min-width: 768px) {
      justify-content: left;
    }
  `,
  right: css`
    @media (min-width: 768px) {
      justify-content: right;
    }
  `,
  'space-between': css`
    @media (min-width: 768px) {
      justify-content: space-between;
    }
  `,
  'space-around': css`
    @media (min-width: 768px) {
      justify-content: space-around;
    }
  `,
  'space-evenly': css`
    @media (min-width: 768px) {
      justify-content: space-evenly;
    }
  `,
  stretch: css`
    @media (min-width: 768px) {
      justify-content: stretch;
    }
  `,
} as const;

export const alignContent = {
  normal: css`
    @media (min-width: 768px) {
      align-content: normal;
    }
  `,
  center: css`
    @media (min-width: 768px) {
      align-content: center;
    }
  `,
  start: css`
    @media (min-width: 768px) {
      align-content: start;
    }
  `,
  end: css`
    @media (min-width: 768px) {
      align-content: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 768px) {
      align-content: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 768px) {
      align-content: flex-end;
    }
  `,
  'space-between': css`
    @media (min-width: 768px) {
      align-content: space-between;
    }
  `,
  'space-around': css`
    @media (min-width: 768px) {
      align-content: space-around;
    }
  `,
  'space-evenly': css`
    @media (min-width: 768px) {
      align-content: space-evenly;
    }
  `,
  stretch: css`
    @media (min-width: 768px) {
      align-content: stretch;
    }
  `,
  baseline: css`
    @media (min-width: 768px) {
      align-content: baseline;
    }
  `,
  'first baseline': css`
    @media (min-width: 768px) {
      align-content: first baseline;
    }
  `,
  'last baseline': css`
    @media (min-width: 768px) {
      align-content: last baseline;
    }
  `,
} as const;

export const alignItems = {
  normal: css`
    @media (min-width: 768px) {
      align-items: normal;
    }
  `,
  center: css`
    @media (min-width: 768px) {
      align-items: center;
    }
  `,
  start: css`
    @media (min-width: 768px) {
      align-items: start;
    }
  `,
  end: css`
    @media (min-width: 768px) {
      align-items: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 768px) {
      align-items: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 768px) {
      align-items: flex-end;
    }
  `,
  'self-start': css`
    @media (min-width: 768px) {
      align-items: self-start;
    }
  `,
  'self-end': css`
    @media (min-width: 768px) {
      align-items: self-end;
    }
  `,
  stretch: css`
    @media (min-width: 768px) {
      align-items: stretch;
    }
  `,
  baseline: css`
    @media (min-width: 768px) {
      align-items: baseline;
    }
  `,
  'first baseline': css`
    @media (min-width: 768px) {
      align-items: first baseline;
    }
  `,
  'last baseline': css`
    @media (min-width: 768px) {
      align-items: last baseline;
    }
  `,
} as const;

export const alignSelf = {
  auto: css`
    @media (min-width: 768px) {
      align-self: auto;
    }
  `,
  normal: css`
    @media (min-width: 768px) {
      align-self: normal;
    }
  `,
  center: css`
    @media (min-width: 768px) {
      align-self: center;
    }
  `,
  start: css`
    @media (min-width: 768px) {
      align-self: start;
    }
  `,
  end: css`
    @media (min-width: 768px) {
      align-self: end;
    }
  `,
  'flex-start': css`
    @media (min-width: 768px) {
      align-self: flex-start;
    }
  `,
  'flex-end': css`
    @media (min-width: 768px) {
      align-self: flex-end;
    }
  `,
  'self-start': css`
    @media (min-width: 768px) {
      align-self: self-start;
    }
  `,
  'self-end': css`
    @media (min-width: 768px) {
      align-self: self-end;
    }
  `,
  stretch: css`
    @media (min-width: 768px) {
      align-self: stretch;
    }
  `,
  baseline: css`
    @media (min-width: 768px) {
      align-self: baseline;
    }
  `,
  'first baseline': css`
    @media (min-width: 768px) {
      align-self: first baseline;
    }
  `,
  'last baseline': css`
    @media (min-width: 768px) {
      align-self: last baseline;
    }
  `,
} as const;

export const flexDirection = {
  row: css`
    @media (min-width: 768px) {
      flex-direction: row;
    }
  `,
  'row-reverse': css`
    @media (min-width: 768px) {
      flex-direction: row-reverse;
    }
  `,
  column: css`
    @media (min-width: 768px) {
      flex-direction: column;
    }
  `,
  'column-reverse': css`
    @media (min-width: 768px) {
      flex-direction: column-reverse;
    }
  `,
} as const;

export const flexWrap = {
  nowrap: css`
    @media (min-width: 768px) {
      flex-wrap: nowrap;
    }
  `,
  wrap: css`
    @media (min-width: 768px) {
      flex-wrap: wrap;
    }
  `,
  'wrap-reverse': css`
    @media (min-width: 768px) {
      flex-wrap: wrap-reverse;
    }
  `,
} as const;

export const position = {
  static: css`
    @media (min-width: 768px) {
      position: static;
    }
  `,
  relative: css`
    @media (min-width: 768px) {
      position: relative;
    }
  `,
  absolute: css`
    @media (min-width: 768px) {
      position: absolute;
    }
  `,
  fixed: css`
    @media (min-width: 768px) {
      position: fixed;
    }
  `,
  sticky: css`
    @media (min-width: 768px) {
      position: sticky;
    }
  `,
} as const;

export const padding: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
      padding-left: var(--space-0);
      padding-right: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.25);
      padding-bottom: var(--space-0\\.25);
      padding-left: var(--space-0\\.25);
      padding-right: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.5);
      padding-bottom: var(--space-0\\.5);
      padding-left: var(--space-0\\.5);
      padding-right: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.75);
      padding-bottom: var(--space-0\\.75);
      padding-left: var(--space-0\\.75);
      padding-right: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
      padding-left: var(--space-1);
      padding-right: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-1\\.5);
      padding-bottom: var(--space-1\\.5);
      padding-left: var(--space-1\\.5);
      padding-right: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
      padding-left: var(--space-2);
      padding-right: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
      padding-left: var(--space-3);
      padding-right: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
      padding-left: var(--space-5);
      padding-right: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
      padding-left: var(--space-6);
      padding-right: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
      padding-left: var(--space-7);
      padding-right: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
      padding-left: var(--space-8);
      padding-right: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
      padding-left: var(--space-9);
      padding-right: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
      padding-left: var(--space-10);
      padding-right: var(--space-10);
    }
  `,
} as const;

export const paddingX: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0);
      padding-right: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0\\.25);
      padding-right: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0\\.5);
      padding-right: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0\\.75);
      padding-right: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      padding-left: var(--space-1);
      padding-right: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      padding-left: var(--space-1\\.5);
      padding-right: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      padding-left: var(--space-2);
      padding-right: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      padding-left: var(--space-3);
      padding-right: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      padding-left: var(--space-5);
      padding-right: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      padding-left: var(--space-6);
      padding-right: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      padding-left: var(--space-7);
      padding-right: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      padding-left: var(--space-8);
      padding-right: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      padding-left: var(--space-9);
      padding-right: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      padding-left: var(--space-10);
      padding-right: var(--space-10);
    }
  `,
} as const;

export const paddingY: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.25);
      padding-bottom: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.5);
      padding-bottom: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.75);
      padding-bottom: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-1\\.5);
      padding-bottom: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingTop: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      padding-top: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      padding-top: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      padding-top: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      padding-top: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      padding-top: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      padding-top: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      padding-top: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      padding-top: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      padding-top: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      padding-top: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      padding-top: var(--space-10);
    }
  `,
} as const;

export const paddingBottom: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingLeft: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      padding-left: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      padding-left: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      padding-left: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      padding-left: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      padding-left: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      padding-left: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      padding-left: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      padding-left: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      padding-left: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      padding-left: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      padding-left: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      padding-left: var(--space-10);
    }
  `,
} as const;

export const paddingRight: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      padding-right: var(--space-0);
    }
  `,
  '0.25': css`
    @media (min-width: 768px) {
      padding-right: var(--space-0\\.25);
    }
  `,
  '0.5': css`
    @media (min-width: 768px) {
      padding-right: var(--space-0\\.5);
    }
  `,
  '0.75': css`
    @media (min-width: 768px) {
      padding-right: var(--space-0\\.75);
    }
  `,
  '1': css`
    @media (min-width: 768px) {
      padding-right: var(--space-1);
    }
  `,
  '1.5': css`
    @media (min-width: 768px) {
      padding-right: var(--space-1\\.5);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      padding-right: var(--space-2);
    }
  `,
  '3': css`
    @media (min-width: 768px) {
      padding-right: var(--space-3);
    }
  `,
  '4': css`
    @media (min-width: 768px) {
      padding-right: var(--space-4);
    }
  `,
  '5': css`
    @media (min-width: 768px) {
      padding-right: var(--space-5);
    }
  `,
  '6': css`
    @media (min-width: 768px) {
      padding-right: var(--space-6);
    }
  `,
  '7': css`
    @media (min-width: 768px) {
      padding-right: var(--space-7);
    }
  `,
  '8': css`
    @media (min-width: 768px) {
      padding-right: var(--space-8);
    }
  `,
  '9': css`
    @media (min-width: 768px) {
      padding-right: var(--space-9);
    }
  `,
  '10': css`
    @media (min-width: 768px) {
      padding-right: var(--space-10);
    }
  `,
} as const;

export const margin: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
      margin-right: calc(-1 * var(--space-0));
      margin-left: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.25));
      margin-bottom: calc(-1 * var(--space-0\\.25));
      margin-right: calc(-1 * var(--space-0\\.25));
      margin-left: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.5));
      margin-bottom: calc(-1 * var(--space-0\\.5));
      margin-right: calc(-1 * var(--space-0\\.5));
      margin-left: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.75));
      margin-bottom: calc(-1 * var(--space-0\\.75));
      margin-right: calc(-1 * var(--space-0\\.75));
      margin-left: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
      margin-right: calc(-1 * var(--space-1));
      margin-left: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-1\\.5));
      margin-bottom: calc(-1 * var(--space-1\\.5));
      margin-right: calc(-1 * var(--space-1\\.5));
      margin-left: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
      margin-right: calc(-1 * var(--space-2));
      margin-left: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
      margin-right: calc(-1 * var(--space-3));
      margin-left: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
      margin-right: calc(-1 * var(--space-4));
      margin-left: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
      margin-right: calc(-1 * var(--space-5));
      margin-left: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
      margin-right: calc(-1 * var(--space-6));
      margin-left: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
      margin-right: calc(-1 * var(--space-7));
      margin-left: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
      margin-right: calc(-1 * var(--space-8));
      margin-left: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
      margin-right: calc(-1 * var(--space-9));
      margin-left: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
      margin-right: calc(-1 * var(--space-10));
      margin-left: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginX: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0));
      margin-left: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0\\.25));
      margin-left: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0\\.5));
      margin-left: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0\\.75));
      margin-left: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-1));
      margin-left: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-1\\.5));
      margin-left: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-2));
      margin-left: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-3));
      margin-left: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-4));
      margin-left: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-5));
      margin-left: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-6));
      margin-left: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-7));
      margin-left: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-8));
      margin-left: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-9));
      margin-left: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-10));
      margin-left: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginY: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.25));
      margin-bottom: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.5));
      margin-bottom: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.75));
      margin-bottom: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-1\\.5));
      margin-bottom: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginTop: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 768px) {
      margin-top: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginBottom: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 768px) {
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginRight: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 768px) {
      margin-right: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginLeft: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-0\\.25));
    }
  `,
  '-0.5': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-0\\.5));
    }
  `,
  '-0.75': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-0\\.75));
    }
  `,
  '-1': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-1\\.5));
    }
  `,
  '-2': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media (min-width: 768px) {
      margin-left: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const elevation: Record<ElevationLevels, LinariaClassName> = {
  '0': css``,
  '1': css`
    @media (min-width: 768px) {
      background-color: var(--color-bgElevation1);
      box-shadow: var(--shadow-elevation1);
    }
  `,
  '2': css`
    @media (min-width: 768px) {
      background-color: var(--color-bgElevation2);
      box-shadow: var(--shadow-elevation2);
    }
  `,
} as const;

export const textAlign = {
  start: css`
    @media (min-width: 768px) {
      text-align: start;
    }
  `,
  end: css`
    @media (min-width: 768px) {
      text-align: end;
    }
  `,
  center: css`
    @media (min-width: 768px) {
      text-align: center;
    }
  `,
  justify: css`
    @media (min-width: 768px) {
      text-align: justify;
    }
  `,
} as const;

export const visibility = {
  hidden: css`
    @media (min-width: 768px) {
      visibility: hidden;
    }
  `,
  visible: css`
    @media (min-width: 768px) {
      visibility: visible;
    }
  `,
} as const;
