import React, { ForwardedRef, forwardRef, memo, useCallback, useMemo } from 'react';
import { css } from 'linaria';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { pictogramScaleMultiplier, tileSize } from '@cbhq/cds-common/tokens/tile';
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
      border-radius: ${borderRadius.rounded};
    }
  }
`;

const wrapperStyles = css`
  position: relative;
  height: ${tileSize}px;
  /* add gutter to account for the border added by Pressable */
  width: ${tileSize + gutter}px;
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

    return (
      <div className={wrapperStyles}>
        <Pressable
          {...props}
          backgroundColor="background"
          borderRadius="rounded"
          ref={ref}
          width={tileSize}
          noScaleOnPress
          className={cx(insetFocusRing, pressableStyles)}
          onFocus={handleShowOverflow}
          onBlur={handleHideOverflow}
        >
          <Tile title={title} count={count} showOverflow={shouldOverflow}>
            {content}
          </Tile>
        </Pressable>
      </div>
    );
  }),
);
