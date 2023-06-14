import React from 'react';
import { Dimensions } from 'react-native';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { prices, pricesWithScalingFactor } from '@cbhq/cds-common/internal/data/prices';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import { Cell } from '@cbhq/cds-mobile/cells/Cell';
import { CellMedia } from '@cbhq/cds-mobile/cells/CellMedia';
import { Example, ExampleScreen } from '@cbhq/cds-mobile/examples/ExampleScreen';
import { useSpacingScale } from '@cbhq/cds-mobile/hooks/useSpacingScale';
import { VStack } from '@cbhq/cds-mobile/layout';
import { TextBody, TextHeadline } from '@cbhq/cds-mobile/typography';

import { SparklineArea } from '../SparklineArea';
import { SparklineGradient } from '../SparklineGradient';

type SparklineGradientExampleProps = {
  imageUrl: string;
  name: string;
  symbol: string;
  color: string;
  fill?: boolean;
};

const SparklineGradientExample = ({
  imageUrl,
  name,
  symbol,
  color,
  fill,
}: SparklineGradientExampleProps) => {
  const spacing = useSpacingScale();
  const chartHorizontalGutter = spacing[gutter];
  const width = Dimensions.get('screen').width - chartHorizontalGutter * 2;
  const height = useScaleConditional({ dense: 160, normal: 320 });
  const dimensions = { width, height };
  const path = useSparklinePath({ ...dimensions, data: prices });
  const area = useSparklineArea({ ...dimensions, data: prices });

  return (
    <VStack>
      <Cell media={<CellMedia type="image" source={imageUrl} />}>
        <VStack justifyContent="center">
          <TextHeadline numberOfLines={1} ellipsize="tail">
            {name}
          </TextHeadline>
          <TextBody numberOfLines={1} ellipsize="tail">
            {symbol}
          </TextBody>
        </VStack>
      </Cell>
      <SparklineGradient {...dimensions} path={path} color={color}>
        {fill && <SparklineArea area={area} />}
      </SparklineGradient>
    </VStack>
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
      <SparklineGradient
        {...dimensions}
        path={path}
        color="#F7931A"
        yAxisScalingFactor={props.yAxisScalingFactor}
      >
        {props.fill && <SparklineArea area={area} />}
      </SparklineGradient>
    </VStack>
  );
};

const PressableOpacityScreen = () => {
  return (
    <ExampleScreen>
      <Example title="SparklineGradient">
        <SparklineGradientExample {...assets.btc} />
        <SparklineGradientExample {...assets.eth} />
        <SparklineGradientExample {...assets.ltc} />
        <SparklineGradientExample {...assets.xrp} />
        <SparklineGradientExample {...assets.dai} />
        <SparklineGradientExample {...assets.sushi} />
      </Example>
      <Example title="SparklineGradientWithArea">
        <SparklineGradientExample {...assets.btc} fill />
        <SparklineGradientExample {...assets.eth} fill />
        <SparklineGradientExample {...assets.ltc} fill />
        <SparklineGradientExample {...assets.xrp} fill />
        <SparklineGradientExample {...assets.dai} fill />
        <SparklineGradientExample {...assets.sushi} fill />
      </Example>
      <Example title="SparklineGradientWithScale">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} />
        ))}
      </Example>
      <Example title="SparklineGradientWithAreaAndScale">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} fill />
        ))}
      </Example>
    </ExampleScreen>
  );
};

export default PressableOpacityScreen;
