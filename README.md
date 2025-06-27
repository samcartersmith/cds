# Coinbase Design System

Welcome to the Coinbase Design System. If you are looking to contribute to CDS you are in the correct place! Please read the sections below to get a better feel for our repo.

To make feature requests, report bugs, or request assistance when working with CDS you can find us on slack: #ask-ui-systems

## Get Started

To get started you can run the following commands:

```sh
yarn install
yarn setup
```

## Bug Reports

See the [bug report docs here](/docs/bug-reports.md)

## Organization of our Docs

To ensure doc discoverability we keep all docs in the same location: the [docs folder](/docs/). The README in each package simply points to its most relevant documentation which lives in the [docs folder](/docs/).

## Contributing

Once you have run commands above you are ready to start contributing.

- [Contribution Guides](./CONTRIBUTING.md)
- [Opening your first pull request](./docs/first-pull-request.md)
- [Repo Commands](./docs/commands.md): Learn how to leverage our tooling via nx and yarn commands.
- [Web Development](./docs/web.md): Learn how to contibute to the @cbhq/cds-web package.
- [React Native Development](./docs/react-native.md): Learn how to contibute to the @cbhq/cds-mobile package.
- [The CDS Website Development](./docs/website.md): Learn how to contibute to the CDS website which contains our public facing documentation.
- [Testing](./docs/testing.md): Because we support so many teams it is important that our team maintains high test coverage.
- [Git hooks](./docs/git-hooks.md): Optionally configure Husky for pre-commit linting.

## Internal Process and Best Practices

- [Component Development Best Practices](./docs/component-development.md)
- [Release Workflows](./docs/release.md)
- Bug Priorization Framework [go/dx-ui-systems-prioritization](http://go/dx-ui-systems-prioritization)
- On call guide: [http://go/dx-ui-systems-on-call](https://docs.google.com/document/d/1UQpvgfo7AhA6NKQ9baglmQC7NKu5rJIuzUnvoSvdFyQ/edit#heading=h.g4i6psiisqyg)
- [Engineer's Guide to Contentful](./docs/contentful.md)
- [Deprecations Process](./docs/deprecations.md)
- [Design System Package Decomposition](./docs/package-decomposition.md)
