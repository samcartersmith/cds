import React from 'react';
import { HStack, HStackProps } from '../layout/HStack';

export type CardFooterProps = HStackProps<'div'>;

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => {
  return (
    <HStack spacingBottom={2} spacingHorizontal={3}>
      {children}
    </HStack>
  );
};
