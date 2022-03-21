import React, { memo, useMemo } from 'react';

import { defaultMediaSize } from '../tokens/card';
import { gutter } from '../tokens/sizing';
import type {
  PaletteForeground,
  ProgressBaseProps,
  ProgressCircleBaseProps,
  TextBaseProps,
} from '../types';
import type {
  CardBaseProps,
  CardBodyBaseProps,
  CardBoxProps,
  DataCardBaseProps,
} from '../types/alpha';

type CreateFeatureEntryCardParams<OnPressFn> = {
  Card: React.ComponentType<CardBaseProps<OnPressFn>>;
  CardBody: React.ComponentType<CardBodyBaseProps<OnPressFn>>;
  HStack: React.ComponentType<CardBoxProps>;
  ProgressCircle: React.ComponentType<ProgressCircleBaseProps>;
  ProgressBar: React.ComponentType<ProgressBaseProps>;
  TextBody: React.ComponentType<TextBaseProps & { color?: PaletteForeground }>;
  TextHeadline: React.ComponentType<TextBaseProps>;
  TextLabel2: React.ComponentType<TextBaseProps & { color?: PaletteForeground }>;
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
  }: DataCardBaseProps<OnPressFn>) {
    const content = useMemo(() => {
      const TextEndLabel = progressVariant === 'bar' ? TextLabel2 : TextBody;
      return (
        <HStack justifyContent="space-between">
          {!!startLabelProp && (
            <TextHeadline testID={`${testID}-start-label`}>{startLabelProp}</TextHeadline>
          )}
          {!!endLabelProp && (
            <TextEndLabel testID={`${testID}-end-label`} color="foregroundMuted">
              {endLabelProp}
            </TextEndLabel>
          )}
        </HStack>
      );
    }, [endLabelProp, progressVariant, startLabelProp, testID]);

    if (progressVariant === 'circle') {
      return (
        <Card testID={testID} onPress={onPress} {...cardProps}>
          <CardBody
            testID={`${testID}-body`}
            title={title}
            description={description}
            media={
              !!progress && (
                <ProgressCircle
                  progress={progress}
                  color={progressColor}
                  size={defaultMediaSize.width}
                />
              )
            }
          >
            {content}
          </CardBody>
        </Card>
      );
    }

    return (
      <Card testID={testID} onPress={onPress} gap={2} spacing={gutter} {...cardProps}>
        <CardBody testID={`${testID}-body`} title={title} description={description} spacing={0} />
        {content}
        {progressVariant === 'bar' && !!progress && (
          <ProgressBar progress={progress} color={progressColor} />
        )}
      </Card>
    );
  });

  DataCard.displayName = 'DataCard';
  return DataCard;
}
