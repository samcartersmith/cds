import { createDataCard } from '@cbhq/cds-common/cards/createDataCard';

import { HStack } from '../layout/HStack';
import { createText } from '../typography/createText';
import { ProgressBar } from '../visualizations/ProgressBar';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { Card } from './Card';
import { CardBody } from './CardBody';

export type DataCardProps = React.ComponentProps<typeof DataCard>;

const TextBody = createText('body', { as: 'p' });
const TextHeadline = createText('headline', { as: 'h4' });
const TextLabel2 = createText('label2', { as: 'p' });

export const DataCard = createDataCard({
  Card,
  CardBody,
  HStack,
  ProgressBar,
  ProgressCircle,
  TextBody,
  TextHeadline,
  TextLabel2,
});
