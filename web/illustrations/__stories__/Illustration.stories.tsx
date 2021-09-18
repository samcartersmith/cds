import { createStories } from ':cds-storybook/stories/IllustrationPercy';
import { HStack, VStack, Box } from '../../layout';
import { ThemeProvider } from '../../system';
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
