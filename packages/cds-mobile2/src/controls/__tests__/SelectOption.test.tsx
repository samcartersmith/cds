import { render, screen } from '@testing-library/react-native';

import { SelectOption } from '../SelectOption';

const TEST_ID = 'select-option-test';

describe('Accessibility', () => {
  it('passes a11y', () => {
    render(<SelectOption description="Description" testID={TEST_ID} title="Title" value="Value" />);

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });
  it('AccessibilityLabel set to title. AccessibilityHint set to hint', () => {
    render(<SelectOption description="Description" testID={TEST_ID} title="Title" value="Value" />);

    expect(screen.getByLabelText('Title')).toBeTruthy();
    expect(screen.getByA11yHint('Description')).toBeTruthy();
  });

  it('AccessibilityLabel and AccessibilityHint set to custom value', () => {
    render(
      <SelectOption
        accessibilityHint="Custom Hint"
        accessibilityLabel="Custom Label"
        description="Description"
        testID={TEST_ID}
        title="Title"
        value="Value"
      />,
    );

    expect(screen.getByLabelText('Custom Label')).toBeTruthy();
    expect(screen.getByA11yHint('Custom Hint')).toBeTruthy();
  });
});
