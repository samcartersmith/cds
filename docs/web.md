# Web development

## Setup

Please run codegen before running anything else to create necessary code including icons.

```
yarn nx run codegen:all
```

## CDS-Web Development Workflow

The section outlines how components for web should be developed within CDS.

## Storybook

Storybook is the best place to add and iterate on new CDS components for web. The local storybook project is located here: `apps/storybook`

### Run Storybook Local Dev Server

```bash
yarn nx run storybook:start
```

### Build Storybook

```bash
yarn nx run storybook:build
```

### Storybook Deployment

Storybook is deployed to our production instance at https://cds-storybook.cbhq.net/ on every commit. This is configured in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits) through the `infra-shared-prod::cds-storybook` task. If you wish to deploy to our development instance at https://cds-storybook-dev.cbhq.net/ for testing purposes, manually deploy to the `development::cds-storybook` target in Codeflow.

![storybook.png](storybook.png)
