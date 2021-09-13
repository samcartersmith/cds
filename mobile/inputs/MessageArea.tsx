import React, { memo } from 'react';
import { PaletteForeground, SharedProps } from '@cbhq/cds-common';
import { TextBody } from '../typography/TextBody';

export type MessageAreaProps = {
  /**
   * Determines the color of the text
   * @default foregroundMuted
   */
  color?: PaletteForeground;
  /** The message to display in this message area */
  message: string;
} & SharedProps;

export const MessageArea = memo(function MessageArea({ color, message, testID }: MessageAreaProps) {
  return (
    <TextBody testID={testID} color={color}>
      {message}
    </TextBody>
  );
});
