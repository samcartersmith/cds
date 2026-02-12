import fs from 'node:fs';
import path from 'node:path';

import { getPackageJsonDependencies, loadPackageJson } from '../projectHelpers';

describe('getPackageJsonDependencies', () => {
  it('extracts dependencies into the set', () => {
    const [deps] = getPackageJsonDependencies({
      dependencies: { 'some-lib': '^1.0.0', 'another-lib': '^2.0.0' },
    });

    expect(deps.has('some-lib')).toBe(true);
    expect(deps.has('another-lib')).toBe(true);
  });

  it('extracts devDependencies into the set', () => {
    const [deps] = getPackageJsonDependencies({
      devDependencies: { 'dev-lib': '^1.0.0' },
    });

    expect(deps.has('dev-lib')).toBe(true);
  });

  it('extracts peerDependencies into the set', () => {
    const [deps] = getPackageJsonDependencies({
      peerDependencies: { 'peer-lib': '^1.0.0' },
    });

    expect(deps.has('peer-lib')).toBe(true);
  });

  it('skips workspace:^ dependencies', () => {
    const [deps] = getPackageJsonDependencies({
      dependencies: { '@cbhq/internal-pkg': 'workspace:^' },
    });

    expect(deps.has('@cbhq/internal-pkg')).toBe(false);
  });

  it('populates cdsVersions for packages containing "cds"', () => {
    const [, cdsVersions] = getPackageJsonDependencies({
      dependencies: {
        '@cbhq/cds-web': '^8.0.0',
        '@cbhq/cds-icons': '^5.0.0',
        '@cbhq/cds-illustrations': '^4.0.0',
        'some-lib': '^1.0.0',
      },
    });

    expect(cdsVersions).toEqual({
      '@cbhq/cds-web': '^8.0.0',
      '@cbhq/cds-icons': '^5.0.0',
      '@cbhq/cds-illustrations': '^4.0.0',
    });
  });

  it('populates cdsVersions from devDependencies', () => {
    const [, cdsVersions] = getPackageJsonDependencies({
      devDependencies: { '@cbhq/cds-mobile': '^8.0.0' },
    });

    expect(cdsVersions).toEqual({ '@cbhq/cds-mobile': '^8.0.0' });
  });

  it('falls back to peerDependencies for cds versions only if not found in deps/devDeps', () => {
    const [, cdsVersions] = getPackageJsonDependencies({
      peerDependencies: { '@cbhq/cds-web': '^7.0.0' },
    });

    expect(cdsVersions).toEqual({ '@cbhq/cds-web': '^7.0.0' });
  });

  it('does not use peerDependencies for cds versions when already found in deps', () => {
    const [, cdsVersions] = getPackageJsonDependencies({
      dependencies: { '@cbhq/cds-web': '^8.0.0' },
      peerDependencies: { '@cbhq/cds-web': '^7.0.0' },
    });

    expect(cdsVersions).toEqual({ '@cbhq/cds-web': '^8.0.0' });
  });

  it('always includes react and react-native in the set', () => {
    const [deps] = getPackageJsonDependencies({});

    expect(deps.has('react')).toBe(true);
    expect(deps.has('react-native')).toBe(true);
  });

  it('handles empty package.json', () => {
    const [deps, cdsVersions] = getPackageJsonDependencies({});

    expect(deps.has('react')).toBe(true);
    expect(deps.has('react-native')).toBe(true);
    expect(cdsVersions).toEqual({});
  });
});

describe('loadPackageJson', () => {
  it('returns parsed content for a valid package.json', () => {
    const tmpDir = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'test-'));
    const packageJson = { dependencies: { '@cbhq/cds-web': '^8.0.0' } };
    fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify(packageJson));

    const result = loadPackageJson(tmpDir);
    expect(result).toEqual(packageJson);

    fs.rmSync(tmpDir, { recursive: true });
  });

  it('returns empty object for missing file', () => {
    const result = loadPackageJson('/nonexistent/path');
    expect(result).toEqual({});
  });
});
