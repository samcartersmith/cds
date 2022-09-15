### Component API Documentation

Because our components are used by so many teams it is vital that we document their APIs well. This section give a quick preview of how to effectively document our components.

Web + Mobile documentation is viewed together on our website and we try minimze API deviation. However, there are times when the behavior slightly varies or there is a unique callout we want to make for a specific platform. To accomodate this we use JSDOC tags within API definitions to aid in documentation generation.

- `@default`: Default value of a property
- `@danger`: Property which is used as an escape hatch and is not recommended.
- `@link`: Link to MDN React Native or other documentation which is relevant
- `@experimental`: Experimental/unstable APIs
- `@deprecated`: Deprecated APIs
