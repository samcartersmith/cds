# Commands

The CDS website (which can be accessed at [go/cds](https://cds.cbhq.net)) is built using using Docusaurus 2 and Contentful (see [contentful docs](./contentful.md)) and is where we document CDS principles, best practices, components, hooks and more.

This website is very important because it gives the consumers of the design system a centralized location to identify the best way for their team to leverage the design system.

As you implement CDS components it will be expected that you will contribute to this site's documentation to clearly communicate the associated principles to our consumers.

## Local Development

`start` - starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```console
yarn nx run website:start
```

## Build

```console
yarn nx run website:build
```

## Serve

You can serve the built website with the command below. You can use this approach if you wish to test what is deployed to https://cds.cbhq.net in your local environment.

```console
yarn nx run website:serve
```

## Deploy

After a commit is merged to master the website should auto deploy. You can view the status of a deployment on [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits).

The codeflow target is `production::cds-docs`.

![website.png](website.png)

# Deployments

## Codeflow

You can trigger a deploy to dev via [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits). The development target is
`development::cds-docs`.

## Debugging production s3 bucket

1. Go to okta https://coinbase.okta.com/
2. Select AWS
3. Select "production @ read" at bottom of roles list
4. Select s3 card from dashboard
5. URL should be https://s3.console.aws.amazon.com/s3/buckets/coinbase-design-system-website

## Debugging dev s3 buckets

You can delete files from AWS UI for dev environment

1. Go to okta https://coinbase.okta.com/
2. Select AWS
3. Select "sudo-dev @ development" at bottom of roles list
4. Select s3 card from dashboard
5. Search for coinbase-design-system-website-development for dev. For next + other dev envs you can search for `cds`.

# Docs

## Step 1. Add to docgen.config.js

Add the path to the component's source code (without package prefix or file extension) to the `sourceFiles` array in [website/docgen.config.js](../apps/website/docgen.config.js)

```js
module.exports = {
  // ...

  sourceFiles: ['buttons/Button'],

  // ...
};
```

## Step 2. Start website

- Run `yarn nx run website:start` to start the website and watch plugins.
- You will now have access to the API data for components in docgen.config.js.

## Step 3. Create mdx files

### Root file

- Create a root mdx file in [docs/components](../apps/website/docs/components/)
  - The location of this file should mirror the structure of where it lives in sidebar.
    - Most component docs are at the root of the "Components" category, however, there are some components where it makes more sense to bucket it under a family or some base component. For example, Remote Image Group is a child doc of the Remote Image category.
    - As our library grows, going completely flat is going to get too overwhelming.
    - You should work with your design partner to align on naming/api proposals and where component will live in sidebar.

```shell
touch apps/website/docs/components/button/button.mdx
```

### Partials

- `_implementation.mdx` partial for API data

```shell
touch apps/website/docs/components/button/_implementation.mdx
```

```js
import WebPropsTable from ':docgen/web/buttons/Button/api.mdx';
import MobilePropsTable from ':docgen/mobile/buttons/Button/api.mdx';

## Props

<Tabs groupId="platform" variant="secondary">
  <TabItem value="web" label="Web">
    <WebPropsTable />
  </TabItem>
  <TabItem value="mobile" label="Mobile">
    <MobilePropsTable />
  </TabItem>
</Tabs>
```

- `_design.mdx` partial for design guidelines

```shell
touch apps/website/docs/components/button/_design.mdx
```

- `_metadata.mdx` partial for showing import xyz from '@cbhq/cds-xyz` info

```shell
touch apps/website/docs/components/button/_metadata.mdx
```

```js
<Tabs groupId="platform" variant="secondary">
  <TabItem value="web" label="Web">
    <ImportBlock name="Button" from="@cbhq/cds-web/buttons/Button" />
  </TabItem>
  <TabItem value="mobile" label="Mobile">
    <ImportBlock name="Button" from="@cbhq/cds-mobile/buttons/Button" />
  </TabItem>
</Tabs>
```

- `_usage.mdx` for any examples you want to include above API tables

```shell
touch apps/website/docs/components/button/_usage.mdx
```

````js
Buttons must have a visual label (passed as a child), and can use variants to denote intent and importance.

```jsx live
<HStack gap={2}>
  <Button onPress={console.log}>Save</Button>
  <Button onPress={console.log} variant="secondary">
    Cancel
  </Button>
</HStack>
```

````

### Update root file

Depending on the partials you add above, update the root mdx file (button.mdx) with the following

```js
---
title: Button
slug: /components/button
---
import Design, { toc as designToc } from './_design.mdx';
import Metadata, { toc as metadataToc } from './_metadata.mdx';
import Usage, { toc as usageToc } from './_usage.mdx';
import Implementation, { toc as implementationToc } from './_implementation.mdx';

<Tabs groupId="page">
  <TabItem value="design" label="Guidelines" toc={designToc}>
    <Design />
  </TabItem>
  <TabItem
    value="implementation"
    label="Implementation"
    toc={[...metadataToc, ...usageToc, ...implementationToc]}
  >
    <Metadata />
    <Usage />
    <Implementation />
  </TabItem>
</Tabs>

```

### Adding additional partials

Partials at tab level - If you compose your design or implementation tab content using additional partials, don't forget to import in the `toc` from the partial and spread into the TabItem's `toc` prop. The order matters here so the order the items are spread should reflect the order the partials are rendered on the page.

Partials within partials - There's really no good way to handle this at the moment, but one workaround would be to export a toc const with a new name, like `export const customToc = [...toc, ...someOtherPartialToc];`. Unfortunately, since the toc within a partial is a const, you can't override that value and would have to choose a new const name which does not collide with `toc` when exporting.

The Table of Contents section below has more details about why this is necessary.

## Step 4. Update sidebar

Add doc to [sidebar.config.js](../apps/website/sidebar.config.js)

# Table of contents (right sidebar)

## TOCUpdater

If you use mdx partials for breaking up large documentation you lose Docusaurus's automatic table of contents generation in right sidebar.

To get around this we leverage the global [`toc` variable](https://docusaurus.io/docs/2.0.0-beta.20/markdown-features/react#available-exports) that is available for each mdx page and manually create a single `toc` on the main doc where the mdx partials are spread into.

To make this easier we have a component, `@theme/TOCUpdater`, which you can use to pass the aggregated toc into.

```tsx
import Partial1, { toc1 } from './_partial1.mdx'
import Partial2, { toc2 } from './_partial2.mdx'

<TOCUpdater toc={[...toc1, ...toc2]} />

<Partial1 />
<Partial2 />
```

## Table of contents with Tabs

Use the `toc` prop available on the TabItem component. The `toc` prop is passed to `@theme/TOCUpdater` internally.

```tsx
import Design, { toc as designToc } from './_design.mdx';
import Implementation, { toc as implementationToc } from './_implementation.mdx';
import Metadata, { toc as metadataToc } from './_metadata.mdx';
import Usage, { toc as usageToc } from './_usage.mdx';

<Tabs groupId="page">
  <TabItem value="design" label="Guidelines" toc={designToc}>
    <Design />
  </TabItem>
  <TabItem value="eng" label="Engineering" toc={[...usageToc, ...implementationToc]}>
    <Metadata />
    <Usage />
    <Implementation />
  </TabItem>
</Tabs>;
```

# MDX Components

You can view or add any components you want to be globally available in all mdx files in [MDXComponents.tsx file](../packages/docusaurus-theme/src/theme/MDXComponents.tsx) of our theme plugin.

# react-live

## Adding new imports to react-live

For any usage examples, you can use all imports defined in `apps/website/src/theme/ReactLiveScope/index.ts` directly without importing them in your jsx live.

For adding new imports, simply import in the same file and add it to the `ReactLiveScope` object.

# Contentful Content Types

There are two content types in Contentful that are used to create reusable UI components that designers can use when building out pages in Contentful (located in the CMS directory `apps/website/cms`):

- **Modules** components that have specialized styling intended to be used for a specific purpose, eg: `DoDont`.
- **Misc** reusable components that have generic styling intended to be used for a variety of purposes, eg: `Link`.

See [this presentation](https://docs.google.com/presentation/d/1s0WuhcWE3SuangGxCNN5Pg4t7JZPyJfpz6AB7dgPhmE/edit#slide=id.g14700eabb31_0_2) for more details on these types of content.

Whenever you create a new content type you must also configure it in Contentful under the "Content Model" section.

# Sidebar

## Component docs

Our component folder structure no longer reflects the sidebar structure we want to display to users.

Until we update our docs directory structure to match our sidebar structure, we will have to explicitly define each sidebar item in order for it to appear on the website. This will not happen automatically.

## Organization

Most component docs are at the root of the "Components" category, however, there are some components where it makes more sense to bucket them under a family or some base component. For example, RemoteImageGroup is a child of the RemoteImage category. As our library grows, going completely flat is going to get too overwhelming.

Here are some questions to consider when planning:

- How independent/standalone is this component?
- Does this component's existence dependent on anothers? (i.e. InputIcon or AccordionItem)
- Are there any hooks or subcomponents that are specific to this component?

You should work with your design partner to align on _both_ naming/api proposals, and also where the component will live on the website. It's often during these conversations that you might reconsider the component name entirely.

## Sorting

Within each category they follow varying degrees of sorting, but if we were to define some logic it would be:

- Content progression/importance takes priority
  - For example, Getting started is first under foundations.
- Then alphabetize
  - Each added item or category should be alphabetized unless the doc is somewhat supplementary info.
  - For example, under Illustrations we put the component doc pages and then any additional.
- Then any supplementary content (this can vary depending on content also)

## Adding content other than component docs

The categories we currently have were purposefully organized in this way and we want to be more purposeful of any changes to this organization moving forward.

Please do not add new categories/re-organize the main sections without talking with leads first.

## Hide page from sidebar

As mentioned above, no component docs will show up unless explicitly added in this config.

- Option 1: Exclude from [sidebar.config.js](../apps/website/sidebar.config.js)
- Option 2: Add `hidden: true` to the customProps of sidebar item.

# Plugins

Plugins are the building blocks of features in a Docusaurus site. Each plugin handles its own individual feature. Plugins may work and be distributed as part of a bundle via presets.

Docusaurus' implementation of the plugins system provides us with a convenient way to hook into the website's lifecycle to modify what goes on during development/build, which involves (but is not limited to) extending the webpack config, modifying the data loaded, and creating new components to be used in a page.

Plugin code and theme code never directly import each other: they only communicate through protocols (in our case, through JSON temp files and calls to addRoute).

When you run `yarn nx run website:start` you should see a [.docusaurus folder](../apps/website/.docusaurus). This is the `temp` directory the Docusaurus offers for plugins to output content to.

## Docgen plugin

[README](../packages/docusaurus-plugin-docgen/README.md)

## KBar plugin

[README](../packages/docusaurus-plugin-kbar/README.md)

## Theme

If you want to modify any components or styles used in the website, you can do so in the [theme plugin](../packages/docusaurus-theme/README.md).

## Preset

[README](../packages/docusaurus-preset/README.md)
