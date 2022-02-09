

# Coinbase design system

This project was generated using [Nx](https://nx.dev).

This repo is currently a prototype of the new design system polyrepo. 
The existing CDS code used in this repo is a snapshot from https://github.cbhq.net/mono/repo/pull/49327. 
Do not commit the latest CDS master code to this repo.

## Running Nx

Once everything is copied and configured, run:

```
yarn install
yarn setup
```

## Current commands

See Makefile for a list of commands that currently work.

## Tasks

The task list below is needed to get the hello world of the poly repo. There are no new features planned in these tasks.

#### Linting, testing, typechecking and formatting

- [x] common
- [x] utils
- [x] mobile
- [x] lottie-files
- [x] fonts
- [x] web
- [x] web utils (webpack, jest, etc.)
- [x] website
- [ ] codegen
- [ ] codemod

#### Stylelint

- [ ] web

#### npm package building

- [x] common
- [x] fonts
- [x] utils
- [x] mobile
- [x] web
- [x] lottie-files
- [ ] static css

#### Storybook

- [x] Deploy storybook locally with web stories
- [ ] Hook up Percy

#### Mobile Playground

- [ ] Deploy mobile playground with mobile stories

#### Website

- [x] deploy website locally
- [ ] deploy dev website
- [ ] deploy prod website

#### Code generation

- [ ] docgen
- [ ] codegen

#### Releases

- [ ] Build release script to auto update package.json's
- [ ] Enable npm publish to verdaccio

#### Buildkite

- [ ] Hook up buildkite

## Repo migration cutover items

- [ ] Migrate mono repo to cds npm packages
- [ ] Turn off website deployments in the monorepo
- [ ] Turn on website deployments in the new polyrepo

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.


