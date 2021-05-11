import React, { memo } from 'react';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';
import { CellAccessoryProps } from './CellAccessory';
import { CellMedia, CellMediaProps } from './CellMedia';
import { MediaFallback } from './MediaFallback';

export interface CellCommonProps {
  /* Media (icon, asset, image, etc) to display at the start of the cell. */
  media?: React.ReactElement<CellMediaProps>;
  /** Is the cell disabled? Will apply opacity and disable interaction. */
  disabled?: boolean;
  /** Is the cell selected? Will apply a background and selected accessory. */
  selected?: boolean;
  /** Callback fired when the cell is pressed. */
  onPress?: () => void;
  /** @internal Testing purposes. */
  testID?: string;
}

export interface CellProps extends CellCommonProps {
  accessory?: React.ReactElement<CellAccessoryProps>;
  alignItems?: 'center' | 'flex-start';
  children: React.ReactNode;
  detail?: React.ReactNode;
  maxContentWidth?: number | string;
  maxDetailWidth?: number | string;
  minContentWidth?: number | string;
  minDetailWidth?: number | string;
  minHeight?: number;
}

export const Cell = memo(function Cell({
  accessory,
  alignItems = 'center',
  children,
  detail,
  disabled,
  media,
  maxContentWidth,
  maxDetailWidth,
  minContentWidth,
  minDetailWidth,
  minHeight,
  onPress,
  selected,
  testID,
}: CellProps) {
  if (
    process.env.NODE_ENV !== 'production' &&
    media &&
    media.type !== CellMedia &&
    media.type !== MediaFallback
  ) {
    throw new Error('Cell media must a `CellMedia` component.');
  }

  const content = (
    <HStack
      background={selected ? 'backgroundAlternate' : undefined}
      alignItems={alignItems}
      minHeight={minHeight}
      spacing={2}
      renderToHardwareTextureAndroid={disabled}
      testID={testID}
    >
      {media && (
        <Box flexGrow={0} flexShrink={0} spacingEnd={2}>
          {media}
        </Box>
      )}

      <Box
        flexGrow={1}
        flexShrink={1}
        justifyContent="flex-start"
        minWidth={minContentWidth}
        maxWidth={maxContentWidth}
      >
        {children}
      </Box>

      {detail && (
        <Box
          flexGrow={1}
          flexShrink={1}
          alignItems="flex-end"
          justifyContent="flex-end"
          spacingStart={2}
          minWidth={minDetailWidth}
          maxWidth={maxDetailWidth}
        >
          {detail}
        </Box>
      )}

      {accessory && (
        <Box flexGrow={0} flexShrink={0} spacingStart={2}>
          {accessory}
        </Box>
      )}
    </HStack>
  );

  if (onPress) {
    return (
      <Pressable
        noScaleOnPress
        transparentWhileInactive
        backgroundColor="background"
        disabled={disabled}
        onPress={onPress}
      >
        {content}
      </Pressable>
    );
  }

  return content;
});
