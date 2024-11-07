import React, { memo } from 'react';
import { SharedProps } from '@cbhq/cds-common';
import { SpacerBaseProps } from '@cbhq/cds-common/types/SpacerBaseProps';
import { getSpacerStyle } from '@cbhq/cds-common/utils/getSpacerStyle';

import { spacing } from '../tokens';
import { DynamicElement } from '../types';

export type SpacerProps = DynamicElement<SpacerBaseProps, 'span' | 'div' | 'li'> & SharedProps;

/**
 * Spacer component is for adding spacing gap between two dom nodes. If no horizontal or vertical
 * spacing size is provided, Spacer will stretch to fill up available space left in the parent container.
 */
export const Spacer = memo(function Spacer({
  as: Component = 'span',
  flexGrow,
  flexShrink,
  flexBasis,
  horizontal,
  vertical,
  maxHorizontal,
  maxVertical,
  minHorizontal,
  minVertical,
  testID,
}: SpacerProps) {
  return (
    <Component
      aria-hidden="true"
      data-testid={testID}
      role="presentation"
      style={getSpacerStyle({
        flexGrow,
        flexShrink,
        flexBasis,
        horizontal,
        vertical,
        maxHorizontal,
        maxVertical,
        minHorizontal,
        minVertical,
        spacingScaleValues: spacing,
      })}
    />
  );
});
