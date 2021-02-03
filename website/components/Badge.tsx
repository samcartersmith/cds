import React from 'react';

import { ThemeProvider } from '@cds/theme';
import { css } from 'linaria';

type BadgeVariant = keyof typeof badgePalettes;

const badgePalettes = {
  mobile: 'orange30',
  web: 'purple40',
  danger: 'red40',
  cds: 'blue50',
  product: 'pink40',
} as const;

const textOverrides = {
  cds: 'CDS owned',
  product: 'Product owned',
} as Record<BadgeVariant, string>;

type Props = {
  variant: BadgeVariant;
};

// TODO: Fix babel config to work with importing palette from cds/theme package and interpolating below
const badgeStyle = css`
  position: relative;
  text-transform: capitalize;
  top: -2px;
  margin-left: 22px;
  line-height: 20px;
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--primary-foreground);
  padding: 2px 12px;
  border-radius: 0 2px 2px 0;
  background: var(--primary);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -12px;
    border: 12px solid transparent;
    border-left-width: 0;
    border-right-color: var(--primary);
  }
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: var(--primary-foreground);
  }
`;

export const Badge: React.FC<Props> = ({ variant }) => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <ThemeProvider palette={{ primary: badgePalettes[variant] }}>
        <div className={badgeStyle}>{textOverrides[variant] ?? variant}</div>
      </ThemeProvider>
    </div>
  );
};
