# Bug Reports

**We require a minimum viable reproduction for all bug reports. Please make sure you are using the [latest CDS version](https://github.cbhq.net/frontend/cds/releases).**

If you're not familiar with creating a minimum viable reproduction, please read these two excellent posts:

- [Craft Minimal Bug Reports](https://matthewrocklin.com/minimal-bug-reports)
- [How to create a Minimal, Reproducible Example](https://stackoverflow.com/help/minimal-reproducible-example)

> - Minimal – Use as little code as possible that still produces the same problem
> - Complete – Provide all parts needed to reproduce the problem
> - Verifiable – Test the code you’re about to provide to make sure it reproduces the problem

A minimum viable reproduction should exist outside your application as an isolated, standalone code snippet that others can easily copy and run without needing additional context. This ensures the issue can be reliably reproduced.

See the [web bugs](#web-bugs), [mobile bugs](#mobile-bugs), and [package bugs](#package-bugs) sections below for instructions on creating a reproduction.

## Web bugs

1. Clone the CDS repo `git clone git@github.cbhq.net:frontend/cds.git`
2. Install dependencies `cd cds && yarn`
3. Create a new branch `git checkout -b bug/modal-oct4-2023`
4. Run `yarn nx run next-app:start` to start the local NextJS dev server.
5. Edit [`apps/vite-app/src/main.tsx`](/apps/vite-app/src/main.tsx) and replace the `<App />` component with a new component containing your minimum viable reproduction.
6. Commit your changes and push up your new branch. You do not need to make a PR.

## Mobile bugs

1. Clone the CDS repo `git clone git@github.cbhq.net:frontend/cds.git`
2. Install dependencies `cd cds && yarn`
3. Confirm your dev environment is set up correctly `yarn setup`
4. Create a new branch `git checkout -b bug/modal-oct4-2023`
5. Run `yarn nx run mobile-app:launch` to get the prebuilds onto your simulator.
6. Run `yarn nx run mobile-app:start` to start developing. You can use local simulators or your own device. Note that you must have already opened the iOS simulator through Xcode to launch it from the terminal here.
7. Edit [`apps/mobile-app/src/App.tsx`](/apps/mobile-app/src/App.tsx) and replace the `<Playground />` component with a new component containing your minimum viable reproduction.
8. Commit your changes and push up your new branch. You do not need to make a PR.

## Package bugs

Package bugs are bugs that happen because of an error or invalid configuration in the publishing or deployment process. This could include issues like:

- Misconfigured package.json fields
- Dependency resolution / semver issues
- Transitive dependencies

For these bugs you can [create a new repo using the Nx template](https://github.cbhq.net/frontend/nx-repo-template/generate) to reproduce the issue.
