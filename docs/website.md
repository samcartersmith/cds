# CDS Website Development

The CDS website (which can be accessed at [go/cds](https://cds.cbhq.net)) is built using using Docusaurus 2 and is where we document CDS principles, best practices, components, hooks and more. 
This website is very important because it gives the consumers of the design system a centralized location to identify the best way for their team to leverage the design system.

As you implement CDS components it will be expected that you will contribute to this site's documentation to clearly communicate the associated principles to our consumers.

### Local Development

```console
yarn website start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
yarn website build
```

### Serve

You can serve the built website with the command below. You can use this approach if you wish to test what is deployed to https://cds.cbhq.net in your local environment.

```console
yarn website serve
```

### Deploy

After a commit is merged to master the website should auto deploy. You can view the status of a deployment on [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits).

The codeflow target is `production::cds-docs`.

![website.png](website.png)

### Deploy Dev

You can trigger a deploy to dev via [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits). The development target is 
`development::cds-docs`

### Debugging s3 bucket

1. Go to okta https://coinbase.okta.com/
2. Select AWS
3. Select "production @ read" at bottom of roles list
4. Select s3 card from dashboard
5. URL should be https://s3.console.aws.amazon.com/s3/buckets/coinbase-design-system-website

## How to auto generate component docs

Once you have built the component for **_both web and mobile_**. You can auto generate the documentation associated with it by following these steps:

1. If you are not adding new directory, please go to step 2. If you are adding new directory you will need to add the name in `CDS_SUB_DIRS` in `packages/codegen/website/constants.ts`

2. Run `yarn codegen docgen` in the root of the repo (make sure you've exported your component from the appropriate subdirectory, first)

## Adding new imports to react-live

For any usage examples, you can use all imports defined in `apps/website/src/theme/ReactLiveScope/index.ts` directly without importing them in your jsx live.

For adding new imports, simply import in the same file and add it to the `ReactLiveScope` object.

## Hide page from sidebar

If you want to hide your doc page from the sidebar, you can add your component path to `componentsToExcludeByLabel` inside `apps/website/sidebars.js`. For example,

```
const componentsToExcludeByLabel = new Set([
  'components/visualizations/ProgressBar/progress-bar',
]);
```

This is useful when you are prototyping the component and don't want it to be visible to consumers.

## Miscellaneous

For any usage examples, you can use all imports defined in `apps/website/src/theme/ReactLiveScope/index.ts` directly without importing them in your jsx live.

For adding new imports, simply import in the same file and add it to the `ReactLiveScope` object.