import { assets } from '@cbhq/cds-common/internal/data/assets';
import { PIN_DIRECTIONS, SIZES } from '@cbhq/cds-common/internal/dotBuilder';
import { PinPlacement } from '@cbhq/cds-common/types/Placement';

import { Icon } from '../../icons/Icon';
import { VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { TextLabel1 } from '../../typography/TextLabel1';
import { DotSymbol } from '..';

export default {
  title: 'Core Components/Dots/DotSymbol',
  component: DotSymbol,
};

export const DotSymbolPlacements = () => {
  return (
    <>
      {PIN_DIRECTIONS.map((pinDirection: PinPlacement) => (
        <VStack gap={4} spacing={1} key={`dotsymbol-placement-${pinDirection}`} spacingBottom={4}>
          <TextLabel1 as="p">{pinDirection}</TextLabel1>
          <DotSymbol size="m" pin={pinDirection} source={assets.eth.imageUrl}>
            <Avatar size="xxxl" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" pin={pinDirection} source={assets.eth.imageUrl}>
            <Avatar size="xl" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" pin={pinDirection} source={assets.eth.imageUrl}>
            <Icon name="airdrop" size="l" />
          </DotSymbol>
        </VStack>
      ))}
    </>
  );
};

export const DotSymbolSizes = () => {
  return (
    <>
      {SIZES.map((size) => (
        <VStack gap={1} key={`dotsymbol-size-${size}`}>
          <DotSymbol source={assets.eth.imageUrl} size={size} />
        </VStack>
      ))}
    </>
  );
};
