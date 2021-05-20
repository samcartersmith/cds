import React, { memo } from 'react';

import { IconName } from '@cbhq/cds-common/types';

import { IconBase, IconBaseMobileProps } from './IconBase';

export interface IconProps extends IconBaseMobileProps {
  name: IconName;
}

export const Icon = memo(function Icon(props: IconProps) {
  return <IconBase {...props} />;
});
