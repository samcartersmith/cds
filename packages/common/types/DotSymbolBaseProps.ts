import { DotBaseProps } from './DotBaseProps';
import { IconName } from './IconName';

export type DotSymbolBaseProps = {
  /**
   * Add an icon to the dot. IconName are any
   * icon available in icon library
   */
  iconName?: IconName;
} & Omit<DotBaseProps, 'variant'>;
