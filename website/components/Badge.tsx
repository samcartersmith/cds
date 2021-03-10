import React from 'react';

import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { palette } from '@cbhq/cds-web/tokens';
import { styled } from 'linaria/react';

type BadgeVariant = keyof typeof badgePalettes;

const badgePalettes = {
  mobile: 'orange40',
  web: 'purple40',
  danger: 'red60',
  cds: 'blue50',
  product: 'pink40',
  deprecated: 'red60',
  internal: 'gray40',
} as const;

const textOverrides = {
  cds: 'CDS owned',
  product: 'Product owned',
  mobile: 'Mobile only',
  web: 'Web only',
} as Record<BadgeVariant, string>;

type Props = {
  variant: BadgeVariant;
  order?: number;
};

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
  color: ${palette.primaryForeground};
  padding: ${({ order = 1 }) => (order === 1 ? '2px 12px' : '2px 12px 2px 18px')};
  border-radius: 0 2px 2px 0;
  background: ${palette.primary};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -12px;
    border: 12px solid transparent;
    border-left-width: 0;
    border-right-color: ${palette.primary};
  }
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: ${palette.primaryForeground};
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
