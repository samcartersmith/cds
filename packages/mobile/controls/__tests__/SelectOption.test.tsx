import { render } from '@testing-library/react-native';

import { SelectOption } from '../SelectOption';

const TEST_ID = 'select-option-test';

describe('Accessibility', () => {
  it('AccessibilityLabel set to title. AccessibilityHint set to hint', () => {
    const result = render(
      <SelectOption testID={TEST_ID} title="Title" value="Value" description="Description" />,
    );

    expect(result.getByLabelText('Title')).toBeTruthy();
    expect(result.queryByA11yHint('Description')).toBeTruthy();
  });

  it('AccessibilityLabel and AccessibilityHint set to custom value', () => {
    const result = render(
      <SelectOption
        testID={TEST_ID}
        accessibilityLabel="Custom Label"
        accessibilityHint="Custom Hint"
        title="Title"
        value="Value"
        description="Description"
      />,
    );

    expect(result.getByLabelText('Custom Label')).toBeTruthy();
    expect(result.queryByA11yHint('Custom Hint')).toBeTruthy();
  });
});
