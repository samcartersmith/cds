import React, { memo } from 'react';

import {
  ButtonBaseProps,
  CardBaseProps,
  CardBodyBaseProps,
  IllustrationSpotSquareNames,
  SpotSquareProps,
} from '../types';

type CreateFeatureEntryCardParams<T> = {
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps & { onPress?: T }>>;
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps>>;
  CardBody: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps>>;
  SpotSquare: React.ComponentType<React.PropsWithChildren<SpotSquareProps>>;
};

/** @deprecated */
export type FeatureEntryCardProps<T> = {
  title: CardBodyBaseProps['title'];
  description: CardBodyBaseProps['description'];
  spotSquare: IllustrationSpotSquareNames;
  action: string;
  onActionPress: T;
};

/** @deprecated Please use createFeatureEntryCard moving forward. */
export function createFeatureEntryCardDeprecated<T>({
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
            description={description}
            media={<SpotSquare name={spotSquare} />}
            orientation="horizontal"
            title={title}
          >
            <Button
              compact
              transparent
              endIcon="forwardArrow"
              flush="start"
              onPress={onActionPress}
              variant="primary"
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
