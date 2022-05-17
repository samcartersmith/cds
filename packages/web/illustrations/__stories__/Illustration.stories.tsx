import { storiesOf } from '@storybook/react';
import { sortedImg } from '@cbhq/cds-common/internal/data/sortedIllustrationData';
import { illustrationPercyBuilder } from '@cbhq/cds-common/internal/illustrationPercyBuilder';

import { Box, HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TextLabel1 } from '../../typography';
import { Illustration } from '../Illustration';

const { ListIllustrations } = illustrationPercyBuilder(
  Illustration,
  ThemeProvider,
  (props) => <HStack {...props} />,
  (props) => <VStack {...props} />,
  (props) => <Box {...props} />,
  (props) => <TextLabel1 {...props} as="p" />,
);

let stories = storiesOf('Illustrations', module);

const numIllustrations = sortedImg.length;

let i = 0;
const CHUNK_SIZE = 120;

for (let j = 0; j < numIllustrations; j += CHUNK_SIZE) {
  stories = stories.add(`Sheet ${i}`, () => ListIllustrations(j, j + CHUNK_SIZE));
  i += 1;
}
