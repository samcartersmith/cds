import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// This is a workaround to having the package.json as a static import.
// ESM requires an assertion "with { type: 'json' }" which is not supported by TypeScript.
const packageJsonPath = resolve(__dirname, '../../package.json');
const packageJsonStr = await readFile(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonStr);

export const version = packageJson.version;

type McpServerType = typeof McpServer;
type StdioServerTransportType = typeof StdioServerTransport;

export function log(...message: string[]) {
  // Using console.error to prevent conflicts with the mcp server which uses stdio to communicate with the client
  console.error('[CDS MCP]', ...message);
}

/**
 * Loads MCP libraries with fallback support.
 * Tries to import @cbhq/mcp first, falls back to @modelcontextprotocol/sdk if not available.
 * This is because @cbhq/mcp is an internal package. We want the ability to use the @modelcontextprotocol/sdk for open source projects.
 *
 * @returns Promise<{ McpServer: McpServerType; StdioServerTransport: StdioServerTransportType; source: string }>
 */
export async function loadMcpLibrary(): Promise<{
  McpServer: McpServerType;
  StdioServerTransport: StdioServerTransportType;
}> {
  try {
    const mcp = await import('@cbhq/mcp');
    log(`using @cbhq/mcp`);
    return {
      McpServer: mcp.McpServer as McpServerType,
      StdioServerTransport: mcp.StdioServerTransport,
    };
  } catch {
    log(`using @modelcontextprotocol/sdk`);
    return {
      McpServer,
      StdioServerTransport,
    };
  }
}
