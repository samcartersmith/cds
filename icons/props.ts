import { SVGProps } from 'react';

import type { IconKind, IconSize } from './types';

export interface InternalIconProps
  extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'className' | 'height' | 'children'> {
  /** Set the fill color of the icon. */
  fill?: string;

  /**
   * Give the icon a description. It will show up in a tooltip after hovering over the icon for 3s.
   * This is a default browser feature and very helpful to users to understand what the icon does.
   */
  title?: string;

  /**
   * If the icon is labelled by an independent element, then provide that element's id. This is
   * used to set the aria-labelledby value on the icon svg. If the `title` prop is also provided,
   * then `titleId` will be used to set the id on the `<title>` element.
   */
  titleId?: string;
}

export interface IconProps extends InternalIconProps {
  /** Identifies the icon. */
  kind: IconKind;

  /**
   * Specifies the icon size. The actual icon size is determined based on this prop and the
   * current scale.
   */
  size: IconSize;
}
