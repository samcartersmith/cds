import { createFeatureEntryCard } from '@cbhq/cds-common/cards/createFeatureEntryCard';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { Button } from '../buttons/Button';
import { SpotSquare } from '../illustrations/SpotSquare';

import { CardFooter } from './CardFooter';

export const FeatureEntryCard = createFeatureEntryCard({
  Button,
  Card,
  CardBody,
  CardFooter,
  SpotSquare,
});
