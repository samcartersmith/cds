import React, { memo } from 'react';
import { IconName } from '@cbhq/cds-common/types';

import { IconBase, IconBaseMobileProps } from './IconBase';

export type IconProps = {
  name: IconName;
} & IconBaseMobileProps;

/**
 * @changelog ./iconGlyphMap.ts, ./IconBase.tsx
 */
export const Icon = memo(function Icon(props: IconProps) {
  return <IconBase {...props} />;
});
