import React, { memo } from 'react';
import { css } from '@linaria/core';
import { LogoMarkParams, useLogoMark } from '@cbhq/cds-common2/hooks/useLogo';

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

export const LogoMark = memo(({ size, foreground }: Omit<LogoMarkParams, 'colorScheme'>) => {
  const { colorScheme } = useTheme();
  const { viewBox, width, height, path, color } = useLogoMark({ size, foreground, colorScheme });

  return (
    <svg
      aria-label="Coinbase logo"
      className={iconStyles}
      height={height}
      role="img"
      viewBox={viewBox}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Coinbase logo</title>
      <path className={transition} d={path} fill={color} />
    </svg>
  );
});
