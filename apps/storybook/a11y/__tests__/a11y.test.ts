// eslint-disable-next-line jest/no-mocks-import
import '../__mocks__/matchMedia.mock';

import initStoryshots from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';

import { REGEX, storybookUrl } from '../a11y.config';
import { a11yTest } from '../a11yTest';

initStoryshots({
  framework: 'react',
  renderer: render,
  suite: 'A11y checks',
  storyKindRegex: REGEX,
  storyNameRegex: REGEX,
  test: a11yTest({ storybookUrl }),
});
