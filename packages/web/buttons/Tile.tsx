import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { pictogramWrapperSize, tileSize } from '@cbhq/cds-common/tokens/tile';
import { TileBaseProps } from '@cbhq/cds-common/types';

import { DotCount } from '../dots/DotCount';
import { Pictogram } from '../illustrations';
import { VStack } from '../layout/VStack';
import { TextLabel2 } from '../typography';
import { useOverflowTextStyles } from '../utils/overflow';

/**
 * @danger this component is for internal use only
 */
export const Tile = memo(({ pictogram, title, count, showOverflow }: TileBaseProps) => {
  const [shouldOverflow, toggleShouldOverflow] = useToggler(false);
  const overflowTextStyles = useOverflowTextStyles(shouldOverflow);

  const handleShowOverflow = useCallback(() => {
    toggleShouldOverflow.toggleOn();
  }, [toggleShouldOverflow]);
  const handleHideOverflow = useCallback(() => {
    toggleShouldOverflow.toggleOff();
  }, [toggleShouldOverflow]);

  useEffect(() => {
    if (showOverflow) {
      handleShowOverflow();
    } else {
      handleHideOverflow();
    }
  }, [showOverflow, handleShowOverflow, handleHideOverflow]);

  /* Pictogram size is a close estimation of maxWidth and maxHeight based on Figma specs which vary by Pictogram type */
  const renderPictogram = useMemo(() => {
    return count ? (
      <DotCount count={count} pin="top-end">
        <Pictogram name={pictogram} scaleMultiplier={0.9} />
      </DotCount>
    ) : (
      <Pictogram name={pictogram} scaleMultiplier={0.9} />
    );
  }, [count, pictogram]);

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      gap={1}
      spacing={1}
      width={tileSize}
      onMouseEnter={handleShowOverflow}
      onMouseLeave={handleHideOverflow}
    >
      <VStack
        justifyContent="center"
        alignItems="center"
        minHeight={pictogramWrapperSize}
        minWidth={pictogramWrapperSize}
      >
        {renderPictogram}
      </VStack>
      <TextLabel2 align="center" dangerouslySetClassName={overflowTextStyles} as="p">
        {title}
      </TextLabel2>
    </VStack>
  );
});
