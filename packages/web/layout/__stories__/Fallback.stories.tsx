import { fallbackBuilder } from '@cbhq/cds-common/internal/fallbackBuilder';

import { TextBody } from '../../typography';
import { Fallback } from '../Fallback';
import { VStack } from '../VStack';

export default {
  title: 'Core Components/Fallback',
  component: Fallback,
};

export const { Basic, RectangleWidthVariants } = fallbackBuilder({
  VStack,
  Fallback,
  TextBody: (props) => <TextBody as="p" {...props} />,
});
