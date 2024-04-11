import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { css } from 'linaria';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import {
  denseTileSize,
  pictogramScaleMultiplier,
  tileSize as normalTileSize,
} from '@cbhq/cds-common/tokens/tile';
import { IllustrationPictogramNames, SharedProps, TileBaseProps } from '@cbhq/cds-common/types';
import { isDevelopment } from '@cbhq/cds-utils';

import { Pictogram, PictogramName } from '../illustrations';
import { focusVisibleClassName, insetFocusRing } from '../styles/focus';
import { Pressable, PressableInternalProps } from '../system/Pressable';
import { borderRadius } from '../tokens';
import { cx } from '../utils/linaria';

import { Tile } from './Tile';

const pressableStyles = css`
  padding: 0;
  &.${focusVisibleClassName} {
    &::before {
      border-radius: ${borderRadius.roundedLarge};
    }
  }
`;

export type TileButtonProps = TileBaseProps &
  Omit<PressableInternalProps, 'noScaleOnPress' | 'loading' | 'children' | 'background'> &
  SharedProps & {
    /** Name of illustration as defined in Figma */
    pictogram?: IllustrationPictogramNames;
  };

export const TileButton = memo(
  forwardRef(function TileButton(
    { pictogram, title, count, children, showOverflow, ...props }: TileButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    if (isDevelopment() && title.trim() === '') {
      // eslint-disable-next-line no-console
      console.warn(
        'Setting an empty title in TileButton violates accessibility and CDS usage guidelines.',
      );
    }

    const tileSize = useScaleConditional({ dense: denseTileSize, normal: normalTileSize });

    const content = useMemo(() => {
      return (
        children || (
          <Pictogram name={pictogram as PictogramName} scaleMultiplier={pictogramScaleMultiplier} />
        )
      );
    }, [children, pictogram]);

    return (
      <div
        style={{
          height: `${tileSize}px`,
          /* add gutter to account for the border added by Pressable */
          width: `${tileSize + gutter}px`,
        }}
      >
        <Pressable
          transparentWhileInactive
          {...props}
          ref={ref}
          noScaleOnPress
          background="background"
          borderRadius="roundedLarge"
          className={cx(insetFocusRing, pressableStyles)}
        >
          <Tile count={count} showOverflow={showOverflow} title={title}>
            {content}
          </Tile>
        </Pressable>
      </div>
    );
  }),
);
