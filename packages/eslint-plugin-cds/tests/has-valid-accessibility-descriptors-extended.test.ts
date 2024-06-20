import { hasValidA11yDescriptorsExtended as rule } from '../src/rules/has-valid-accessibility-descriptors-extended';

import { createRuleTester } from './utils/createRuleTester';

const ruleTester = createRuleTester();

const validButtonWithInnerText = `
const Component = () => {
  return <Button>test</Button>;
}
`;

const validButtonWithCorrectLabel = `
const Component = () => {
  return <Button accessibilityLabel="test">test</Button>;
}
`;

const validButtonWithNestedInnerText = `
const Component = () => {
  return (
    <Button>
        <Box as="div">test</Box>
    </Button>
  );
}
`;

const validButtonWithNestedExpression = `
const helper = "test2";
const Component = () => {
  return (
    <Button>
        {helper ?? 'test'}
    </Button>
  );
}
`;

const validCollapsibleWithA11yProp = `
const Component = () => {
  return (
    <Collapsible collapsed={collapsed} spacing={3} {...controlledElementAccessibilityProps}>
        <FeatureEntryCard
        title="Send a crypto gift"
        description="Share the gift of crypto this holiday season"
        spotSquare="coinbaseCardSparkle"
        action="Start gifting"
        />
  </Collapsible>
  );
}
`;

const invalidButtonMissingLabel = `
const Component = () => {
  return (
    <Button/>
  );
}
`;

const invalidIconButtonMissingLabel = `
const Component = () => {
  return (
    <IconButton/>
  );
}
`;

const invalidNestedButtonMissingLabel = `
const Component = () => {
  return (
    <Button>
        <Box><IconButton/></Box>
    </Button>
  );
}
`;

const invalidCollapsibleWithMissingA11yProp = `
const Component = () => {
  return (
    <Collapsible collapsed={collapsed} spacing={3}>
        <FeatureEntryCard
        title="Send a crypto gift"
        description="Share the gift of crypto this holiday season"
        spotSquare="coinbaseCardSparkle"
        action="Start gifting"
        />
  </Collapsible>
  );
}
`;

const valid = [
  validButtonWithInnerText,
  validButtonWithCorrectLabel,
  validButtonWithNestedInnerText,
  validButtonWithNestedExpression,
  validCollapsibleWithA11yProp,
];
const invalidMissingA11yLabel = [
  invalidButtonMissingLabel,
  invalidIconButtonMissingLabel,
  invalidNestedButtonMissingLabel,
];

ruleTester.run('has-valid-accessibility-descriptors-extended', rule, {
  valid,
  invalid: [
    ...invalidMissingA11yLabel.map((code) => ({
      code,
      errors: [
        {
          messageId: 'missingAccessibilityLabel' as const,
        },
      ],
    })),
  ],
});
