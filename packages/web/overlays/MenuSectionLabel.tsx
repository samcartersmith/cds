import React from 'react';

import { HStack } from '../layout/HStack';
import { TextCaption } from '../typography/TextCaption';

export type MenuSectionLabelProps = {
  text: string;
};

export const MenuSectionLabel = ({ text }: MenuSectionLabelProps) => {
  return (
    <HStack spacingHorizontal={3} spacingTop={3} spacingBottom={2}>
      <TextCaption as="p">{text}</TextCaption>
    </HStack>
  );
};
