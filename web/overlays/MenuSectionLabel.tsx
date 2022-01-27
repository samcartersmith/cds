import React from 'react';
import { TextCaption } from '../typography/TextCaption';
import { HStack } from '../layout/HStack';

export type MenuSectionLabelProps = {
  text: string;
};

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const MenuSectionLabel = ({ text }: MenuSectionLabelProps) => {
  return (
    <HStack spacingHorizontal={3} spacingTop={3} spacingBottom={2}>
      <TextCaption as="p">{text}</TextCaption>
    </HStack>
  );
};
