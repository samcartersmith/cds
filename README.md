

# Coinbase design system

This project was generated using [Nx](https://nx.dev).

This repo is currently a prototype of the new design system polyrepo. 
The existing CDS code used in this repo is a snapshot from https://github.cbhq.net/mono/repo/pull/49327. 
Do not commit the latest CDS master code to this repo.

## Current commands

See Makefile for a list of commands that currently work.

## Tasks

The task list below is needed to get the hello world of the poly repo. There are no new features planned in these tasks.

#### Linting, building, testing,  typechecking and formatting

- [x] common
- [x] utils
- [ ] mobile
- [ ] fonts
- [ ] codegen
- [ ] web
- [ ] website
- [ ] codemod
- [ ] lottie-files

#### Storybook

- [ ] Deploy storybook with web stories
- [ ] Hook up Percy

#### Mobile Playground

- [ ] Deploy mobile playground with mobile stories

#### Website

- [ ] deploy website locally
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

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.


