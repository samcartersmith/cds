import React, { memo } from 'react';

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
    startLabel,
    endLabel,
    testID,
  }: DataCardBaseProps<OnPressFn>) {
    const TextEndLabel = progressVariant === 'bar' ? TextLabel2 : TextBody;

    if (progressVariant === 'circle') {
      return (
        <Card testID={testID} onPress={onPress}>
          <CardBody
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
            <HStack justifyContent="space-between">
              {!!startLabel && <TextHeadline>{startLabel}</TextHeadline>}
              {!!endLabel && <TextEndLabel color="foregroundMuted">{endLabel}</TextEndLabel>}
            </HStack>
          </CardBody>
        </Card>
      );
    }

    return (
      <Card testID={testID} onPress={onPress} gap={2} spacing={gutter}>
        <CardBody title={title} description={description} spacing={0} />
        <HStack justifyContent="space-between">
          {!!startLabel && <TextHeadline>{startLabel}</TextHeadline>}
          {!!endLabel && <TextEndLabel color="foregroundMuted">{endLabel}</TextEndLabel>}
        </HStack>
        {progressVariant === 'bar' && !!progress && (
          <ProgressBar progress={progress} color={progressColor} />
        )}
      </Card>
    );
  });

  DataCard.displayName = 'DataCard';
  return DataCard;
}
