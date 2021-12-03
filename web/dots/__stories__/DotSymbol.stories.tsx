import { BadgePlacement } from '@cbhq/cds-common';
import { PLACEMENTS, SIZES } from ':cds-storybook/stories/Dots';
import { DotSymbol } from '..';
import { VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { TextLabel1 } from '../../typography/TextLabel1';
import { Icon } from '../../icons/Icon';
import { mockAsset } from ':cds-storybook/stories/constants';

export default {
  title: 'Core Components/Dots/DotSymbol',
  component: DotSymbol,
};

export const DotSymbolPlacements = () => {
  return (
    <>
      {PLACEMENTS.map((placement: BadgePlacement) => (
        <VStack gap={4} spacing={1} key={`dotsymbol-placement-${placement}`} spacingBottom={4}>
          <TextLabel1 as="p">{placement}</TextLabel1>
          <DotSymbol size="m" placement={placement} source={mockAsset}>
            <Avatar size="xxxl" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" placement={placement} source={mockAsset}>
            <Avatar size="xl" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" placement={placement} source={mockAsset}>
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
          <DotSymbol source={mockAsset} size={size} />
        </VStack>
      ))}
    </>
  );
};
