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
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps<OnPressFn>>>;
  CardBody: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps<OnPressFn>>>;
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  ProgressCircle: React.ComponentType<React.PropsWithChildren<ProgressCircleBaseProps>>;
  ProgressBar: React.ComponentType<React.PropsWithChildren<ProgressBaseProps>>;
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
  }: DataCardBaseProps<OnPressFn>) {
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

    if (progressVariant === 'circle') {
      return (
        <Card onPress={onPress} testID={testID} {...cardProps}>
          <CardBody
            description={description}
            media={
              !!progress && (
                <ProgressCircle
                  color={progressColor}
                  progress={progress}
                  size={defaultMediaSize.width}
                />
              )
            }
            testID={`${testID}-body`}
            title={title}
          >
            {content}
          </CardBody>
        </Card>
      );
    }

    return (
      <Card gap={2} onPress={onPress} spacing={gutter} testID={testID} {...cardProps}>
        <CardBody description={description} spacing={0} testID={`${testID}-body`} title={title} />
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
