# Contribute a Component to CDS

## Step 1: Ideation

Sign up for [UI Systems Office Hours](https://calendar.google.com/calendar/u/0/selfsched?sstoken=UUNSQVZDdXNWWVdufGRlZmF1bHR8NjEzNWNmNzg4ZDg3MzZmZjMzZmNkOWZhMWU4NDhiNjY) to pitch your proposed project. You'll work directly with UI Systems Design to create a [Project Brief Template](https://docs.google.com/document/d/1XnhkaEQn4b8SamRM4ApaCk2eOfNcPwi9k3Gu0rD0juA/edit); once the brief is complete Product Design will handoff the brief to the Product Engineer (PE).

## Step 2: Engineering Kick Off

We recommend you use the [CDS Eng Contribution Scope Framework](https://docs.google.com/spreadsheets/u/0/d/1uf6IzEzZst4WvhlLQ-EV5rWQkwHen9lOw9oKMut6PVg/edit) to size the effort, generate acceptance criteria, and required reviewers.

At any point during the process you can get support via #ask-ui-systems or during UI Systems Office Hours (particularly for API design and component composition).

## Step 3: API & Component Composition Review

Contributor will pitch API proposal during USE office hours. USE would be required, a11y and motion DRI’s would be optional to attend.
Component composition: this is not working code. It can be an Excalidraw or google doc that shows how the user would implement the component or feature.

### Acceptance Criteria

- API adheres to established conventions
- Component is composed to meet WCAG accessibility standards, eg: semantic HTML elements, supports accessibility props where needed, etc.
- Considerations for motion (if applicable, motion DRI will be a required attendee)
- Composition is highly scalable leveraging subcomponents as often as possible

## Step 4: Development

Contributor will receive ongoing support through USE Office hours
USE will lead monthly check-ins with component DRI’s (PED). Eventually this will be community driven with CDS Contributors driving these check-ins.

## Step 5: Review process

- Ping #ask-ui-systems for PR review.
- Schedule a Bug Bash where the entire UI Systems team will be required to attend (cds@coinbase.com). A11y and motion DRI’s would be optional to attend.
- Sign off will be a majority team decision.

### Acceptance Criteria

- Component meets WCAG accessibility standards (can be used with a screen reader, voice or keyboard navigation, etc.)
- Storybook stories for visual regression
- Interactive stories if component is interactable
- Unit tests for all props and states
- Expected behavior on all devices (Android and IOS) and browsers (Chrome, Safari, Firefox), no runtime errors/warnings, performant in SSR environment, etc.
- Motion sign off (if applicable)

🔗 [Bug Bash Template](go/cds-bugbash-template)
