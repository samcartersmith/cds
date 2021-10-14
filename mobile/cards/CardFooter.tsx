import React from 'react';
import { HStack, HStackProps } from '../layout/HStack';

export type CardFooterProps = HStackProps;

export const CardFooter: React.FC<CardFooterProps> = ({ ...props }) => {
  return <HStack spacingTop={3} {...props} />;
};
