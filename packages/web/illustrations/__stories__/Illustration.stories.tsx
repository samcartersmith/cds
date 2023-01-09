/* eslint-disable @typescript-eslint/naming-convention */

/**
 * DO NOT MODIFY
 * Generated from packages/codegen/createIllustrationStories/generateWebStories.ts
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

export const spotSquare_0 = () => ListIllustrations('spotSquare', 0, 120);
export const spotSquare_1 = () => ListIllustrations('spotSquare', 120, 240);
export const spotSquare_2 = () => ListIllustrations('spotSquare', 240, 360);
export const spotRectangle_0 = () => ListIllustrations('spotRectangle', 0, 120);
export const spotRectangle_1 = () => ListIllustrations('spotRectangle', 120, 240);
export const spotRectangle_2 = () => ListIllustrations('spotRectangle', 240, 360);
export const heroSquare_0 = () => ListIllustrations('heroSquare', 0, 120);
export const heroSquare_1 = () => ListIllustrations('heroSquare', 120, 240);
export const heroSquare_2 = () => ListIllustrations('heroSquare', 240, 360);
export const heroSquare_3 = () => ListIllustrations('heroSquare', 360, 480);
export const heroSquare_4 = () => ListIllustrations('heroSquare', 480, 600);
export const pictogram_0 = () => ListIllustrations('pictogram', 0, 120);
export const pictogram_1 = () => ListIllustrations('pictogram', 120, 240);
export const pictogram_2 = () => ListIllustrations('pictogram', 240, 360);
export const pictogram_3 = () => ListIllustrations('pictogram', 360, 480);
export const pictogram_4 = () => ListIllustrations('pictogram', 480, 600);
