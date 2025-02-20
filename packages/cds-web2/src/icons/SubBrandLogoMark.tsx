import React, { memo } from 'react';
import { css } from '@linaria/core';
import {
  SubBrandLogoMarkParams,
  useSubBrandLogoMark,
} from '@cbhq/cds-common2/hooks/useSubBrandLogo';

import { useTheme } from '../hooks/useTheme';

const iconStyles = css`
  color: currentColor;
  font-family: 'CoinbaseIcons';
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  flex-shrink: 0;
  display: block;
  text-decoration: none;
`;

const transition = css`
  transition: fill 150ms ease-in-out;
`;

export const SubBrandLogoMark = memo((props: Omit<SubBrandLogoMarkParams, 'colorScheme'>) => {
  const { colorScheme } = useTheme();
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoMark({
    ...props,
    colorScheme,
  });

  const { type } = props;
  const title = `Coinbase ${type} logo`;

  return (
    <svg
      aria-labelledby="sub-brand-logo-mark-title"
      className={iconStyles}
      role="img"
      viewBox={viewBox}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="sub-brand-logo-mark-title">{title}</title>
      <g>
        <path className={transition} d={logoPath} fill={logoColor} />
        <path className={transition} d={typePath} fill={typeColor} />
      </g>
    </svg>
  );
});
