import React from 'react';
import { assets } from '@cbhq/cds-common2/internal/data/assets';

import { DotSymbol } from '../../dots/DotSymbol';
import { Divider, HStack, VStack } from '../../layout';
import { TextTitle3 } from '../../typography';
import { IconCounterButton } from '../IconCounterButton';

export default {
  title: 'Core Components/Buttons/IconCounterButton',
  component: IconCounterButton,
};

export const IconCounterButtonExample = () => {
  return (
    <VStack gap={2}>
      <TextTitle3 as="h3">Normal</TextTitle3>
      <HStack gap={4}>
        <IconCounterButton count={99} icon="heartInactive" />
        <IconCounterButton count={4200} icon="comment" />
        <IconCounterButton count={9900000} icon="arrowsHorizontal" />
      </HStack>
      <Divider />
      <TextTitle3 as="h3">Colored</TextTitle3>
      <HStack gap={4}>
        <IconCounterButton color="fgNegative" count={99} icon="heartActive" />
        <IconCounterButton color="fgPrimary" count={4200} icon="comment" />
        <IconCounterButton count={69000000} dangerouslySetColor="orange" icon="arrowsHorizontal" />
      </HStack>
      <Divider />
      <TextTitle3 as="h3">Custom Icon</TextTitle3>
      <HStack gap={4}>
        <IconCounterButton count={99} icon={<DotSymbol size="m" source={assets.btc.imageUrl} />} />
        <IconCounterButton
          count={4200}
          icon={<DotSymbol size="m" source={assets.eth.imageUrl} />}
        />
        <IconCounterButton
          count={9900000}
          icon={<DotSymbol size="m" source={assets.uni.imageUrl} />}
        />
      </HStack>
    </VStack>
  );
};
