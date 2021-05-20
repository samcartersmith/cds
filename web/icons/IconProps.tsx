import { IconName, IconSize } from '@cbhq/cds-common';

import type { IconBaseWebProps } from './IconBase';

export interface IconProps extends Omit<IconBaseWebProps, 'name'> {
  name: IconName;
  /** Size for a given icon. */
  size: IconSize;
}
