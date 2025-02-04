import React from 'react';
import { assets } from '@cbhq/cds-common2/internal/data/assets';
import { zIndex } from '@cbhq/cds-common2/tokens/zIndex';

import { HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { TileButton } from '../TileButton';

export default {
  title: 'Core Components/Buttons/TileButton',
  component: TileButton,
};

const handlePress = () => console.log('Pressed');

const getZIndexFromRow = (row: number, totalRows: number) => totalRows - row + zIndex.interactable;

export const TileButtonPictogram = () => {
  return (
    <VStack gap={0.5}>
      <HStack zIndex={getZIndexFromRow(1, 3)}>
        <TileButton onPress={handlePress} pictogram="2fa" title="Coinbase" />
        <TileButton
          showOverflow
          onPress={handlePress}
          pictogram="addToWatchlist"
          title="Private Client"
        />
        <TileButton
          onPress={handlePress}
          pictogram="authenticatorProgress"
          showOverflow={false}
          title="This Title Will Be Three Lines"
        />
      </HStack>
      <HStack zIndex={getZIndexFromRow(2, 3)}>
        <TileButton onPress={handlePress} pictogram="addCard" title="Pro" />
        <TileButton onPress={handlePress} pictogram="phone" title="I'm a Two Line Title" />
        <TileButton onPress={handlePress} pictogram="bitcoinWhitePaper" title="Asset Hub" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(3, 3)}>
        <TileButton onPress={handlePress} pictogram="cardDeclined" title="Wallet" />
        <TileButton onPress={handlePress} pictogram="coinbaseOneLogo" title="Commerce" />
        <TileButton onPress={handlePress} pictogram="chart" title="Analytics" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(4, 3)}>
        <TileButton count={0} onPress={handlePress} title="Bitcoin">
          <RemoteImage height={38.4} source={assets.btc.imageUrl} width={38.4} />
        </TileButton>
        <TileButton count={1} onPress={handlePress} title="Ethereum">
          <RemoteImage height={38.4} source={assets.eth.imageUrl} width={38.4} />
        </TileButton>
        <TileButton count={100} onPress={handlePress} title="Sushi">
          <RemoteImage height={38.4} source={assets.sushi.imageUrl} width={38.4} />
        </TileButton>
      </HStack>
    </VStack>
  );
};
