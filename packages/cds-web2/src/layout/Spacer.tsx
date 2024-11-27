import React, { memo } from 'react';

import type { StaticStyleProps } from '../styles/styleProps';

import { type PolymorphicBoxProps, Box } from './Box';

export type SpacerBaseProps = {
  /** Space in the horizontal direction */
  horizontal?: StaticStyleProps['padding'];
  /** Space in the vertical direction */
  vertical?: StaticStyleProps['padding'];
  /** Max space in the horizontal direction */
  maxHorizontal?: StaticStyleProps['padding'];
  /** Max space in the vertical direction */
  maxVertical?: StaticStyleProps['padding'];
  /** Min space in the horizontal direction */
  minHorizontal?: StaticStyleProps['padding'];
  /** Min space in the vertical direction */
  minVertical?: StaticStyleProps['padding'];
};

export type SpacerProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  SpacerBaseProps
>;

export const Spacer = memo(
  <AsComponent extends React.ElementType = 'span'>({
    as = 'span' as AsComponent,
    flexGrow,
    flexShrink,
    flexBasis,
    horizontal,
    vertical,
    maxHorizontal,
    maxVertical,
    minHorizontal,
    minVertical,
    ...props
  }: SpacerProps<AsComponent>) => {
    const isFixedSize = horizontal !== undefined || vertical !== undefined;

    return (
      <Box
        aria-hidden="true"
        as={as}
        flexBasis={flexBasis ?? isFixedSize ? undefined : 1}
        flexGrow={flexGrow ?? isFixedSize ? 0 : 1}
        flexShrink={flexShrink ?? isFixedSize ? 0 : 1}
        height={vertical && `calc(${vertical} * var(--space-1))`}
        maxHeight={maxVertical && `calc(${maxVertical} * var(--space-1))`}
        maxWidth={maxHorizontal && `calc(${maxHorizontal} * var(--space-1))`}
        minHeight={minVertical && `calc(${minVertical} * var(--space-1))`}
        minWidth={minHorizontal && `calc(${minHorizontal} * var(--space-1))`}
        role="presentation"
        width={horizontal && `calc(${horizontal} * var(--space-1))`}
        {...props}
      />
    );
  },
);

Spacer.displayName = 'Spacer';
