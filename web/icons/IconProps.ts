import type { PaletteForeground, IconBaseProps } from '@cbhq/cds-common';

import { BadgeProps } from './Badge';

export interface IconProps extends IconBaseProps {
  /** Color of the icon when used as a foreground. */
  color?: PaletteForeground;
  /**
   * Give the icon a description. It will show up in a tooltip after hovering over the icon for 3s.
   * This is a default browser feature and very helpful to users to understand what the icon does.
   */
  title?: string;
  /**
   * If the icon is labelled by an independent element, then provide that element's id. This is
   * used to set the aria-labelledby value on the icon svg. If the `title` prop is also provided,
   * then `labeledBy` will be used to set the id on the `<title>` element.
   */
  labeledBy?: string;
  /**
   * Add a badge to the top right of an icon
   */
  badge?: React.ReactElement<BadgeProps>;
}
