import React from 'react';
import { Dimensions } from 'react-native';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { prices, pricesWithScalingFactor } from '@cbhq/cds-common/internal/data/prices';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';

import { Cell } from '../../cells/Cell';
import { CellMedia } from '../../cells/CellMedia';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useSpacingScale } from '../../hooks/useSpacingScale';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { TextBody } from '../../typography/TextBody';
import { TextHeadline } from '../../typography/TextHeadline';
import { Sparkline } from '../Sparkline';
import { SparklineArea } from '../SparklineArea';

type SparklineExampleProps = {
  imageUrl: string;
  name: string;
  symbol: string;
  color: string;
};

const SparklineExample = ({ imageUrl, name, symbol, color }: SparklineExampleProps) => {
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
      media={<CellMedia type="image" source={imageUrl} />}
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

type SparklineCompactExampleProps = {
  yAxisScalingFactor: number;
  data: string[];
  fill?: boolean;
};

const SparklineScalingExample: React.FC<React.PropsWithChildren<SparklineCompactExampleProps>> = (
  props,
) => {
  const spacing = useSpacingScale();
  const chartHorizontalGutter = spacing[gutter];
  const width = Dimensions.get('screen').width - chartHorizontalGutter * 2;
  const height = useScaleConditional({ dense: 160, normal: 320 });
  const dimensions = { width, height };
  const path = useSparklinePath({ ...dimensions, ...props });
  const area = useSparklineArea({ ...dimensions, ...props });

  return (
    <VStack>
      <TextHeadline numberOfLines={1} ellipsize="tail">
        Scale: {props.yAxisScalingFactor}
      </TextHeadline>
      <Sparkline
        {...dimensions}
        path={path}
        color="#F7931A"
        yAxisScalingFactor={props.yAxisScalingFactor}
      >
        {props.fill && <SparklineArea area={area} />}
      </Sparkline>
    </VStack>
  );
};

const PressableOpacityScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Sparkline (deprecated - moved to cds-mobile-visualization)">
        <VStack offsetHorizontal={2}>
          <SparklineExample {...assets.btc} />
          <SparklineExample {...assets.eth} />
          <SparklineExample {...assets.xrp} />
          <SparklineExample {...assets.dai} />
          <SparklineExample {...assets.sushi} />
        </VStack>
      </Example>
      <Example title="SparklineWithScale">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} />
        ))}
      </Example>
      <Example title="SparklineWithScaleAndFill">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} fill />
        ))}
      </Example>
    </ExampleScreen>
  );
};

export default PressableOpacityScreen;
