import React, { memo, useCallback, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { denseTileSize, tileSize as normalTileSize } from '@cbhq/cds-common/tokens/tile';
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
  const overflowTextStyles = getOverflowTextStyles(
    showOverflow !== undefined ? showOverflow : shouldOverflow,
  );
  const tileSize = useScaleConditional({ dense: denseTileSize, normal: normalTileSize });

  const handleShowOverflow = useCallback(() => {
    if (showOverflow === undefined) {
      toggleShouldOverflow.toggleOn();
    }
  }, [toggleShouldOverflow, showOverflow]);

  const handleHideOverflow = useCallback(() => {
    if (showOverflow === undefined) {
      toggleShouldOverflow.toggleOff();
    }
  }, [toggleShouldOverflow, showOverflow]);

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

  return (
    <VStack
      alignItems="center"
      gap={1}
      justifyContent="center"
      onMouseEnter={handleShowOverflow}
      onMouseLeave={handleHideOverflow}
      spacing={1}
      width={tileSize}
    >
      <VStack alignItems="center" justifyContent="center">
        {renderContent}
      </VStack>
      <TextLabel2 align="center" as="p" className={overflowTextStyles}>
        {title}
      </TextLabel2>
    </VStack>
  );
});
