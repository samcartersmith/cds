# Creating a Hotfix Release

Hotfixes are emergency releases that resolve incidents and P0 issues (see UI Systems Prioritization Framework [go/dx-ui-systems-prioritization](http://go/dx-ui-systems-prioritization)).

## Things to keep in mind when creating a hotfix

- **Minimize risk**: Limit code changes to reduce the chance of new issues.
- **Avoid Breaking Changes** (when possible): Ensure updates don't disrupt existing functionalities.
- **Test Coverage**: Includes a test to ensure what regressed is not happening after the fix is applied.

## How to create a hotfix

Since we use rolling versioned commits, our hotfixes use the same process, but with additional QA testing and communication.

1. Branch off latest `master`
2. Apply your fix
3. Version the commit using our accepted semver conventions
4. Create a local build and test in an affected consumer’s environment. Leverage oncall engineers on affected team(s) to test a tarball or build your branch locally in their application to verify the fix works.
5. Create a PR and QA visual regressions in CI
6. After merge, alert consumers in #ui-systems-stakeholders and #ask-ui-systems of the fix and call out affected versions that include the regression.
7. Create `cds-migrator` scripts to resolve any breaking changes
8. White glove version bumps for impacted consumers and resolve any breaking changes (if applicable).

### Handling Breaking Changes

If a hotfix necessitates a breaking change, attempt to create an automated resolution with the `cds-migrator` to minimize consumer disruption. Aim to make changes seamless, requiring minimal to no adjustments on the consumer's part.
