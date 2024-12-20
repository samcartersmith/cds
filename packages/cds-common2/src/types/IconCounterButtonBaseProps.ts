import { UiIconName } from '@cbhq/cds-icons';

import { IconSize } from './IconSize';
import { PaletteForeground } from './Palette';

export type IconCounterButtonBaseProps = {
  /** Name of the icon or ReactNode */
  icon: Exclude<React.ReactNode, 'string'> | UiIconName;
  /** Size for given icon. */
  iconSize?: IconSize;
  count?: number;
  /** Color of the icon */
  color?: PaletteForeground;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
};
