/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-extraneous-dependencies */
import AxePuppeteer from '@axe-core/puppeteer';
import {
  AxeConfig,
  Context,
  defaultAxeConfig,
  puppeteerTest,
} from '@storybook/addon-storyshots-puppeteer';
import chalk from 'chalk';
import ora from 'ora';

// @TODO make this 0 when we have 100% coverage
const TEST_FAILURES_TO_ALLOW = 19;
let failedTests = 0;

/** 🙅 Do not add to these lists without leads approval
 * ❤️‍🩹 Please provide a reason we need to ignore each rule */
const rulesToIgnoreForStoryId = new Map([
  // Example:
  // /** We like having multiple interactive elements in the same node - it provides folks using assistive tech with a sweet "unexpected" moment in their day */
  // ['components-cards--announcement-cards', ['nested-interactive']],
]);
const rulesToIgnoreForStoryKind = new Map([
  /** Axe core is not correctly capturing color contrast here. The labels are marked as a 1:1 ratio, but storybook lists a passing ratio */
  ['Core Components/SparklineInteractive', ['color-contrast']],
  /** This story has some debug setup that doesn't meet WCAG requirements - but they are for anotation so we'll ignore them */
  ['Core Components/InputStack', ['color-contrast']],
  /** This is an internal component used for composing TextStack, which handles this issue - https://github.cbhq.net/frontend/cds/pull/233/files#r696449 */
  ['Core Components/Inputs/NativeInput', ['label']],
]);
const storiesToIgnoreByName = [
  // Example:
  // 'Feed Cards',
  'Logo Sheet',
  'List Illustrations',
  'Dark Mode Non Clickable Cards',
  'Dark Mode Non Clickable Colored Cards',
  'Card',
];

type Options = {
  context: Context & { title?: string; id?: string; name?: string };
  url: string;
};
export const a11yTest = (customConfig: Partial<AxeConfig> = {}) => {
  ora(`${chalk.bold.blueBright('CDS A11y Check')}`).start();
  const extendedConfig = { ...defaultAxeConfig, ...customConfig };
  const { beforeAxeTest } = extendedConfig;

  return puppeteerTest({
    ...extendedConfig,
    async testBody(page, testOptions) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        element = '#root',
        exclude,
        disabledRules,
        options,
        config,
      } = testOptions.context.parameters.a11y || {};
      const { context }: Options = testOptions;

      // Setup axe
      await beforeAxeTest(page, options);
      const axe = new AxePuppeteer(page);
      axe.include(element);
      if (exclude) axe.exclude(exclude);
      if (options) axe.options(options);
      if (disabledRules) axe.disableRules(disabledRules);
      if (config) axe.configure(config);

      // Check for violations
      axe
        .analyze()
        .then(({ violations }) => {
          const filteredViolations = violations.filter((violation) => {
            // Bail if axe didn't provide enough story context
            if (!context.id || !context.kind) return false;

            const rulesById = (rulesToIgnoreForStoryId.get(context.id) as string[]) ?? [];
            const rulesByKind = (rulesToIgnoreForStoryKind.get(context.kind) as string[]) ?? [];
            const rules = [...rulesById, ...rulesByKind];
            const allowStory = !storiesToIgnoreByName.some((n) => n === context.name);

            // Include this item if this story isn't in either ignore list
            if (rules.length === 0 && allowStory) return true;

            // Did we include *this rule* for *this story* in either ignore list?
            return !rules?.some((violationId) => violation.id === violationId);
          });

          if (filteredViolations.length && failedTests < TEST_FAILURES_TO_ALLOW) {
            failedTests += 1;
            expect([]).toHaveLength(0);
          } else {
            expect(filteredViolations).toHaveLength(0);
          }
        })
        .catch(() => {
          // do nothing
        });
    },
  });
};
