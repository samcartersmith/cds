import { spawnSync } from 'node:child_process';
import path from 'node:path';

const CLI_PATH = path.resolve(__dirname, '../check-modal-descendants.ts');

function runCli(fixtureName: string, extraArgs: string[] = []) {
  const cwd = path.resolve(__dirname, '__fixtures__', fixtureName);
  const result = spawnSync(
    'node',
    ['-r', 'ts-node/register/transpile-only', CLI_PATH, '--quiet', ...extraArgs],
    {
      cwd,
      encoding: 'utf-8',
      env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' },
    },
  );

  if (result.error) {
    throw result.error;
  }

  return result;
}

describe('cds-migrator-modal-descendant-check', () => {
  it('reports v7 descendants rendered directly under Modal', () => {
    const result = runCli('direct-modal');
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('ModalBody from @cbhq/cds-web/v7/overlays/Modal/ModalBody');
    expect(result.stdout).toContain('App.tsx');
  });

  it('detects styled modal wrappers that contain v7 descendants', () => {
    const result = runCli('styled-wrapper');
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('inside CustomModal');
    expect(result.stdout).toContain('ModalBody from @cbhq/cds-web/v7/overlays/Modal/ModalBody');
  });

  it('traces locally declared components rendered under a Modal', () => {
    const result = runCli('local-component');
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('Modal > LegacyContent');
    expect(result.stdout).toContain('ModalBody from @cbhq/cds-web/v7/overlays/Modal/ModalBody');
  });

  it('resolves lazy-loaded descendants rendered in a Modal', () => {
    const result = runCli('lazy-component');
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('Modal > LazyLegacy');
    expect(result.stdout).toContain('LegacyContent.tsx');
  });

  it('follows wrapper components declared in other files', () => {
    const result = runCli('wrapper-file');
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('WrapperModal.tsx');
    expect(result.stdout).toContain('inside Modal');
  });

  it('reports v7 components imported through intermediate files', () => {
    const result = runCli('imported-component');
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('ImportedContent > LegacyBody');
    expect(result.stdout).toContain('LegacyBody.tsx');
  });
});
