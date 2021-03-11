import React, { memo } from 'react';

import { join } from '@cbhq/cds-common';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { emptyArray } from '@cbhq/cds-utils';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Spacer } from '../layout/Spacer';
import { TextTitle3, TextLabel2 } from '../typography';

const toArray = React.Children.toArray;

type NavbarProps = {
  leading?: React.ReactNode[];
  title: string;
  subtitle?: string;
  ctas?: React.ReactNode[];
  trailing?: React.ReactNode[];
};

export const Navbar = memo(
  ({
    leading = emptyArray,
    title,
    subtitle,
    ctas = emptyArray,
    trailing = emptyArray,
  }: NavbarProps) => {
    return (
      <HStack alignItems="center" justifyContent="space-between" spacing={gutter}>
        <HStack alignItems="baseline">
          {leading.length > 0 && (
            <Box spacingEnd={3} alignItems="center" justifyContent="space-between">
              {join(toArray(leading), <Spacer spacingEnd={2} />)}
            </Box>
          )}
          <HStack alignItems="baseline">
            <TextTitle3 as="h1">{title}</TextTitle3>
            {subtitle && (
              <TextLabel2 as="span" spacingStart={2}>
                {subtitle}
              </TextLabel2>
            )}
          </HStack>
        </HStack>
        <Spacer />
        {ctas.length > 0 && (
          <Box alignItems="center" justifyContent="space-between">
            {join(toArray(ctas), <Spacer spacingStart={2} />)}
          </Box>
        )}
        {trailing.length > 0 && (
          <Box spacingStart={3} alignItems="center" justifyContent="space-between">
            {join(toArray(trailing), <Spacer spacingEnd={2} />)}
          </Box>
        )}
      </HStack>
    );
  }
);

Navbar.displayName = 'Navbar';
