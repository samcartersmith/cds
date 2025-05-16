import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { formatFileLookupResults, formatSearchResults, formatVersionInfo } from './formatters.js';
import { executeSrcCommand, testConnection } from './sourcegraph.js';

// Create an MCP server
const server = new McpServer({
  name: 'Sourcegraph (React prop usage) MCP Server',
  version: '0.1.0',
});

////////// TOOLS ////////////////////
enum ToolType {
  testSourcegraphConnection = 'testSourcegraphConnection',
  getFileContent = 'getFileContent',
  searchReactPropUsage = 'searchReactPropUsage',
}

// Add a tool to test the Sourcegraph connection
server.tool(
  ToolType.testSourcegraphConnection,
  'Test the connection to Sourcegraph and return version info',
  async () => {
    try {
      const versionInfo = await testConnection();
      return {
        content: [
          {
            type: 'text',
            text: formatVersionInfo(versionInfo),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error connecting to Sourcegraph: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
        isError: true,
      };
    }
  },
);

// Add a tool to get specific file content
server.tool(
  ToolType.getFileContent,
  `
    Returns the contents of a specific file in GitHub via the Sourcegraph API.
    Useful for gathering more context on a particular file or for when the user requests the source code of a specific file.
    If the file is not found, do not attempt to retrieve the file by another method.
  `,
  {
    repository: z.string().describe('Repository name (e.g., github.com/user/repo)'),
    path: z.string().describe('File name or path to a file within the repository'),
    revision: z.string().optional().describe('Git revision (branch, tag, or commit hash)'),
  },
  async ({ repository, path, revision = 'HEAD' }) => {
    try {
      // Construct the query to get file content
      const query = `count:1 repo:^${repository}$ file:${path}$ rev:${revision}`;
      const fileContent = await executeSrcCommand('search', ['-json', query]);

      // Format the results
      const formattedContent = formatFileLookupResults(fileContent);
      return {
        content: [
          {
            type: 'text',
            text: formattedContent || 'File not found or empty.',
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving file content: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
        isError: true,
      };
    }
  },
);

// Add a tool to search for React component prop usage
server.tool(
  ToolType.searchReactPropUsage,
  `
    This tool searches Sourcegraph to find code that uses a specific prop of a React component.
    This could be helpful for React component library maintainers when they need to understand the usage of their components.
    It could also be helpful for when React component library maintainers want to remove a prop and need to know how many customers would be affected by the change.
  `,
  {
    propName: z.string().describe('Name of the prop to search for'),
    componentName: z.string().describe('Name of the React component that owns the prop'),
    repo: z.string().optional().describe('Repository to search (e.g., frontend/coinbase-www)'),
    limit: z
      .string()
      .optional()
      .default('10')
      .describe('Maximum number of results to preview in the response'),
  },
  async ({ componentName, propName, repo, limit }) => {
    try {
      // Construct the regex pattern for searching component prop usage
      // The pattern looks for something like <ComponentName propName=
      const regexPattern = `/<${componentName}\\b[^>]*?\\b${propName}=/`;
      // to limit the results returned by Sourcegraph, add count:${limit}
      // count:all will perform an exhaustive search but may time out
      let query = `${regexPattern} -file:.*.test.* count:all`;

      if (repo) {
        query += ` repo:${repo}`;
      }

      const searchResults = await executeSrcCommand('search', ['-json', query]);

      return {
        content: [
          {
            type: 'text',
            text: formatSearchResults(searchResults, parseInt(limit, 10)),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error searching for component prop usage: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
        isError: true,
      };
    }
  },
);

////////// PROMPTS ////////////////////
enum PromptType {
  searchForReactPropUsage = 'search-for-react-prop-usage',
}

server.prompt(
  PromptType.searchForReactPropUsage,
  {
    propName: z.string(),
    reactComponentName: z.string(),
    searchResultsLimit: z.string().optional(),
  },
  ({ propName, reactComponentName, searchResultsLimit }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `
            Use the ${
              ToolType.searchReactPropUsage
            } tool to search for usage of the prop ${propName} of the React component ${reactComponentName}.
            ${searchResultsLimit ? `Limit the results to ${searchResultsLimit} items.` : ''}
            
            Only report back the usage results as a list.
            Each item in the list contains:
              - the name of the file
              - a GitHub link to the line of code that matched the search
              - the code preview snippet 
              
            Wait for the user to prompt further if they they want to examine any of the results further.
          `,
        },
      },
    ],
  }),
);

// Start the server using the stdio transport
const start = async () => {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    // Log environment variables for debugging (without the token)
    console.error(`SRC_ENDPOINT: ${process.env.SRC_ENDPOINT ? 'Set' : 'Not set'}`);
    console.error(`SRC_ACCESS_TOKEN: ${process.env.SRC_ACCESS_TOKEN ? 'Set' : 'Not set'}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

start();
