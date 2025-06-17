# Publishing CDS Actions

This directory contains GitHub Actions that can be published to specific branches using the `publishToBranch.ts` script.

## Using the Publish Script

The `publishToBranch.ts` script helps publish actions to a specified branch (e.g., 'v3', 'next', or 'latest'). Here's how to use it:

### Prerequisites

- Node.js installed
- Yarn package manager
- Git installed and configured
- Clean working directory (unless using `--allow-dirty`)

### Basic Usage

There are two scripts in package.json that can be used to publish CDS actions.

```bash
"publish-actions-test": "yarn && tsx ./actions/publishToBranch.ts --branch v999"
"publish-actions-prod": "yarn && tsx ./actions/publishToBranch.ts"
```

### Options

- `--branch`: (Required) The target branch to publish to (e.g., 'v3', 'next', 'latest')
- `--allow-dirty`: (Optional) Allows publishing even if the working directory has uncommitted changes
- `--yes` or `-y`: (Optional) Skip confirmation prompts

### Example Commands

```bash
#Publish to v999 for local testing
yarn publish-actions-test

# Publish to v3 branch
yarn publish-actions-prod --branch v3

# Publish to next branch with dirty working directory
yarn publish-actions-prod --branch next --allow-dirty

# Publish to latest branch without confirmation
yarn publish-actions-prod --branch latest --yes
```

### What the Script Does

1. Checks for a clean working directory (unless `--allow-dirty` is specified)
2. Builds all actions using `yarn build-actions`
3. Creates a temporary working directory
4. Copies necessary files:
   - For JavaScript actions:
     - `dist` directory
     - `action.yml`
     - `README.md`
     - `assets` directory (if present)
   - For non-JavaScript actions:
     - All files in the action directory
   - All workflow files from `.github/workflows`
5. Creates or updates the target branch
6. Commits changes with a descriptive message including the source commit hash
7. Shows recent commit history
8. Prompts for confirmation before pushing (unless `--yes` is used)

### Safety Features

- Checks for clean working directory by default
- Shows changes before publishing
- Displays recent commit history
- Requires confirmation before pushing (unless `--yes` is used)
- Exits if no changes are detected

## Available Actions

### cds-adoption-tracker

A GitHub Action for tracking and analyzing CDS (Component Design System) adoption across TypeScript/React projects.

#### Publishing Configuration

The action is configured in its `action.yml` file with:

- Required inputs
- Output specifications
- Runtime environment requirements

#### Version Management

- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Update version numbers in both `action.yml` and release tags
- Document breaking changes in release notes

## Best Practices

- Test actions thoroughly before publishing
- Include clear documentation in the action's README
- Maintain backward compatibility when possible
- Use semantic versioning for releases
- Keep dependencies up to date
- Document any required permissions or secrets

## Support

For questions about publishing or maintaining these actions, contact the CDS team.
