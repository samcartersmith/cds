import React, { memo } from 'react';
import {
  SubBrandLogoMarkParams,
  useSubBrandLogoMark,
} from '@cbhq/cds-common/hooks/useSubBrandLogo';

import { iconStyles } from './iconStyles';

export type SubBrandLogoMarkProps = SubBrandLogoMarkParams;

export const SubBrandLogoMark = memo((props: SubBrandLogoMarkProps) => {
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoMark({ ...props });

  const { type } = props;
  const title = `Coinbase ${type} logo`;

  return (
    <svg
      aria-labelledby={title}
      className={iconStyles}
      role="img"
      viewBox={viewBox}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g>
        <path d={logoPath} fill={logoColor} />
        <path d={typePath} fill={typeColor} />
      </g>
    </svg>
  );
});
