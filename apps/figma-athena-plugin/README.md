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

## Publish

1. Run `yarn nx run figma-athena-plugin:build` to build plugin with changes you wish to publish
2. Open Figma Desktop
3. In the Figma top menu, `Plugins` > `Development` > `Import plugin from manifest`
4. Select the `manifest.json` file in `cds/apps/figma-athena-plugin/manifest.json`
5. The plugin UI should show CDS in development list
6. Click the horizontal kebab icon (three dots) next to CDS and then click 'Publish'
7. Add version notes with list of changes
8. Press 'Update'

<!-- TODO: replace with published link -->
<!-- The plugin is available for Coinbase Figma users to download [here](https://www.figma.com/community/plugin/1296966863774118588) -->

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