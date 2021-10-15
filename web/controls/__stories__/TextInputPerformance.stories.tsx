import { css } from 'linaria';
import { withPerformance } from 'storybook-addon-performance';
import { createStories } from ':cds-storybook/stories/PerformanceBenchmark';

import { TextInput } from '../TextInput';
import { Link } from '../../typography/Link';

export default {
  title: 'Core Components/Inputs/TextInputPerformance',
  component: TextInput,
  decorators: [withPerformance],
};

const borderStyle = css`
  border-width: 1px;
`;

export const CDSTextInput = () => {
  return (
    <TextInput
      label="Label"
      start={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
      end={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
      helperText="Helper Text"
      align="start"
      compact
    />
  );
};

export const HTMLInput = () => {
  return <input className={borderStyle} type="text" id="name" name="name" required />;
};

export const {
  HundredCDSComponents,
  HundredHTMLComponent,
  ThousandCDSComponents,
  ThousandHTMLComponent,
} = createStories(CDSTextInput, HTMLInput);
