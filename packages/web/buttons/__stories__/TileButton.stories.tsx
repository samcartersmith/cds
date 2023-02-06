import { HStack, VStack } from '../../layout';
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
    </VStack>
  );
};
