# JavaScript Dependency Hoisting

To understand dependency hoisting you should first have a basic understanding of `node_modules`, as well as using [yarn workspaces](https://yarnpkg.com/features/workspaces) to create monorepos.

### Table of contents

1. [What is dependency hoisting?](#what-is-dependency-hoisting)
2. [When does dependency hoisting happen?](#when-does-dependency-hoisting-happen)
3. [How does dependency hoisting create bugs?](#how-does-dependency-hoisting-create-bugs)
4. [Can I see an example in a running app?](#can-i-see-an-example-in-a-running-app)
5. [How do I solve direct dependency hoisting issues?](#how-do-i-solve-direct-dependency-hoisting-issues)
6. [Why are transitive dependency hoisting issues more problematic?](#why-are-transitive-dependency-hoisting-issues-more-problematic)
7. [What kind of bugs am I likely to see?](#what-kind-of-bugs-am-i-likely-to-see)
8. [Can I disable dependency hoisting?](#can-i-disable-dependency-hoisting)
9. [What are some signs of hoisting issues to look out for?](#what-are-some-signs-of-hoisting-issues-to-look-out-for)
10. [How do I debug hoisting issues?](#how-do-i-debug-hoisting-issues)

### What is dependency hoisting?

Dependency hoisting is the practice of lifting dependencies (such as `node_modules`) to a higher parent directory within a monorepo, so that those dependencies can be shared by the source code workspaces that depend on them. Dependency hoisting is done automatically by package managers like `yarn` and `npm` when installing dependencies. This document will focus on yarn since it's the Coinbase paved road for JS dependency management. Understanding when and why dependency hoisting happens is crucial to preventing an entire class of difficult-to-debug issues.

Dependency hoisting itself is not the problem. The problem is actually when dependencies _aren't_ hoisted, which leads to multiple copies of a given dependency. These multiple copies are what cause the issues.

### When does dependency hoisting happen?

Dependency hoisting can happen both with direct dependencies and transitive dependencies when you run `yarn install`. Direct dependencies are dependencies listed in your package.json file. Those direct dependencies also have dependencies of their own, which are known as transitive dependencies. In other words, transitive dependencies are dependencies listed in the package.json files of your direct dependencies.

When running `yarn install` in a yarn workspaces monorepo, yarn will attempt to hoist all direct and transitive dependencies to the repo root if possible. Hoisting a specific dependency is possible when multiple workspaces in your monorepo depend on compatible versions of that dependency.

Imagine you start with a repo that looks like this:

```
root/
├─ apps/
│  ├─ my-app/
│  │  ├─ package.json
├─ packages/
│  ├─ package-one/
│  │  ├─ package.json
│  ├─ package-two/
│  │  ├─ package.json
```

If `package-one` and `package-two` both have a single dependency on `framer-motion@10.x`, and `my-app` depends on both `package-one` and `package-two`, running `yarn install` would result in the following file structure:

```
root/
├─ node_modules/
│  ├─ framer-motion@10.x
├─ apps/
│  ├─ my-app/
│  │  ├─ package.json
├─ packages/
│  ├─ package-one/
│  │  ├─ package.json
│  ├─ package-two/
│  │  ├─ package.json
```

Where `framer-motion@10.x` has been hoisted to the repo root. Since all workspaces in the monorepo depend on the same `framer-motion@10.x`, and in our simple example `framer-motion` is the only dependency, every installed dependency has been hoisted to the repo root. This results in a single `node_modules` folder, where all dependencies are resolved. This means there are never two copies of `framer-motion` running within the same `my-app`, so there cannot be any hoisting issues.

Now imagine instead that `package-one` depends on `framer-motion@9.x` while `package-two` depends on `framer-motion@10.x`, and `my-app` still depends on both `package-one` and `package-two`. Running `yarn install` now will result in the following file structure:

```
root/
├─ node_modules/
│  ├─ framer-motion@9.x
├─ apps/
│  ├─ my-app/
│  │  ├─ package.json
├─ packages/
│  ├─ package-one/
│  │  ├─ package.json
│  ├─ package-two/
│  │  ├─ package.json
│  │  ├─ node_modules/
│  │  │  ├─ framer-motion@10.x
```

Where `framer-motion@9.x` has been hoisted to the repo root, and `framer-motion@10.x` has been installed in `packages/package-two/node_modules/`. This creates two different copies of `framer-motion` in the repo, and since `my-app` depends on both packages, the app will now have two copies of `framer-motion` in its dependency graph.

### How does dependency hoisting create bugs?

Bugs are actually caused by dependencies _not_ being hoisted. Hoisting dependencies so that there is only one copy of a dependency in the repo solves the root issue - which is having multiple copies of a dependency.

The fundamental problem with dependency hoisting is not that two different versions of a dependency (e.g. `framer-motion@9.x` and `framer-motion@10.x`) are necessarily incompatible. The core problem is that there are two copies of the dependency's code in the application's dependency graph. Even if the two copies of a dependency are identical versions (e.g. `framer-motion@9.1.0` and `framer-motion@9.1.0`), the fact that two copies exist in the application's dependency graph can still cause bugs.

Imagine `framer-motion` has some global or module-level state or variable that `package-one` affects in some way. The memory references to these JS objects exist within the `framer-motion@9.x` codebase. When `package-two` interacts with the `framer-motion@10.x` code, it obviously won't have access to any of the JS objects from the `framer-motion@9.x` code. In your app, which depends on `package-one` and `package-two` and interacts with `framer-motion`, you probably expect the `framer-motion` behavior to be identical in all parts of the application - but since `package-one` and `package-two` are using completely different JS references, you might see inconsistencies, unexpected behavior, bugs, or straight up broken UI.

Note that this also means your application will include both versions of `framer-motion` when bundling at build time! While the additional bundle size is bad, the more important and fundamental issue is that different parts of your application are references different JS objects in memory.

This example demonstrated dependency hoisting with direct dependencies. Unfortunately this same hoisting problem can occur with transitive dependencies, which are significantly more troublesome to solve.

### Can I see an example in a running app?

Check out the [`js-dependency-hoisting` repo here](https://github.cbhq.net/cody-nova/js-dependency-hoisting) for a reproduction of an obvious hoisting problem. Simple clone the repo, install the dependencies, and run `yarn dev` to see the results.

### How do I solve direct dependency hoisting issues?

The simplest and best solution is to use a Single Version Policy in your monorepo. This means enforcing that all workspaces in your monorepo depend on the exact same version of a given dependency. Tools like `yarn constraints` exist to help enforce rules like the single version policy. You can read more about yarn constraints and [enforcing a single version policy here](https://docs.cbhq.net/frontend/nx/yarn-constraints).

If you're balking at the idea of enforcing a single version policy in your repo, your repo is likely not correctly managed / segregated. Repos should generally be built around a single team, who own and maintain all of the dependencies in that repo, and who have the subject matter expertise to upgrade dependencies across all the workspaces of that repo.

### Why are transitive dependency hoisting issues more problematic?

It's relatively simple to enforce a single version policy for direct dependencies. However, each of those direct dependencies could also have dependencies - and different versions of these transitive dependencies can cause the exact same hoisting problems. There is no silver bullet solution here for application owners. Your best option is to be strict about allowing new dependencies into the repo, keeping them to a manageable level, and trying to pay attention to the dependencies of your dependencies. If you do spot hoisting issues with transitive dependencies that you're unable to otherwise resolve, you can try using [the `yarn resolutions` feature](https://yarnpkg.com/configuration/manifest#resolutions) to force transitive dependencies to resolve to a single version.

Package owners have `peerDependencies` to try to prevent these hoisting problems in their consumer's apps. A package's `peerDependencies` are not automatically installed, which means the application owner must manually install `peerDependencies`. By making libraries like `framer-motion` a peer dependency of your package (rather than a normal dependency) a package owner can allow the package consumer to choose which version of the peer dependency to install. Using a permissive versioning strategy for `peerDependencies` increases the likelihood that these dependencies will be compatible (and hoistable) with any other package that also depends on them.

### What kind of bugs am I likely to see?

It's impossible to be specific here, because you could see literally any JavaScript bug that could occur due to referencing two different JS objects when you're expecting only a single reference. Generally things like module-level state, React context, etc. are very susceptible to hoisting bugs.

### Can I disable dependency hoisting?

Yes, yarn has the [`nmHoistingLimits`](https://yarnpkg.com/configuration/yarnrc#nmHoistingLimits) rule that allows disabling hoisting - but this makes the problem worse. Now you're always guaranteed to have multiple copies of a dependency in your monorepo if any two workspaces depend on it. Instead of disabling hoisting, try to ensure everything is always hoisted, so that there can only be one copy of each dependency in the monorepo. This means enforcing a single version policy on direct dependencies, and trying to monitor transitive dependencies.

### What are some signs of hoisting issues to look out for?

If you're unable to reproduce a bug or issue outside of your monorepo, it could be caused by package hoisting. Issues with global or module-level state, React context, etc. may also be caused by hoisting.

Theming or animation issues in CDS packages may indicate problems with hoisting. CDS makes heavy use of React context, and several repos have many different versions of CDS.

### How do I debug hoisting issues?

You can use the [`cds-hoisting-test` tool](https://github.cbhq.net/cody-nova/cds-hoisting-test) to try to debug an issue that you think might be caused by dependency hoisting. This tool forces specified dependencies to be hoisted, which allows you to validate whether the bug was caused by multiple copies of the dependency. These changes should not be committed, and are just for testing purposes. If you use the tool to identify that the issue was caused by multiple copies of `framer-motion`, for example, you can work towards fixing the `framer-motion` hoisting in your repo.

You can inspect the `yarn.lock` file to validate whether a given dependency has multiple installed versions, or search all the `node_modules/` directories in your monorepo for the dependency name in question. You can also run [`yarn why`](https://yarnpkg.com/cli/why) with `yarn why -R my-dependency-name` to see a list of the workspace paths that lead to a given dependency.

If you need a basic polyrepo React webpack application to test if you can reproduce an issue outside of your monorepo, you can use the [cds-test](https://github.cbhq.net/cody-nova/cds-test) repo.
