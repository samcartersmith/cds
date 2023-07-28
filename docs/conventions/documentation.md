# Documentation

## Component API Documentation

Because our components are used by so many teams it is vital that we document their APIs well. This section give a quick preview of how to effectively document our components.

Web + Mobile documentation is viewed together on our website and we try minimze API deviation. However, there are times when the behavior slightly varies or there is a unique callout we want to make for a specific platform. To accomodate this we use JSDOC tags within API definitions to aid in documentation generation.

- `@default`: Default value of a property
- `@danger`: Property which is used as an escape hatch and is not recommended.
- `@link`: Link to MDN React Native or other documentation which is relevant
- `@experimental`: Experimental/unstable APIs
- `@deprecated`: Deprecated APIs

## Implementation

All components should include live code examples that demonstrate how to use the component in the most basic context.

- If there are known concerns for particular compositions of the component include examples for each.
- Use [disclosures](https://docusaurus.io/docs/markdown-features/admonitions) eg: `:::info` to call out warnings and tips to resolve commonly surfaced issues.
