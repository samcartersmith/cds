#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

import { initAnalytics, logEvent } from './analytics.js';
import { getVersion, log } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = join(__dirname, '../../mcp-docs');

async function fetchRoute(route: string) {
  const filePath = join(DOCS_PATH, route);

  try {
    return await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

const server = new McpServer({
  name: 'cds_mcp',
  version: getVersion(),
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'list-cds-routes',
  'get all cds doc routes',
  {
    platform: z
      .enum(['web', 'mobile'])
      .describe(
        "the cds package to use for a specific platform. For a react native app this would be 'mobile'",
      ),
  } as const,
  async ({ platform }) => {
    const content = await fetchRoute(join(platform, 'routes.txt'));

    if (!content) {
      await logEvent('cds_mcp.list_cds_routes_error');
      return {
        content: [{ type: 'text', text: 'Error: No routes found' }],
        isError: true,
      };
    }

    await logEvent('cds_mcp.list_cds_routes_success');
    return {
      content: [{ type: 'text', text: content }],
    };
  },
);

server.tool(
  'get-cds-doc',
  'get a specific cds doc route based on the routes available from list-routes',
  {
    route: z
      .string()
      .describe(
        'The route to the cds docs. The path should always have a <platform>/<route> format and end in .txt',
      ),
  } as const,
  async ({ route }) => {
    const content = await fetchRoute(route);

    if (!content) {
      await logEvent('cds_mcp.get_cds_doc_error', route);
      return {
        content: [{ type: 'text', text: `Error: route ${route} not found` }],
        isError: true,
      };
    }

    await logEvent('cds_mcp.get_cds_doc_success', route);
    return {
      content: [{ type: 'text', text: content }],
    };
  },
);

async function main() {
  initAnalytics();

  const transport = new StdioServerTransport();
  await server.connect(transport);

  log(`CDS MCP Server ${getVersion()} is running... `);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
