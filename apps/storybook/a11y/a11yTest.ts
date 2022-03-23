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
import path from 'path';
import { writePrettyFile } from '@cbhq/cds-web-utils';

type Report = {
  id?: string;
  name?: string;
  title?: string;
  kind?: string;
  violations: unknown[];
  passes: number;
};
type Results = {
  timestamp: string | Date;
  report: Report[];
};
const results: Results = { timestamp: new Date(), report: [] };
const logger: unknown[] = [];

const outFile = path.resolve(__dirname, '../../website/data/a11yReport.ts');
const getReport = (content: unknown) => {
  const json = JSON.stringify(content);
  return `
/**
 * DO NOT MODIFY
 * Generated from yarn storybook a11y 
 */

export const a11yReport = ${json} as const`;
};

type Options = {
  context: Context & { title?: string; id?: string; name?: string };
  url: string;
};
export const a11yTest = (customConfig: Partial<AxeConfig> = {}) => {
  const spinner = ora(`${chalk.bold.blueBright('CDS A11y Check')}`).start();
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

      await beforeAxeTest(page, options);
      const axe = new AxePuppeteer(page);
      axe.include(element);

      // Log Title
      if (!logger.includes(context.title)) {
        logger.push(context.title);
        spinner.info(chalk.black.bold.bgBlueBright(context.title));
      }

      // Setup configs
      if (exclude) axe.exclude(exclude);
      if (options) axe.options(options);
      if (disabledRules) axe.disableRules(disabledRules);
      if (config) axe.configure(config);

      // Check for violations
      const { violations, passes } = await axe.analyze();

      // Write the file
      try {
        results.report.push({
          id: context.id,
          name: context.name,
          title: context.title,
          kind: context.kind,
          violations,
          passes: passes.length,
        });
        await writePrettyFile({
          outFile,
          contents: getReport(results),
          logInfo: false,
          parser: 'typescript',
        });

        // Log the report
        const total = chalk[violations.length ? 'redBright' : 'greenBright'](
          `${passes.length}/${passes.length + violations.length}`,
        );
        spinner[violations.length ? 'fail' : 'succeed'](`${total} - ${context.name}`);
      } catch (error) {
        if (error instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(error);
          spinner.fail(`Something went wrong while trying to get a report for ${context.name}`);
        } else {
          throw error;
        }
      }

      expect(violations).toHaveLength(0);
    },
  });
};
