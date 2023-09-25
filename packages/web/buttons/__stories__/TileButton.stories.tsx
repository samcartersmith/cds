import { assets } from '@cbhq/cds-common/internal/data/assets';

import { HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { getZIndexFromRow } from '../../utils/overflow';
import { TileButton } from '../TileButton';

export default {
  title: 'Core Components/Buttons/TileButton',
  component: TileButton,
};

const handleNoop = () => console.log('Pressed');

export const TileButtonPictogram = () => {
  return (
    <VStack gap={0.5}>
      <HStack zIndex={getZIndexFromRow(1, 3)}>
        <TileButton onPress={handleNoop} pictogram="2fa" title="Coinbase" />
        <TileButton onPress={handleNoop} pictogram="addToWatchlist" title="Private Client" />
        <TileButton
          onPress={handleNoop}
          pictogram="authenticatorProgress"
          title="This Title Will Be Three Lines"
        />
      </HStack>
      <HStack zIndex={getZIndexFromRow(2, 3)}>
        <TileButton onPress={handleNoop} pictogram="addCard" title="Pro" />
        <TileButton onPress={handleNoop} pictogram="phone" title="I'm a Two Line Title" />
        <TileButton onPress={handleNoop} pictogram="bitcoinWhitePaper" title="Asset Hub" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(3, 3)}>
        <TileButton onPress={handleNoop} pictogram="cardDeclined" title="Wallet" />
        <TileButton onPress={handleNoop} pictogram="coinbaseOneLogo" title="Commerce" />
        <TileButton onPress={handleNoop} pictogram="chart" title="Analytics" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(4, 3)}>
        <TileButton onPress={handleNoop} title="Bitcoin" count={0}>
          <RemoteImage source={assets.btc.imageUrl} width={38.4} height={38.4} />
        </TileButton>
        <TileButton onPress={handleNoop} title="Ethereum" count={1}>
          <RemoteImage source={assets.eth.imageUrl} width={38.4} height={38.4} />
        </TileButton>
        <TileButton onPress={handleNoop} title="Sushi" count={100}>
          <RemoteImage source={assets.sushi.imageUrl} width={38.4} height={38.4} />
        </TileButton>
      </HStack>
    </VStack>
  );
};
