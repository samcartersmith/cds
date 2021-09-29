import { css } from 'linaria';
import { withPerformance } from 'storybook-addon-performance';
import { createStories } from ':cds-storybook/stories/PerformanceBenchmark';

import { Input } from '../Input';
import { BetaTextInput } from '../BetaTextInput';
import { Link } from '../../typography/Link';

export default {
  title: 'Core Components/Inputs/TextInputPerformance',
  component: Input,
  decorators: [withPerformance],
};

const borderStyle = css`
  border-width: 1px;
`;

export const CDSTextInput = () => {
  return (
    <BetaTextInput
      label="Label"
      startContent={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
      endContent={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
      helperText="Helper Text"
      textAlignInput="start"
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
