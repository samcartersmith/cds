import React, { memo, useMemo } from 'react';
import { defaultMediaSize } from '@cbhq/cds-common2/tokens/card';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import type { DataCardBaseProps } from '@cbhq/cds-common2/types';

import { HStack } from '../layout/HStack';
import { type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';
import { ProgressBar } from '../visualizations/ProgressBar';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { Card } from './Card';
import { CardBody } from './CardBody';

export type DataCardProps = DataCardBaseProps & { onPress?: PressableBaseProps['onPress'] };

export const DataCard = memo(function DataCard({
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
}: DataCardProps) {
  const content = useMemo(() => {
    return (
      <HStack justifyContent="space-between">
        {!!startLabelProp && (
          <Text font="headline" testID={`${testID}-start-label`}>
            {startLabelProp}
          </Text>
        )}
        {!!endLabelProp && (
          <Text
            color="fgMuted"
            font={progressVariant === 'bar' ? 'label2' : 'body'}
            testID={`${testID}-end-label`}
          >
            {endLabelProp}
          </Text>
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
