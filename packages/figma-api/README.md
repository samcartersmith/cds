# @cbhq/figma-api

API client for interacting with the Figma API.

## How to use

Import the `@cbhq/cds-figma-api` package and call one of the `get` functions to make an API request.

The params and response are 1:1 with the API params accepted by the Figma api.

Please see the JSDoc comments for each utility function for documentation for the endpoint.

## FAQ

- I want to use this package outside of the CDS repo. Is that possible?
  - Currently we do not publish this package since we inline the Figma Access Token. If there is interest to publish this package we can modify it so that the API token is provided via .env variable.
