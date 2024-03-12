import { css } from 'linaria';
import { withPerformance } from 'storybook-addon-performance';
import { performanceBenchmarkBuilder } from '@cbhq/cds-common/internal/performanceBenchmarkBuilder';

import { TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/TextInputPerformance',
  component: TextInput,
  decorators: [withPerformance],
  excludeStories: [
    'HTMLInput',
    'HundredCDSComponents',
    'HundredHTMLComponent',
    'ThousandCDSComponents',
    'ThousandHTMLComponent',
  ],
};

const borderStyle = css`
  border-width: 1px;
`;

export const CDSTextInput = () => {
  return <TextInput compact align="start" helperText="Helper Text" label="Label" />;
};

export const HTMLInput = () => {
  return <input required className={borderStyle} id="name" name="name" type="text" />;
};

export const {
  HundredCDSComponents,
  HundredHTMLComponent,
  ThousandCDSComponents,
  ThousandHTMLComponent,
} = performanceBenchmarkBuilder(CDSTextInput, HTMLInput);
