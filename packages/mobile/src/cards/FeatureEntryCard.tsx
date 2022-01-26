import { createFeatureEntryCard } from '@cbhq/cds-common/src/cards/createFeatureEntryCard';

import { Button } from '../buttons/Button';
import { SpotSquare } from '../illustrations/SpotSquare';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';

export const FeatureEntryCard = createFeatureEntryCard({
  Button,
  Card,
  CardBody,
  CardFooter,
  SpotSquare,
});
