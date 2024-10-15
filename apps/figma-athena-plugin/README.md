# Athena Figma Plugin

## Note on running the plugin

To run the plugin in Figma you must have:

- Edit access to the Figma file, OR
- Figma developer mode enabled

## Testing locally

1. Run `yarn nx run figma-athena-plugin:dev-watch` to build and live reload plugin on changes
2. Start the server with `yarn nx run figma-athena-plugin:serve`
3. Open Figma Desktop
4. Create a new design file (Command + N)
5. In the Figma top menu, `Plugins` > `Development` > `Import plugin from manifest`
6. Select the `manifest.json` file in `cds/apps/figma-athena-plugin/manifest.json`

* to run the plugin in "production" mode use the `start` command as opposed to `dev-watch`.

## Local Install
In order to develop locally, you will need to install the plugin from source code.

1. Either build the plugin with `yarn nx run figma-athena-plugin:build` or start the dev-server with watch with `yarn nx run figma-athena-plugin:dev-watch`
2. Open any Coinbase Figma file and then in the top menu select **Plugins > Development > Import plugin from manifest...**
3. Find the manifest.json file in the app root directory. Selecting this file will install the plugin in your local Figma application.

## Deployments
1. After merging changes to master, initiate the build process on [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits). This can be done by finding the artifact, `figma-athena` in the list which should have been skipped as no auto-build is set up at this time.
2. Once the build completes, expand the `Deploy to infra-shared-dev` dropdown and select `infra-shared-dev::figma-athena`. This will deploy the Athena server to infra-shared-dev.
3. To publish the latest plugin to Figma, first build the plugin and React app with: `yarn nx run figma-athena-plugin:build`
4. Open any Coinbase Figma file, enter _Dev Mode_ and go to the _Plugins_ tab.
5. From the list of plugins, find `UI Systems - Athena` and select the `Publish` command from the menu on the right side of the row.
6. Make sure to deploy the plugin to _Coinbase_ rather than to _Community_. More details on private organization plugins are found [here](https://help.figma.com/hc/en-us/articles/4404228629655-Create-private-organization-plugins).

## Architecture

[How Plugins Run](https://www.figma.com/plugin-docs/how-plugins-run/)

## Figma Resources

- [Figma Plugin guide](https://www.figma.com/plugin-docs/)
- [Figma Plugin API docs](https://www.figma.com/plugin-docs/api/api-reference)
- [Figma Plugin sample code](https://github.com/figma/plugin-samples)

## CBGPT Resources

- [CBGPT overview](https://docs.cbhq.net/app-services/cbgpt/overview)
- [CBGPT Prompt engineering guide](https://confluence.coinbase-corp.com/display/PLAT/Prompt+Engineering+Guide)
- [CBGPT LLM roadmap](https://confluence.coinbase-corp.com/pages/viewpage.action?spaceKey=PLAT&title=LLM+Roadmap)

## CBGPT API Resources

- [`cb-gpt-service` buf schema](https://buf.cbhq.net/data/cb-gpt-service/docs/main:coinbase.cb_gpt_service.api.v1)
- [`cb-gpt-ml` buf schema](https://buf.cbhq.net/data/cb-gpt-ml/docs/main:coinbase.cb_gpt.engine_service.v1)