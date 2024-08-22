# Athena Figma Plugin

<!-- description here -->
<!-- link to project doc? -->

## Testing locally

1. Install Figma Desktop
2. Create a new design file (command + n)
3. Go to top menu, `Plugins` > `Development` > `Import plugin from manifest`
4. Run `yarn nx run figma-athena-plugin:watch` to build and live reload plugin on changes
5. Select the `manifest.json` file in `cds/apps/figma-athena-plugin/manifest.json`

## Publish

1. Run `yarn nx run figma-athena-plugin:build` to build plugin with changes you wish to publish
2. Open Figma Desktop
3. Go to top menu, `Plugins` > `Development` > `Import plugin from manifest`
4. Select the `manifest.json` file in `cds/apps/figma-athena-plugin/manifest.json`
5. The plugin UI should show CDS in development list
6. Click the horizontal kebab icon (three dots) next to CDS and then click 'Publish'
7. Add version notes with list of changes
8. Press 'Update'

<!-- TODO: replace with published link -->
<!-- The plugin is available for Coinbase Figma users to download [here](https://www.figma.com/community/plugin/1296966863774118588) -->

## Architecture

Figma plugin logic is split across two threads: the UI thread and the native thread. The UI thread is where the plugin's UI is rendered, user interactions are handled, and has access to browser API's. The native thread is where the plugin's native code runs and where the Figma API is accessed. See [How Plugins Run](https://www.figma.com/plugin-docs/how-plugins-run/) for more. The two threads communicate with each other via message events.

- `athena-plugin/src/plugin.ts` is where all the native code lives and where you listen to messages from the UI context via `figma.ui.on('message', (message) => {...})` or post them via `figma.ui.postMessage({ type: 'some_custom_type' })`
- `athena-plugin/src/App.tsx` is where all the UI code lives and where you listen to messages from native context via `window.onmessage = event => { const msg = event.data.pluginMessage; ... }` and post them via `parent.postMessage({ pluginMessage }, '*')`

## Resources

- Plugin guide [here](https://www.figma.com/plugin-docs/)
- API docs [here](https://www.figma.com/plugin-docs/api/api-reference)
