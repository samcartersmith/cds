import { IconName, IconSize } from '@cbhq/cds-common';

import type { IconBaseWebProps } from './IconBase';

export type IconProps = {
  name: IconName;
  /** Size for a given icon. */
  size: IconSize;
} & Omit<IconBaseWebProps, 'name'>;
