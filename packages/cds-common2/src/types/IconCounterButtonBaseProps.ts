import { UiIconName } from '@cbhq/cds-icons';

import { ThemeVars } from '../new/vars';

import { IconSize } from './IconSize';

export type IconCounterButtonBaseProps = {
  /** Name of the icon or ReactNode */
  icon: Exclude<React.ReactNode, 'string'> | UiIconName;
  /** Size for given icon. */
  iconSize?: IconSize;
  count?: number;
  /** Color of the icon */
  color?: ThemeVars.Color;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
};
