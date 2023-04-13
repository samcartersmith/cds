import React from 'react';

import { Spacer, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { Spinner } from '../Spinner';

export default {
  component: Spinner,
  title: 'Core Components/Loaders/Spinner',
};

export const SpinnerDefault = () => {
  return (
    <VStack>
      <TextTitle1 as="h1">Spinner Default Color</TextTitle1>
      <Spacer />
      <Spinner size={10} />
    </VStack>
  );
};

export const SpinnerPrimary = () => {
  return (
    <VStack>
      <TextTitle1 as="h1">Spinner Primary Color</TextTitle1>
      <Spacer />
      <Spinner size={10} color="primary" />
    </VStack>
  );
};
