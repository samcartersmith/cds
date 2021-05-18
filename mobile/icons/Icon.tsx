import React from 'react';

import { IconName } from '@cbhq/cds-common/types';

import { IconBase, IconBaseMobileProps } from './IconBase';

export interface IconProps extends IconBaseMobileProps {
  /** Icon names */
  name: IconName;
}

export const Icon = (props: IconProps) => {
  return <IconBase {...props} />;
};
