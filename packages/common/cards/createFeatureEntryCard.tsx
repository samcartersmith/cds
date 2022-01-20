import React, { memo } from 'react';

import {
  ButtonBaseProps,
  CardBaseProps,
  CardBodyBaseProps,
  IllustrationSpotSquareNames,
  SpotSquareProps,
} from '../types';

type CreateFeatureEntryCardParams<T> = {
  Button: React.ComponentType<ButtonBaseProps & { onPress?: T }>;
  Card: React.ComponentType<CardBaseProps>;
  CardBody: React.ComponentType<CardBodyBaseProps>;
  SpotSquare: React.ComponentType<SpotSquareProps>;
};

export type FeatureEntryCardProps<T> = {
  title: CardBodyBaseProps['title'];
  description: CardBodyBaseProps['description'];
  spotSquare: IllustrationSpotSquareNames;
  action: string;
  onActionPress: T;
};

export function createFeatureEntryCard<T>({
  Button,
  Card,
  CardBody,
  SpotSquare,
}: CreateFeatureEntryCardParams<T>) {
  const FeatureEntryCard = memo(
    ({ title, description, spotSquare, action, onActionPress }: FeatureEntryCardProps<T>) => {
      return (
        <Card>
          <CardBody
            title={title}
            description={description}
            media={<SpotSquare name={spotSquare} />}
            orientation="horizontal"
          >
            <Button
              flush="start"
              compact
              variant="primary"
              transparent
              onPress={onActionPress}
              endIcon="forwardArrow"
            >
              {action}
            </Button>
          </CardBody>
        </Card>
      );
    },
  );
  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
