import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import { pictogramScaleMultiplier, tileSize } from '@cbhq/cds-common2/tokens/tile';
import { IllustrationPictogramNames, SharedProps, TileBaseProps } from '@cbhq/cds-common2/types';
import { isDevelopment } from '@cbhq/cds-utils';

import { Pictogram, PictogramName } from '../illustrations/Pictogram';
import { type PressableProps, Pressable } from '../system/Pressable';

import { Tile } from './Tile';

const focusStyles = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 2px;
  }
`;

export type TileButtonProps = TileBaseProps &
  Omit<PressableProps<'button' | 'a'>, 'noScaleOnPress' | 'loading' | 'children' | 'background'> &
  SharedProps & {
    /** Name of illustration as defined in Figma */
    pictogram?: IllustrationPictogramNames;
  };

export const TileButton = memo(
  forwardRef(function TileButton(
    { pictogram, title, count, children, showOverflow, ...props }: TileButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    if (isDevelopment() && title.trim() === '') {
      // eslint-disable-next-line no-console
      console.warn(
        'Setting an empty title in TileButton violates accessibility and CDS usage guidelines.',
      );
    }

    const content = useMemo(() => {
      return (
        children || (
          <Pictogram name={pictogram as PictogramName} scaleMultiplier={pictogramScaleMultiplier} />
        )
      );
    }, [children, pictogram]);

    return (
      <div
        // TO DO: tileSize should come from ThemeVars.ControlSize
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
          background="bg"
          borderRadius={400}
          className={focusStyles}
        >
          <Tile count={count} showOverflow={showOverflow} title={title}>
            {content}
          </Tile>
        </Pressable>
      </div>
    );
  }),
);
