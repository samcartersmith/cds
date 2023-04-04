import React from 'react';

import { Spacer, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { MaterialSpinner } from '../MaterialSpinner';

export default {
  component: MaterialSpinner,
  title: 'Core Components/Loaders/MaterialSpinner',
};

export const MaterialSpinnerDefault = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">Material Spinner</TextTitle1>
      <Spacer />
      <MaterialSpinner size={30} color="primary" />
    </VStack>
  );
};
