import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { denseTileSize, tileSize } from '@cbhq/cds-common/tokens/tile';
import { TileBaseProps } from '@cbhq/cds-common/types';

import { DotCount } from '../dots/DotCount';
import { VStack } from '../layout/VStack';
import { TextLabel2 } from '../typography';
import { getOverflowTextStyles } from '../utils/overflow';

/**
 * @danger this component is for internal use only
 */
export const Tile = memo(({ title, count, showOverflow, children }: TileBaseProps) => {
  const [shouldOverflow, toggleShouldOverflow] = useToggler(false);
  const overflowTextStyles = getOverflowTextStyles(shouldOverflow);
  const isDense = useScaleDensity() === 'dense';

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

  /* If count is provided, wrap the children in a DotCount */
  const renderContent = useMemo(() => {
    return count ? (
      <DotCount count={count} pin="top-end">
        {children}
      </DotCount>
    ) : (
      children
    );
  }, [children, count]);

  const computedTileSize = useMemo(() => {
    return isDense ? denseTileSize : tileSize;
  }, [isDense]);

  return (
    <VStack
      alignItems="center"
      gap={1}
      justifyContent="center"
      onMouseEnter={handleShowOverflow}
      onMouseLeave={handleHideOverflow}
      spacing={1}
      width={computedTileSize}
    >
      <VStack alignItems="center" justifyContent="center">
        {renderContent}
      </VStack>
      <TextLabel2 align="center" as="p" dangerouslySetClassName={overflowTextStyles}>
        {title}
      </TextLabel2>
    </VStack>
  );
});
