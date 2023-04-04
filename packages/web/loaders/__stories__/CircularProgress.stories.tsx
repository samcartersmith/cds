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
      <CircularProgress progress={80} indeterminate={false} strokeWidth={4} radius={30} />
    </VStack>
  );
};
