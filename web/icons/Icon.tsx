import React, { memo } from 'react';

import { IconBaseProps } from '@cbhq/cds-common';

import { IconBase } from './IconBase';
import { IconProps } from './IconProps';

export const Icon = memo((props: IconProps & IconBaseProps) => {
  return <IconBase {...props} />;
});

Icon.displayName = 'Icon';
