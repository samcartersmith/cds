import React, { memo, useMemo } from 'react';

import { ThemeVars } from '../core/theme';
import { defaultMediaSize } from '../tokens/card';
import { gutter } from '../tokens/sizing';
import type {
  CardBaseProps,
  CardBodyBaseProps,
  CardBoxProps,
  DataCardBaseProps,
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
  Text: React.ComponentType<React.PropsWithChildren<TextBaseProps & { color?: ThemeVars.Color }>>;
  TextHeadline: React.ComponentType<React.PropsWithChildren<TextBaseProps>>;
  TextLabel2: React.ComponentType<
    React.PropsWithChildren<TextBaseProps & { color?: ThemeVars.Color }>
  >;
};

/** @deprecated do not use creator pattern in v8 */
export function createDataCard<OnPressFn>({
  Card,
  CardBody,
  HStack,
  ProgressBar,
  ProgressCircle,
  Text,
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
    borderRadius = 0,
    elevation = 0,
    ...cardProps
  }: DataCardBaseProps & { onPress?: OnPressFn }) {
    const content = useMemo(() => {
      const TextEndLabel = progressVariant === 'bar' ? TextLabel2 : Text;
      return (
        <HStack justifyContent="space-between">
          {!!startLabelProp && (
            <TextHeadline testID={`${testID}-start-label`}>{startLabelProp}</TextHeadline>
          )}
          {!!endLabelProp && (
            <TextEndLabel color="fgMuted" testID={`${testID}-end-label`}>
              {endLabelProp}
            </TextEndLabel>
          )}
        </HStack>
      );
    }, [endLabelProp, progressVariant, startLabelProp, testID]);

    return (
      <Card
        borderRadius={borderRadius}
        elevation={elevation}
        gap={2}
        onPress={onPress}
        padding={gutter}
        testID={testID}
        {...cardProps}
      >
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
          padding={0}
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
