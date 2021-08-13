import { createStories } from '@cbhq/cds-storybook/stories/IllustrationPercy';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { HStack, VStack, Box } from '../../layout';

import { TextLabel1 } from '../../typography';
import { Illustration } from '../Illustration';

export default {
  title: 'Core Components/Illustration',
  component: Illustration,
};

export const { ListIllustrations } = createStories(
  Illustration,
  ThemeProvider,
  (props) => <HStack {...props} />,
  (props) => <VStack {...props} />,
  (props) => <Box {...props} />,
  (props) => <TextLabel1 {...props} as="p" />,
);
