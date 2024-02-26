import React, { memo, useMemo } from 'react';

import { defaultMediaSize } from '../tokens/card';
import { gutter } from '../tokens/sizing';
import type {
  CardBaseProps,
  CardBodyBaseProps,
  CardBoxProps,
  DataCardBaseProps,
  PaletteForeground,
  ProgressBaseProps,
  ProgressCircleBaseProps,
  TextBaseProps,
} from '../types';

type CreateFeatureEntryCardParams<OnPressFn> = {
  Card: React.ComponentType<CardBaseProps & { onPress?: OnPressFn }>;
  CardBody: React.ComponentType<CardBodyBaseProps & { onPress?: OnPressFn }>;
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  ProgressCircle: React.ComponentType<ProgressCircleBaseProps>;
  ProgressBar: React.ComponentType<ProgressBaseProps>;
  TextBody: React.ComponentType<
    React.PropsWithChildren<TextBaseProps & { color?: PaletteForeground }>
  >;
  TextHeadline: React.ComponentType<React.PropsWithChildren<TextBaseProps>>;
  TextLabel2: React.ComponentType<
    React.PropsWithChildren<TextBaseProps & { color?: PaletteForeground }>
  >;
};

export function createDataCard<OnPressFn>({
  Card,
  CardBody,
  HStack,
  ProgressBar,
  ProgressCircle,
  TextBody,
  TextHeadline,
  TextLabel2,
}: CreateFeatureEntryCardParams<OnPressFn>) {
  const DataCard = memo(function DataCard({
    onPress,
    title,
    description,
    progressVariant,
    progress,
    progressColor,
    startLabel: startLabelProp,
    endLabel: endLabelProp,
    testID = 'data-card',
    ...cardProps
  }: DataCardBaseProps & { onPress?: OnPressFn }) {
    const content = useMemo(() => {
      const TextEndLabel = progressVariant === 'bar' ? TextLabel2 : TextBody;
      return (
        <HStack justifyContent="space-between">
          {!!startLabelProp && (
            <TextHeadline testID={`${testID}-start-label`}>{startLabelProp}</TextHeadline>
          )}
          {!!endLabelProp && (
            <TextEndLabel color="foregroundMuted" testID={`${testID}-end-label`}>
              {endLabelProp}
            </TextEndLabel>
          )}
        </HStack>
      );
    }, [endLabelProp, progressVariant, startLabelProp, testID]);

    return (
      <Card gap={2} onPress={onPress} spacing={gutter} testID={testID} {...cardProps}>
        <CardBody
          description={description}
          media={
            progressVariant === 'circle' &&
            !!progress && (
              <ProgressCircle
                color={progressColor}
                progress={progress}
                size={defaultMediaSize.width}
              />
            )
          }
          spacing={0}
          testID={`${testID}-body`}
          title={title}
        />
        {content}
        {progressVariant === 'bar' && !!progress && (
          <ProgressBar color={progressColor} progress={progress} />
        )}
      </Card>
    );
  });

  DataCard.displayName = 'DataCard';
  return DataCard;
}
