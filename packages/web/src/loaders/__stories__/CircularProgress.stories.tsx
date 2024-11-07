import React from 'react';

import { Spacer, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { CircularProgress } from '../CircularProgress';

export default {
  component: CircularProgress,
  title: 'Core Components/Loaders/CircularProgress',
};

export const Determinate = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">Determinate</TextTitle1>
      <Spacer />
      <CircularProgress indeterminate={false} progress={80} radius={30} strokeWidth={4} />
    </VStack>
  );
};
