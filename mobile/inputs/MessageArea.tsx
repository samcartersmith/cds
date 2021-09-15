import React, { memo } from 'react';
import { PaletteForeground, SharedProps } from '@cbhq/cds-common';
import { Box } from '../layout/Box';
import { TextLabel2 } from '../typography/TextLabel2';

export type MessageAreaProps = {
  /**
   * Determines the color of the text
   * @default foregroundMuted
   */
  color?: PaletteForeground;
  /** The message to display in this message area */
  message: string;
  /**
   * Align text inside area
   * @default left
   */
  textAlign?: 'left' | 'right';
} & SharedProps;

export const MessageArea = memo(function MessageArea({
  color,
  message,
  textAlign = 'left',
  testID,
}: MessageAreaProps) {
  return (
    <Box spacing={0.5}>
      <TextLabel2 testID={testID} color={color} dangerouslySetStyle={{ textAlign }}>
        {message}
      </TextLabel2>
    </Box>
  );
});
