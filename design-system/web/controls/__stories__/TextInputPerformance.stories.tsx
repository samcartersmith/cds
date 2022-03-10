import { css } from 'linaria';
import { withPerformance } from 'storybook-addon-performance';
import { performanceBenchmarkBuilder } from '@cbhq/cds-common/internal/performanceBenchmarkBuilder';

import { TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/TextInputPerformance',
  component: TextInput,
  decorators: [withPerformance],
};

const borderStyle = css`
  border-width: 1px;
`;

export const CDSTextInput = () => {
  return <TextInput label="Label" helperText="Helper Text" align="start" compact />;
};

export const HTMLInput = () => {
  return <input className={borderStyle} type="text" id="name" name="name" required />;
};

export const {
  HundredCDSComponents,
  HundredHTMLComponent,
  ThousandCDSComponents,
  ThousandHTMLComponent,
} = performanceBenchmarkBuilder(CDSTextInput, HTMLInput);
