/**
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

export const Sheet0 = () => ListIllustrations(0, 120);
export const Sheet1 = () => ListIllustrations(120, 240);
export const Sheet2 = () => ListIllustrations(240, 360);
export const Sheet3 = () => ListIllustrations(360, 480);
export const Sheet4 = () => ListIllustrations(480, 600);
export const Sheet5 = () => ListIllustrations(600, 720);
export const Sheet6 = () => ListIllustrations(720, 840);
export const Sheet7 = () => ListIllustrations(840, 960);
export const Sheet8 = () => ListIllustrations(960, 1080);
export const Sheet9 = () => ListIllustrations(1080, 1200);
export const Sheet10 = () => ListIllustrations(1200, 1320);
export const Sheet11 = () => ListIllustrations(1320, 1440);
export const Sheet12 = () => ListIllustrations(1440, 1560);
