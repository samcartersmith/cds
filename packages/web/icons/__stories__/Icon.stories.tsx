import { storiesOf } from '@storybook/react';
import { unicodeMap } from '@cbhq/cds-common/internal/data/iconData';
import {
  CreateIconSheetParams,
  iconSheetBuilderWeb,
} from '@cbhq/cds-common/internal/iconSheetBuilderWeb';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';

const { IconSheet } = iconSheetBuilderWeb({
  platform: 'web',
  VStack,
  HStack,
  Icon,
} as CreateIconSheetParams);

let stories = storiesOf('Icon', module);

const numIcons = Object.keys(unicodeMap).length;

let i = 0;
const CHUNK_SIZE = 50;

for (let j = 0; j < numIcons; j += CHUNK_SIZE) {
  stories = stories.add(`Sheet ${i}`, () => IconSheet(j, j + CHUNK_SIZE));
  i += 1;
}
