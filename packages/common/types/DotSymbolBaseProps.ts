import { type BoxBaseProps } from './BoxBaseProps';
import { DotBaseProps } from './DotBaseProps';
import { IconName } from './IconName';

export type DotSymbolBaseProps = {
  /** Add an icon to the dot. IconName can be any CDS icon name. */
  iconName?: IconName;
  /** Add an arbitrary ReactNode to the dot. */
  symbol?: React.ReactNode;
  background?: BoxBaseProps['background'];
  borderColor?: BoxBaseProps['borderColor'];
} & Omit<DotBaseProps, 'variant'>;
