import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import { Cell } from '@cbhq/cds-mobile/cells/Cell';
import { CellMedia } from '@cbhq/cds-mobile/cells/CellMedia';
import { VStack, HStack } from '@cbhq/cds-mobile/layout';
import { TextHeadline, TextBody } from '@cbhq/cds-mobile/typography';
import { Sparkline } from '@cbhq/cds-mobile/visualizations/Sparkline';

import { assets } from './data/assets';
import { prices } from './data/prices';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const PressableOpacityScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Sparkline">
        <VStack offsetHorizontal={2}>
          <SparklineExample {...assets.btc} />
          <SparklineExample {...assets.eth} />
          <SparklineExample {...assets.xrp} />
          <SparklineExample {...assets.dai} />
          <SparklineExample {...assets.sushi} />
        </VStack>
      </Example>
    </ExamplesScreen>
  );
};

type SparklineExampleProps = {
  imageUrl: string;
  name: string;
  symbol: string;
  color: string;
};

const SparklineExample: React.FC<SparklineExampleProps> = ({ imageUrl, name, symbol, color }) => {
  const dimensions = { width: 64, height: 20 };
  const path = useSparklinePath({ ...dimensions, data: prices });
  return (
    <Cell
      detail={
        <HStack alignItems="center">
          <Sparkline {...dimensions} path={path} color={color} />
          <VStack
            spacingStart={2}
            alignContent="flex-end"
            alignItems="flex-end"
            justifyContent="center"
          >
            <TextBody align="end" numberOfLines={1}>
              $2,874.49
            </TextBody>
            <TextBody align="end" numberOfLines={1} color="foregroundMuted">
              +36.08%
            </TextBody>
          </VStack>
        </HStack>
      }
      media={<CellMedia type="image" source={imageUrl} title="Title" />}
    >
      <VStack justifyContent="center">
        <TextHeadline numberOfLines={1} ellipsize="tail">
          {name}
        </TextHeadline>
        <TextBody numberOfLines={1} ellipsize="tail">
          {symbol}
        </TextBody>
      </VStack>
    </Cell>
  );
};

export default PressableOpacityScreen;
