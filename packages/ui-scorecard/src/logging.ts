import chalk from 'chalk';
import { readFileSync } from 'fs';
import { EOL } from 'os';
import { basename } from 'path';

import { isCI } from './helpers/env';

export type LogParam = string | string[] | Record<string, unknown>;

const filteredKeywords = ['password', 'keyPass'];

function filterKeys(object: Record<string, unknown>) {
  filteredKeywords.forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    delete object[key];
  });
}

function sanitizeString(str: string) {
  for (const key of filteredKeywords) {
    if (str.includes(key)) {
      return `REDACTED because contained keyword ${key}`;
    }

    const matcher = str.match(/([A-Z0-9]{40})/);
    if (matcher) {
      return 'REDACTED because seems to contain a private key';
    }
  }
  return str;
}

function sanitizeRecursive(value: LogParam): LogParam {
  if (typeof value === 'string') {
    return sanitizeString(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeRecursive) as string[];
  }

  if (typeof value === 'object') {
    const objectValue = { ...value } as Record<string, LogParam>;
    filterKeys(objectValue);

    for (const key of Object.keys(objectValue)) {
      objectValue[key] = sanitizeRecursive(objectValue[key]);
    }

    return objectValue;
  }

  return value;
}

function sanitize(value: LogParam) {
  return sanitizeRecursive(value ? (JSON.parse(JSON.stringify(value)) as LogParam) : value);
}

export function logNewLine(stream: { write: (chunk: string) => void } = process.stdout) {
  return stream.write(EOL);
}

function doLog(
  decoratorFunc: (data: string) => string,
  data: LogParam,
  stream?: { write: (chunk: string) => void },
  { buildkitePrefix }: { buildkitePrefix?: string } = {},
) {
  const sanitizedData = sanitize(data);
  const isJson = sanitizedData && typeof sanitizedData === 'object';

  const message: string = isJson
    ? JSON.stringify(sanitizedData, null, 3)
    : sanitizedData.toString();

  stream?.write(
    // It's important that buildkitePrefix is outside of decoratorFunc for Buildkite to recognize it
    `${buildkitePrefix ?? ''}${decoratorFunc(message)} ${EOL}`,
  );
}

export function log(data: LogParam) {
  doLog(chalk.white, data, process.stdout);
}

export function logInfo(data: LogParam) {
  doLog(chalk.white, data, process.stdout, {
    // Only for logInfo we want to add a prefix for Buildkite to group logs
    buildkitePrefix: isCI() ? '--- ' : undefined,
  });
}

export function logDebug(data: LogParam) {
  return doLog(chalk.dim, data, process.stdout);
}

export function logSuccess(data: LogParam) {
  return doLog(chalk.green, data, process.stdout);
}

export function logWarn(data: LogParam) {
  return doLog(chalk.yellow, data, process.stdout);
}

export function logWarns(data: string[]) {
  return doLog(chalk.yellow, data.join(EOL), process.stdout);
}

export function logError(data: LogParam) {
  return doLog(chalk.red, data, process.stderr);
}

export function logVerbose(data: LogParam) {
  return doLog(
    chalk.dim,
    data,
    process.env.VERBOSE_LOGGING === 'true' || isCI() ? process.stdout : undefined,
  );
}

export function logFile(file: string, loggingFn: (data: LogParam) => void) {
  const filename = basename(file);
  loggingFn(`======= Begin ${filename} file =======`);
  readFileSync(file, 'utf-8')
    .split('\n')
    .forEach((line) => loggingFn(line));
  loggingFn(`======= End ${filename} file =======`);
}

export const color = {
  commit: chalk.yellow,
  failure: chalk.red,
  file: chalk.blueBright,
  muted: chalk.gray,
  project: chalk.cyan,
  shell: chalk.magentaBright,
  success: chalk.gray,
  target: chalk.magenta,
  url: chalk.blue,
  warning: chalk.yellow,
};
