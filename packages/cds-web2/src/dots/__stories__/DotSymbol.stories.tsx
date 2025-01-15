import React from 'react';
import { dotBuilder } from '@cbhq/cds-common2/internal/dotBuilder';

import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { Spinner } from '../../loaders/Spinner';
import { Avatar } from '../../media/Avatar';
import { TextLabel1 } from '../../text/TextLabel1';
import { DotCount, DotStatusColor, DotSymbol } from '..';

export default {
  title: 'Core Components/Dots/DotSymbol',
  component: DotSymbol,
};

const { AllDotSymbol } = dotBuilder(
  DotCount,
  DotStatusColor,
  DotSymbol,
  (props) => <Box {...props} />,
  Avatar,
  (props) => <TextLabel1 as="p" {...props} />,
  Icon,
  (props) => <VStack {...props} />,
  (props) => <HStack {...props} />,
);

export { AllDotSymbol };

export const CustomSymbol = () => {
  return (
    <DotSymbol pin="bottom-end" symbol={<Spinner size={1} />}>
      <Icon name="airdrop" size="l" />
    </DotSymbol>
  );
};
