import React from 'react';

import { ThemeProvider } from '@cds/theme';
import { styled } from 'linaria/react';

type BadgeVariant = keyof typeof badgePalettes;

const badgePalettes = {
  mobile: 'orange40',
  web: 'purple40',
  danger: 'red60',
  cds: 'blue50',
  product: 'pink40',
  deprecated: 'red60',
} as const;

const textOverrides = {
  cds: 'CDS owned',
  product: 'Product owned',
} as Record<BadgeVariant, string>;

type Props = {
  variant: BadgeVariant;
  order?: number;
};

// TODO: Fix babel config to work with importing palette from cds/theme package and interpolating below
const BadgeContainer = styled.div<Props>`
  position: relative;
  text-transform: capitalize;
  top: -2px;
  margin-left: ${({ order = 1 }) => `${order === 1 ? 22 : -5 * order}px`};
  z-index: ${({ order = 1 }) => (order === 1 ? 1 : -1 * order)};
  line-height: 20px;
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-foreground);
  padding: ${({ order = 1 }) => (order === 1 ? '2px 12px' : '2px 12px 2px 18px')};
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

export const Badge: React.FC<Props> = ({ variant, order = 1 }) => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <ThemeProvider palette={{ primary: badgePalettes[variant] }}>
        <BadgeContainer {...{ variant, order }}>{textOverrides[variant] ?? variant}</BadgeContainer>
      </ThemeProvider>
    </div>
  );
};
