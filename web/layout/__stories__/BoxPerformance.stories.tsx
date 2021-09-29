import { withPerformance } from 'storybook-addon-performance';
import { Box } from '../Box';
import { createStories } from ':cds-storybook/stories/PerformanceBenchmark';

export default {
  component: Box,
  title: 'Core Components/Box/Performance',
  decorators: [withPerformance],
};

export const CDSBox = () => (
  <Box alignItems="center" justifyContent="space-between">
    <div>Left</div>
    <div>Right</div>
  </Box>
);

export const SingleDiv = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div>Left</div>
    <div>Right</div>
  </div>
);

export const {
  HundredCDSComponents,
  HundredHTMLComponent,
  ThousandCDSComponents,
  ThousandHTMLComponent,
} = createStories(CDSBox, SingleDiv);
