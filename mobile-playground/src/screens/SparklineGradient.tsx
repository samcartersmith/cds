import React from 'react';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import { Cell } from '@cbhq/cds-mobile/cells/Cell';
import { CellMedia } from '@cbhq/cds-mobile/cells/CellMedia';
import { useSpacingScale } from '@cbhq/cds-mobile/hooks/useSpacingScale';
import { VStack } from '@cbhq/cds-mobile/layout';
import { TextHeadline, TextBody } from '@cbhq/cds-mobile/typography';
import { SparklineGradient } from '@cbhq/cds-mobile/visualizations/SparklineGradient';
import { Dimensions } from 'react-native';

import { assets } from '../data/assets';
import { prices, pricesWithScalingFactor } from '../data/prices';
import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

type SparklineGradientExampleProps = {
  imageUrl: string;
  name: string;
  symbol: string;
  color: string;
};

const SparklineGradientExample: React.FC<SparklineGradientExampleProps> = ({
  imageUrl,
  name,
  symbol,
  color,
}) => {
  const spacing = useSpacingScale();
  const chartHorizontalGutter = spacing[gutter];
  const width = Dimensions.get('screen').width - chartHorizontalGutter * 2;
  const height = useScaleConditional({ dense: 160, normal: 320 });
  const dimensions = { width, height };
  const path = useSparklinePath({ ...dimensions, data: prices });
  return (
    <VStack>
      <Cell media={<CellMedia type="image" source={imageUrl} title="Title" />}>
        <VStack justifyContent="center">
          <TextHeadline numberOfLines={1} ellipsize="tail">
            {name}
          </TextHeadline>
          <TextBody numberOfLines={1} ellipsize="tail">
            {symbol}
          </TextBody>
        </VStack>
      </Cell>
      <SparklineGradient {...dimensions} path={path} color={color} />
    </VStack>
  );
};

type SparklineCompactExampleProps = {
  yAxisScalingFactor: number;
  data: string[];
};

const SparklineScalingExample: React.FC<SparklineCompactExampleProps> = (props) => {
  const spacing = useSpacingScale();
  const chartHorizontalGutter = spacing[gutter];
  const width = Dimensions.get('screen').width - chartHorizontalGutter * 2;
  const height = useScaleConditional({ dense: 160, normal: 320 });
  const dimensions = { width, height };
  const path = useSparklinePath({ ...dimensions, ...props });

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
      />
    </VStack>
  );
};

const PressableOpacityScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="SparklineGradient">
        <SparklineGradientExample {...assets.btc} />
        <SparklineGradientExample {...assets.eth} />
        <SparklineGradientExample {...assets.ltc} />
        <SparklineGradientExample {...assets.xrp} />
        <SparklineGradientExample {...assets.dai} />
        <SparklineGradientExample {...assets.sushi} />
      </Example>
      <Example title="SparklineGradientWithScale">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} />
        ))}
      </Example>
    </ExamplesScreen>
  );
};

export default PressableOpacityScreen;
