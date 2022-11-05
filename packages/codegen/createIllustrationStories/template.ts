export const baseTemplate = `/**
 * DO NOT MODIFY
 * Generated from packages/codegen/stories/createIllustrationStories.ts
 */

import { illustrationPercyBuilder } from '@cbhq/cds-common/internal/illustrationPercyBuilder';

import { Box, HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TextLabel1 } from '../../typography';
import { Illustration } from '../Illustration';

export default {
  title: 'Illustrations',
  component: Illustration,
};

const { ListIllustrations } = illustrationPercyBuilder(
  Illustration,
  ThemeProvider,
  (props) => <HStack {...props} />,
  (props) => <VStack {...props} />,
  (props) => <Box {...props} />,
  (props) => <TextLabel1 {...props} as="p" />,
);

`;
