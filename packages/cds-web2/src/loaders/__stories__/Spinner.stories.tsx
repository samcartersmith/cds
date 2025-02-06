import React, { useEffect, useState } from 'react';

import { Spacer, VStack } from '../../layout';
import { TextBody, TextTitle1 } from '../../typography';
import { Spinner } from '../Spinner';

export default {
  component: Spinner,
  title: 'Core Components/Loaders/Spinner',
};

export const SpinnerDefault = () => {
  return (
    <VStack>
      <TextTitle1 as="h1">Spinner Default Color</TextTitle1>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel="Loading" size={10} />
    </VStack>
  );
};

export const SpinnerPrimary = () => {
  return (
    <VStack>
      <TextTitle1 as="h1">Spinner Primary Color</TextTitle1>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel="Loading" color="bgPrimary" size={10} />
    </VStack>
  );
};

export const SpinnerWithAccessibility = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <VStack>
      <TextTitle1 as="h1">Spinner With Accessibility Label Update</TextTitle1>
      <TextBody as="p">
        Accessibility label will be updated from &quot;Loading&quot; to &quot;Complete&quot; after
        10 seconds.
      </TextBody>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel={loading ? 'Loading' : 'Complete'} color="bgPrimary" size={10} />
    </VStack>
  );
};
