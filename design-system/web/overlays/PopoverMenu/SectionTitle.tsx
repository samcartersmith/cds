import React, { memo } from 'react';
import { TextCaption } from '../../typography/TextCaption';
import { HStack } from '../../layout/HStack';

export type SectionTitleProps = {
  text: string;
};

/**
 * SectionTitle should only be used inside of a PopoverMenu
 */
export const SectionTitle = memo(function SectionTitle({ text }: SectionTitleProps) {
  return (
    <HStack spacingHorizontal={2} spacingVertical={2}>
      <TextCaption as="p" color="foregroundMuted">
        {text}
      </TextCaption>
    </HStack>
  );
});
