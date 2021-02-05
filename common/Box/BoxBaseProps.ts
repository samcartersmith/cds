import React from 'react';

import { PaletteBackground } from '@cds/theme';

import { FixedValue, PercentageValue, SpacingStyles } from '../types';

export type DimensionValue = 'auto' | FixedValue | PercentageValue;

export interface DimensionStyles {
  height?: DimensionValue;
  maxHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  minHeight?: DimensionValue;
  minWidth?: DimensionValue;
  width?: DimensionValue;
}

export type FlexAxisValue = 'flex-start' | 'flex-end' | 'center';

export type FlexAlignCommon = FlexAxisValue | 'stretch';

export type FlexSpaceCommon = 'space-between' | 'space-around';

export interface FlexStyles {
  alignContent?: FlexAlignCommon | FlexSpaceCommon;
  alignItems?: FlexAlignCommon | 'baseline';
  alignSelf?: FlexAlignCommon | 'auto' | 'baseline';
  flexBasis?: number | string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?: FlexAxisValue | FlexSpaceCommon | 'space-evenly';
}

export interface PositionStyles {
  bottom?: DimensionValue;
  left?: DimensionValue;
  position?: 'absolute' | 'relative';
  right?: DimensionValue;
  top?: DimensionValue;
  zIndex?: number;
}

export interface BoxBaseProps extends DimensionStyles, FlexStyles, SpacingStyles, PositionStyles {
  /** Set the background color of the box. */
  background?: Exclude<PaletteBackground, 'divider' | 'stroke'>;
  /** Add a border around the box. */
  bordered?: boolean;
  children?: React.ReactNode;
  /** Round the corners of the box. */
  rounded?: boolean;
}
