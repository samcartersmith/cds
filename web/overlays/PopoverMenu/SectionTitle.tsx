import React from 'react';
import { TextCaption } from '../../typography/TextCaption';
import { HStack } from '../../layout/HStack';

export type SectionTitleProps = {
  text: string;
};

/**
 * @deprecated DO NOT USE: This is an unreleased component and is unstable
 * SectionTitle should only be used inside of a PopoverMenu
 */
export const SectionTitle = ({ text }: SectionTitleProps) => {
  return (
    <HStack spacingHorizontal={2} spacingTop={3} spacingBottom={2}>
      <TextCaption as="p">{text}</TextCaption>
    </HStack>
  );
};
