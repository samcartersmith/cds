import React, { memo, useCallback } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { pictogramWrapperSize, tileSize } from '@cbhq/cds-common/tokens/tile';
import { TileBaseProps } from '@cbhq/cds-common/types';

import { Pictogram } from '../illustrations';
import { VStack } from '../layout/VStack';
import { TextLabel2 } from '../typography';
import { useOverflowTextStyles } from '../utils/overflow';

/**
 * @danger this component is for internal use only
 */
export const Tile = memo(({ pictogram, title }: TileBaseProps) => {
  const [shouldOverflow, toggleShouldOverflow] = useToggler(false);
  const overflowTextStyles = useOverflowTextStyles(shouldOverflow);

  const handleMouseEnter = useCallback(() => {
    toggleShouldOverflow.toggleOn();
  }, [toggleShouldOverflow]);
  const handleMouseLeave = useCallback(() => {
    toggleShouldOverflow.toggleOff();
  }, [toggleShouldOverflow]);

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      gap={1}
      spacing={1}
      width={tileSize}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VStack
        justifyContent="center"
        alignItems="center"
        minHeight={pictogramWrapperSize}
        minWidth={pictogramWrapperSize}
      >
        {/* Pictogram size is a close estimation of maxWidth and maxHeight based on Figma specs which vary by Pictogram type */}
        <Pictogram name={pictogram} scaleMultiplier={0.9} />
      </VStack>
      <TextLabel2 align="center" dangerouslySetClassName={overflowTextStyles} as="p">
        {title}
      </TextLabel2>
    </VStack>
  );
});
