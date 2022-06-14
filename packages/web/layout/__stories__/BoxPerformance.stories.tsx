import { withPerformance } from 'storybook-addon-performance';
import { performanceBenchmarkBuilder } from '@cbhq/cds-common/internal/performanceBenchmarkBuilder';

import { Box } from '../Box';

export default {
  component: Box,
  title: 'Core Components/Box/Performance',
  decorators: [withPerformance],
  excludeStories: [
    'CDSBox',
    'SingleDiv',
    'HundredCDSComponents',
    'HundredHTMLComponent',
    'ThousandCDSComponents',
    'ThousandHTMLComponent',
  ],
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
} = performanceBenchmarkBuilder(CDSBox, SingleDiv);
