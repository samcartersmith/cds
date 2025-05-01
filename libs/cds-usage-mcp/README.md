# CDS Usage MCP Server

An MCP (Model Context Protocol) server that integrates with Sourcegraph to provide code search and analysis capabilities.

### Available Tools

The server exposes the following tools to an LLM:

1. `testSourcegraphConnection`: Test the connection to Sourcegraph and return version information. Useful for quick validation that the MCP Server is installed correctly.
2. `searchReactPropUsage`: Searches Sourcegraph for React code that uses a specific prop from a specific React component
3. `getFileContent`: Retrieves the contents of a specific file from a repository

### Sourcegraph Access Token

You will need to generate an API access token before using any of the server's tools.

1. Visit your Sourcegraph instance (e.g., https://sourcegraph.cbhq.net/)
2. Click your profile icon in the top right
3. Navigate to **Settings > Access tokens**
4. Create a new token with appropriate scopes
5. Copy the token and set it as an environment variable

### Environment Variables

The server requires one environment variable which can be set on your local environment or in the MCP server configuration file.

- `SRC_ACCESS_TOKEN`: Your Sourcegraph access token (see above)

## Installation

### 1. Compile the server from Typescript

Note, this task will run automatically when running the install task below.

If you make any changes to the source code, make sure to rerun this task.

```bash
yarn nx run cds-usage-mcp:build
```

### 2. Configuring MCP Server

For convenience, there is an install script which you can run to automatically set up Cursor with the correct JSON configuration.
The script will walk you through setting up your Sourcegraph environment variables, so have your access token ready before you begin.

```bash
yarn nx run cds-usage-mcp:install
```

For more on MCP Server configuration, take a look at the [Cursor docs](https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers).

### 3. Verify Installation

When you have completed the setup steps, confirm that the server is correctly configured with your MCP Client by prompting it to use the `testSourcegraphConnection` tool.
