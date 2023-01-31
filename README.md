# Coinbase Design System

Welcome to the Coinbase Design System. If you are looking to contribute to CDS you are in the correct place! Please read the sections below to get a better feel for our repo.

If you are looking for something else here are some other important links:

- [View our feature request backlog](https://coda.io/d/CDS-Team_dFaC-pktuzN/Backlog_suIz1#_lufbp)
- [Submit a request for new features/tooling](https://coda.io/d/CDS-Team_dFaC-pktuzN/Submit-a-Request-to-CDS_suHBY#_luhU2)
- Visit the #ask-cds slack channel to ask the team a question

## Getting Started

1. To get started you can run the following commands:

```sh
yarn install
yarn setup
```

2. If you need to run scripts that require access to Figma, add a .env.local file at root of repo with the following:

```
FIGMA_ACCESS_TOKEN=[access or request access to the UI Infra shared vault on 1Password for the token]
```

You need this token for the Figma plugin and to release icons or illustrations. If the script uses this FIGMA_ACCESS_TOKEN, you need this. If you are just running CDS environments locally, you do not need this.

## Organization of our Docs

To ensure doc discoverability we try to keep all docs in the same location; the [docs folder](/docs/). The README in each package simply points to its most relevant documentation which lives in the [docs folder](/docs/).

## Contributing

Once you have run commands above you are ready to start contributing.

- [Opening your first pull request](./docs/first-pull-request.md)
- [Repo Commands](./docs/commands.md): Learn how to leverage our tooling via nx and yarn commands.
- [Web Development](./docs/web.md): Learn how to contibute to the @cbhq/cds-web package.
- [React Native Development](./docs/react-native.md): Learn how to contibute to the @cbhq/cds-mobile package.
- [The CDS Website Development](./docs/website.md): Learn how to contibute to the CDS website which contains our public facing documentation.
- [Testing](./docs/testing.md): Because we support so many teams it is important that our team maintains high test coverage.

## Internal Process and Best Practices

- [Component Development Best Practices](./docs/component-development.md)
- [Release Workflows](./docs/release.md)
- [Bug Priorization Framework](https://coda.io/d/CDS-Team_dFaC-pktuzN/Prioritization-framework_su6Sj#_lu3rn)
- On call guide: [http://go/cds-on-call](https://docs.google.com/document/d/1UQpvgfo7AhA6NKQ9baglmQC7NKu5rJIuzUnvoSvdFyQ/edit#heading=h.g4i6psiisqyg)
- Version Management (coming soon)
- Best practice usage of our build tool - [NX](https://nx.dev/) (coming soon)
- Upgrading React Native in the Mobile Playground (coming soon)
