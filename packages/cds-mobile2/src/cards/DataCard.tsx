import { createDataCard } from '@cbhq/cds-common2/cards/createDataCard';

import { HStack } from '../layout/HStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { TextLabel2 } from '../typography/TextLabel2';
import { ProgressBar } from '../visualizations/ProgressBar';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { Card } from './Card';
import { CardBody } from './CardBody';

export type DataCardProps = React.ComponentProps<typeof DataCard>;

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
