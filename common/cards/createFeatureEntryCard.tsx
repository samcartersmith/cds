import React, { memo } from 'react';

import {
  ButtonBaseProps,
  CardBaseProps,
  CardBodyBaseProps,
  CardFooterBaseProps,
  IllustrationSpotSquareNames,
  SpotSquareProps,
} from '../types';

type CreateFeatureEntryCardParams<T> = {
  Button: React.ComponentType<ButtonBaseProps & { onPress?: T }>;
  Card: React.ComponentType<CardBaseProps>;
  CardBody: React.ComponentType<CardBodyBaseProps>;
  CardFooter: React.ComponentType<CardFooterBaseProps>;
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
  CardFooter,
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
          />
          <CardFooter>
            <Button compact variant="secondary" onPress={onActionPress}>
              {action}
            </Button>
          </CardFooter>
        </Card>
      );
    },
  );
  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
