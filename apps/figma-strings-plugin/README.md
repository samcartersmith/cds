# CDS Figma Plugin

## Testing locally

1. Install Figma Desktop
2. Create a new design file (command + n)
3. Go to top menu, Plugins > Development > Import plugin from manifest
4. Select the manifest.json file in cds/apps/figma-strings-plugin/manifest.json
5. Run `yarn nx run figma-strings-plugin:start` to live reload plugin on changes

## Publish

1. Run `yarn nx run figma-strings-plugin:build` to build plugin with changes you wish to publish
2. Open Figma Desktop
3. Go to top menu, Plugins > Development > Import plugin from manifest
4. Select the manifest.json file in cds/apps/figma-strings-plugin/manifest.json
5. The plugin UI should show CDS in development list
6. Click the horizontal kebab icon (three dots) next to CDS and then click 'Publish'
7. Add version notes with list of changes
8. Press 'Update'

The plugin is available for Coinbase Figma users to download [here](https://www.figma.com/community/plugin/1296966863774118588)

## Architecture

Figma plugins have two main concepts, which are actually pretty similiar to React Native.

There is Native and UI context, or in React Native most often referred to as Native vs UI thread.

- `figma-strings-plugin/src/plugin.ts` is where all the native code lives.
- `figma-strings-plugin/src/App.tsx` is where all the UI code lives.

The two communicate with eachother via message events.

## Message listeners

- `figma-strings-plugin/src/plugin.ts` is where you listen to messages from the UI context via `figma.ui.on('message', (message) => {...})`
- `figma-strings-plugin/src/App.tsx` is where you listen to messages from native context via `window.onmessage = event => { const msg = event.data.pluginMessage; ... }`

## Posting messages

- `figma-strings-plugin/src/plugin.ts` is where you can post messages to the UI context via `figma.ui.postMessage({ type: 'some_custom_type' })`
- `figma-strings-plugin/src/App.tsx` is where you can post messages to native context via `window.parent.postMessage({ pluginMessage } '*')`

## Resources

- Plugin guide [here](https://www.figma.com/plugin-docs/)
- API docs [here](https://www.figma.com/plugin-docs/api/api-reference)
