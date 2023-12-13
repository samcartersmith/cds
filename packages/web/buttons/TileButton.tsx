import React, { ForwardedRef, forwardRef, memo, useCallback, useMemo } from 'react';
import { css } from 'linaria';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { denseTileSize, pictogramScaleMultiplier, tileSize } from '@cbhq/cds-common/tokens/tile';
import { IllustrationPictogramNames, SharedProps, TileBaseProps } from '@cbhq/cds-common/types';
import { isDevelopment } from '@cbhq/cds-utils';

import { Pictogram, PictogramName } from '../illustrations';
import { focusVisibleClassName, insetFocusRing } from '../styles/focus';
import { Pressable, PressableInternalProps } from '../system/Pressable';
import { borderRadius } from '../tokens';
import { cx } from '../utils/linaria';

import { Tile } from './Tile';

const pressableStyles = css`
  position: absolute;
  padding: 0;
  &.${focusVisibleClassName} {
    &::before {
      border-radius: ${borderRadius.roundedLarge};
    }
  }
`;

export type TileButtonProps = TileBaseProps &
  Omit<PressableInternalProps, 'noScaleOnPress' | 'loading' | 'children' | 'backgroundColor'> &
  SharedProps & {
    /** Name of illustration as defined in Figma */
    pictogram?: IllustrationPictogramNames;
  };

export const TileButton = memo(
  forwardRef(function TileButton(
    { pictogram, title, count, children, ...props }: TileButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    if (isDevelopment() && title.trim() === '') {
      // eslint-disable-next-line no-console
      console.warn(
        'Setting an empty title in TileButton violates accessibility and CDS usage guidelines.',
      );
    }

    const [shouldOverflow, toggleShouldOverflow] = useToggler(false);

    const isDense = useScaleDensity() === 'dense';

    const handleShowOverflow = useCallback(() => {
      toggleShouldOverflow.toggleOn();
    }, [toggleShouldOverflow]);

    const handleHideOverflow = useCallback(() => {
      toggleShouldOverflow.toggleOff();
    }, [toggleShouldOverflow]);

    const content = useMemo(() => {
      return (
        children || (
          <Pictogram name={pictogram as PictogramName} scaleMultiplier={pictogramScaleMultiplier} />
        )
      );
    }, [children, pictogram]);

    const computedTileSize = useMemo(() => {
      return isDense ? denseTileSize : tileSize;
    }, [isDense]);

    const computedPressableStyles = useMemo(() => {
      return {
        minHeight: `${computedTileSize}px`,
        width: `${computedTileSize}px`,
      };
    }, [computedTileSize]);

    return (
      <div
        style={{
          position: 'relative',
          height: `${computedTileSize}px`,
          /* add gutter to account for the border added by Pressable */
          width: `${computedTileSize + gutter}px`,
        }}
      >
        <Pressable
          transparentWhileInactive
          {...props}
          ref={ref}
          noScaleOnPress
          backgroundColor="background"
          borderRadius="roundedLarge"
          className={cx(insetFocusRing, pressableStyles)}
          onBlur={handleHideOverflow}
          onFocus={handleShowOverflow}
          style={computedPressableStyles}
        >
          <Tile count={count} showOverflow={shouldOverflow} title={title}>
            {content}
          </Tile>
        </Pressable>
      </div>
    );
  }),
);
