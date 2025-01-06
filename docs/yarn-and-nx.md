#### Overview

This monorepo manages multiple interrelated TypeScript projects using **Yarn** for dependency management and **Nx** for task orchestration and dependency graph analysis.

### Core Concepts

1. **Yarn Workspaces**:

   - Simplifies dependency management by hoisting shared dependencies to the root `node_modules`.
   - Each project in the monorepo is treated as a "workspace" with its own `package.json`.

2. **Nx**:
   - Nx provides tools for dependency graph analysis, task orchestration, and caching.
   - Each project in the workspace has a `project.json` file for configuration.

### Folder Structure

```
/monorepo-root
├── apps/              # Applications (end-user-facing projects)
├── libs/              # Private shared libraries (reusable code)
├── packages/          # Published shared libraries (reusable code)
├── node_modules/      # Hoisted dependencies
├── nx.json            # Nx global configuration
├── package.json       # Root dependencies and scripts
├── tsconfig.base.json # Shared TypeScript configuration
└── yarn.lock          # Yarn lockfile
```

### Setup and Installation

1. **Install dependencies**:
   ```bash
   yarn install
   ```

Nx automatically detects and registers projects defined in the `apps/`, `libs/`, and `packages/` folders, based on the `nx.json` and `project.json` configurations.

### Running Tasks

1. **Run a build**:

   ```bash
   yarn nx run my-app:build
   ```

2. **Run tests**:

   ```bash
   yarn nx run my-app:test
   ```

3. **Run lint checks**:

   ```bash
   yarn nx run my-app:lint
   ```

4. **Run tasks for affected projects**:

   ```bash
   yarn nx affected --target=build
   ```

5. **Run tasks for all projects except `my-app`**:
   ```bash
   yarn nx run-many --target=build,lint --all --exclude=my-app
   ```

### Dependency Management

1. **Add a dependency**:
   To the root:

   ```bash
   yarn add <package-name>
   ```

   To a specific project:

   ```bash
   yarn workspace <project-name> add <package-name>
   ```

2. **Remove a dependency**:

   ```bash
   yarn remove <package-name>
   ```

3. **Upgrade dependencies**:
   ```bash
   yarn upgrade-interactive
   ```

### TypeScript Configuration

1. Shared settings reside in `tsconfig.base.json`.
2. Each project inherits from the base config and defines additional settings in its `tsconfig.json`.

### Helpful Commands

1. View the dependency graph:

   ```bash
   yarn nx graph
   ```

2. Run all tasks for affected projects since the last commit:

   ```bash
   yarn nx affected
   ```

3. Analyze task timings:

   ```bash
   yarn nx show-tasks-runner
   ```

4. Clear the Nx cache:
   ```bash
   yarn nx reset
   ```

### Troubleshooting

1. **Dependency Issues**:

   - Run `yarn install` to ensure dependencies are installed.
   - Ensure all Nx dependencies are on the same version.

2. **Nx Cache Issues**:

   - Clear the cache with `nx reset`.

3. **Unexpected Behavior**:
   - Verify `project.json` files and `nx.json` for misconfigurations.

### **Further Resources**

- [Nx Documentation](https://nx.dev)
- [Yarn Workspaces Documentation](https://classic.yarnpkg.com/en/docs/workspaces/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
