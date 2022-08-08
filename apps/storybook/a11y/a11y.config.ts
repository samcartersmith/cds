import path from 'path';

// @TODO make this 0 when we have 100% coverage
export const TEST_FAILURES_TO_ALLOW = 4;

/** 🙅 Do not add to these lists without leads approval
 * ❤️‍🩹 Please provide a reason we need to ignore each rule
 * ====================================================== */
export const rulesToIgnoreForStoryId = new Map([
  /** Cards are deprecated */
  // ['components-cards--announcement-cards', ['nested-interactive']],
]);

export const rulesToIgnoreForStoryKind = new Map([
  /** This story has some debug setup that doesn't meet WCAG requirements - but they are for anotation so we'll ignore them */
  ['Core Components/InputStack', ['color-contrast']],
  /** This story is weird, it's mostly used for a visual diff - it renders a select option _outside_ a select element */
  ['Core Components/Inputs/SelectOption', ['aria-required-parent']],
  /** This is an internal component used for composing TextStack, which handles this issue - https://github.cbhq.net/frontend/cds/pull/233/files#r696449 */
  ['Core Components/Inputs/NativeInput', ['label']],
  /** - When these components first mount, the color-contrast test fails.
   *  - Heading order issue is coming from Card (deprecated) */
  ['Core Components/FullscreenAlert', ['color-contrast', 'heading-order']], // https://d.pr/i/Clf6EQ
  ['Core Components/FullscreenModal', ['color-contrast', 'heading-order']], // https://d.pr/i/VC4ZXt
  ['Core Components/Modal', ['color-contrast', 'heading-order']], // https://d.pr/i/ckvp8t
  /** 👨‍🦯 COLOR CONTRAST ISSUES
   * There is a Jira ticket to handle each of these issues individually
   * */
  ['Core Components/Tooltip', ['color-contrast']], // https://d.pr/i/D77xWL
  ['Core Components/TooltipContent', ['color-contrast']], // https://d.pr/i/D77xWL
  ['Core Components/SparklineInteractive', ['color-contrast']],
  ['Core Components/SparklineInteractiveHeader', ['color-contrast']],
  ['Core Components/ProgressBar', ['color-contrast']],
]);

export const storiesToIgnoreByName = [
  // No need to test
  'Logo Sheet',
  'List Illustrations',
];

export const storiesToIgnoreByKind = [
  // Deprecated
  'Core Components/Card',
  'components/Cards',
  'Cards',
];

export const relativePathToStorybook = '../../../.nx/outs/projects/apps/storybook/storybook';
export const storybookUrl = `file://${path.resolve(__dirname, relativePathToStorybook)}`;

// Skip stories that blow up the test runner
export const REGEX =
  /^(?!.*(thousand|hundred|performance|switchers|recipes|illustrations|sheet)).*$/gim;
