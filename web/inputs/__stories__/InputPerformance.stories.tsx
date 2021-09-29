import { css } from 'linaria';
import { withPerformance } from 'storybook-addon-performance';
import { createStories } from ':cds-storybook/stories/PerformanceBenchmark';

import { Input } from '../Input';

export default {
  title: 'Core Components/Inputs/InputPerformance',
  component: Input,
  decorators: [withPerformance],
};

const borderStyle = css`
  border-width: 1px;
`;

export const CDSInput = () => {
  const input = <input type="text" id="name" name="name" required />;

  return <Input borderStyle={borderStyle} testID="input" label="Label" input={input} />;
};

export const HTMLInput = () => {
  return <input className={borderStyle} type="text" id="name" name="name" required />;
};

export const {
  HundredCDSComponents,
  HundredHTMLComponent,
  ThousandCDSComponents,
  ThousandHTMLComponent,
} = createStories(CDSInput, HTMLInput);
