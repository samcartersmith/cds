import React from 'react';

import { HStack } from '../../layout/HStack';
import { Icon } from '../Icon';

export default {
  component: Icon,
  title: 'Icons/Icon',
};

const exampleColor = {
  base: 'iconWarning',
  minTablet: 'iconNegative',
  minDesktop: 'iconPositive',
} as const;

export const PrimaryIcon = () => (
  <HStack alignItems="center" gap={2}>
    <Icon color="iconWarning" name="airdrop" size="xs" />
    <Icon color="iconNegative" name="airdrop" size="s" />
    <Icon color="iconPositive" name="airdrop" size="m" />
    <Icon color="iconPrimary" name="airdrop" size="l" />
    <Icon bordered color="iconPrimary" name="airdrop" size="l" />
    <Icon bordered color="iconPrimary" name="airdrop" size="m" />
    <Icon color={exampleColor} name="airdrop" size="l" />
    <Icon dangerouslySetColor="purple" name="airdrop" size="l" />
  </HStack>
);
