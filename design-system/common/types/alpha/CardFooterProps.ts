import type { CardBoxProps } from './CardBaseProps';

export type CardFooterProps = CardBoxProps & {
  /** CardFooter takes one or many actions as children */
  children: React.ReactNode;
};
