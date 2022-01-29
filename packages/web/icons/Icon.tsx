import React, { forwardRef, memo } from 'react';
import { IconBaseProps } from '@cbhq/cds-common';

import { IconBase } from './IconBase';
import { IconProps } from './IconProps';

export const Icon = memo(
  forwardRef<HTMLDivElement, IconProps & IconBaseProps>((props, ref) => {
    return <IconBase ref={ref} {...props} />;
  }),
);

Icon.displayName = 'Icon';
