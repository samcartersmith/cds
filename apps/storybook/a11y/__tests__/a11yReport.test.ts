// eslint-disable-next-line jest/no-mocks-import
import '../__mocks__/matchMedia.mock';

import initStoryshots from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';
import path from 'path';

import { a11yReport } from '../a11yReport';

const relativePathToStorybook = '../../../../.nx/outs/projects/apps/storybook/storybook';
const storybookUrl = `file://${path.resolve(__dirname, relativePathToStorybook)}`;

// Skip stories that blow up the test runner
const REGEX = /^(?!.*(thousand|hundred|performance|switchers|recipes|illustrations)).*$/gim;

initStoryshots({
  framework: 'react',
  renderer: render,
  suite: 'A11y checks',
  storyKindRegex: REGEX,
  storyNameRegex: REGEX,
  test: a11yReport({ storybookUrl }),
});
