# Contribute a Breaking Change to CDS

If you are modifying a pattern, please schedule time with USD during office hours to discuss the proposed change. Otherwise, if you are introducing a breaking change to a component, recipe, or other CDS entity complete the following:

- Development will happen on a [release candidate branch](../release/release-candidate.md).
- [Create a PR](../first-pull-request.md) and ask #ask-ui-systems for a review
- Schedule a bug bash with `ui-systems-eng@coinbase.com`. If there are visual changes, then a review from UI Systems Design is also required.

We recommend you use the [CDS Eng Contribution Scope Framework](https://docs.google.com/spreadsheets/u/0/d/1uf6IzEzZst4WvhlLQ-EV5rWQkwHen9lOw9oKMut6PVg/edit) to size the effort, generate acceptance criteria, and required reviewers.

## Acceptance Criteria

- Any visual regressions must be reviewed by design
- Unit, interaction, and visual regression test coverage (if applicable) for all new/removed/modified props and features
- Meets WCAG accessibility standards
- Tested on all devices and browsers

🔗 [Bug Bash Template](go/cds-bugbash-template)
