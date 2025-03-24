import React, { memo, useCallback, useMemo, useState } from 'react';
import { css } from '@linaria/core';
import { tileSize } from '@cbhq/cds-common2/tokens/tile';
import { TileBaseProps } from '@cbhq/cds-common2/types/TileBaseProps';

import { DotCount } from '../dots/DotCount';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

const truncatedStyles = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const visibleStyles = css`
  overflow: visible;
  white-space: normal;
  hyphens: auto;
`;

/**
 * @danger this component is for internal use only
 */
export const Tile = memo(({ title, count, showOverflow, children }: TileBaseProps) => {
  const [shouldOverflow, setShouldOverflow] = useState(false);
  const overflowTextStyles = showOverflow ?? shouldOverflow ? visibleStyles : truncatedStyles;

  const handleShowOverflow = useCallback(() => {
    if (showOverflow === undefined) setShouldOverflow(true);
  }, [showOverflow]);

  const handleHideOverflow = useCallback(() => {
    if (showOverflow === undefined) setShouldOverflow(false);
  }, [showOverflow]);

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
      padding={1}
      width={tileSize} // TO DO: tileSize should come from ThemeVars.ControlSize
    >
      <VStack alignItems="center" justifyContent="center">
        {renderContent}
      </VStack>
      <Text as="p" className={overflowTextStyles} display="block" font="label2" textAlign="center">
        {title}
      </Text>
    </VStack>
  );
});
