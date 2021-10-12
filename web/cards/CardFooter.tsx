import React from 'react';
import { HStack, HStackProps } from '../layout/HStack';

export const CardFooter = (props: HStackProps<'div'>) => {
  return <HStack spacingTop={3} {...props} />;
};
