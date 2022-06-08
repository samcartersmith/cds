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

import {
  rulesToIgnoreForStoryId,
  rulesToIgnoreForStoryKind,
  storiesToIgnoreByKind,
  storiesToIgnoreByName,
  TEST_FAILURES_TO_ALLOW,
} from './a11.config';

let failedTests = 0;

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
            const stories = [...storiesToIgnoreByName, ...storiesToIgnoreByKind];
            const allowStory = !stories.some((nameOrKind) =>
              [context.name, context.kind].includes(nameOrKind),
            );

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
