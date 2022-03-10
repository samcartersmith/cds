import React, { memo } from 'react';

import {
  SubBrandLogoWordmarkParams,
  useSubBrandLogoWordmark,
} from '@cbhq/cds-common/hooks/useSubBrandLogo';
import { iconStyles } from './iconStyles';

export type SubBrandLogoWordmarkProps = SubBrandLogoWordmarkParams;

export const SubBrandLogoWordmark = memo((props: SubBrandLogoWordmarkProps) => {
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoWordmark({
    ...props,
  });

  const { type } = props;
  const title = `Coinbase ${type} logo`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={title}
      viewBox={viewBox}
      className={iconStyles}
      width="100%"
    >
      <title>{title}</title>
      <g>
        <path d={logoPath} fill={logoColor} />
        <path d={typePath} fill={typeColor} />
      </g>
    </svg>
  );
});

SubBrandLogoWordmark.displayName = 'SubBrandLogoWordmark';
