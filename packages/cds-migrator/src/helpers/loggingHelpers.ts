import { output } from '@nx/devkit';

export function logDebug(title: string, bodyLines?: string[]) {
  output.log({ title, bodyLines, color: 'white' });
}

export function logWarning(title: string, bodyLines?: string[]) {
  output.warn({ title, bodyLines });
}

export function logError(title: string, bodyLines?: string[]) {
  output.error({ title, bodyLines });
}

export function logSuccess(title: string, bodyLines?: string[]) {
  output.success({ title, bodyLines });
}
