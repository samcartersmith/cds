#!/usr/bin/env node

import { execSync } from 'child_process';
import { access, cp, mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function findRepoRoot(startPath: string) {
  try {
    const gitRoot = execSync('git rev-parse --show-toplevel', {
      cwd: startPath,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return gitRoot;
  } catch {
    throw new Error('Could not find repo root');
  }
}

async function copyCursorRule(cursorRoot: string) {
  try {
    // Source file (relative to this script)
    const sourceFile = join(__dirname, 'cds.mdc');

    // Destination directory and file
    const destDir = join(cursorRoot, 'rules');
    const destFile = join(destDir, 'cds.mdc');

    // Create destination directory if it doesn't exist
    await access(destDir).catch(async () => {
      await mkdir(destDir, { recursive: true });
    });

    await cp(sourceFile, destFile);
    console.log(`✅ Copied cursor rule to ${destFile}`);
  } catch (error: unknown) {
    console.error(
      '❌ Failed to copy cursor rule:',
      error instanceof Error ? error.message : String(error),
    );
  }
}

async function installMcpServer(repoRoot: string, cursorRoot: string) {
  const mcpServerConfigPath = join(cursorRoot, 'mcp.json');
  let mcpServerConfig: { mcpServers: Record<string, { command: string; args: string[] }> } = {
    mcpServers: {},
  };

  // When executing with npx, this is the root path
  let workspaceRoot = process.env.npm_config_local_prefix;

  if (!workspaceRoot) {
    workspaceRoot = repoRoot;
    console.warn('WARNING: Using repo root as workspace root because the command was run from npx');
  }

  const relativeWorkspaceRoot = relative(repoRoot, workspaceRoot);
  const prefix = relativeWorkspaceRoot === '' ? '.' : `./${relativeWorkspaceRoot}`;

  const cdsMcpServerConfig = {
    'cds-mcp': {
      command: 'npx',
      // --prefix is needed because Cursor runs the server from "/" instead of the workspace root.
      args: ['--prefix', prefix, 'cds-mcp'],
    },
  };

  try {
    mcpServerConfig = JSON.parse(await readFile(mcpServerConfigPath, 'utf8'));
    mcpServerConfig.mcpServers = {
      ...mcpServerConfig.mcpServers,
      ...cdsMcpServerConfig,
    };
  } catch {
    mcpServerConfig = { mcpServers: cdsMcpServerConfig };
  }

  await writeFile(mcpServerConfigPath, JSON.stringify(mcpServerConfig, null, 2));
  console.log(`✅ Updated MCP server config in ${mcpServerConfigPath}`);
}

const repoRoot = findRepoRoot(process.cwd());
const cursorRoot = join(repoRoot, '.cursor');

await copyCursorRule(cursorRoot);
await installMcpServer(repoRoot, cursorRoot);
