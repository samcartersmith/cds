import fs from 'fs';

export function isCI(): boolean {
  return !!process.env.CI || !!process.env.BUILDKITE;
}

export function isCD(): boolean {
  return !!process.env.CD || !!process.env.CODEFLOW_COMMIT_TAG;
}

export function isDocker(): boolean {
  return fs.existsSync('/.dockerenv');
}

export function isLocal(): boolean {
  return !isCI() && !isCD() && !isDocker();
}
