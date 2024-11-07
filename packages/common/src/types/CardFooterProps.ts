import React from 'react';

import { CardBoxProps } from './CardBaseProps';
import { SharedProps } from './SharedProps';

export type CardFooterProps = {
  /** CardFooter takes one or many actions as children */
  children: React.ReactNode;
} & SharedProps &
  CardBoxProps;
