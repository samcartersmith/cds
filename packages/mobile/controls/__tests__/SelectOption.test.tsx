import { render, screen } from '@testing-library/react-native';

import { SelectOption } from '../SelectOption';

const TEST_ID = 'select-option-test';

describe('Accessibility', () => {
  it('passes a11y', () => {
    render(<SelectOption testID={TEST_ID} title="Title" value="Value" description="Description" />);

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });
  it('AccessibilityLabel set to title. AccessibilityHint set to hint', () => {
    render(<SelectOption testID={TEST_ID} title="Title" value="Value" description="Description" />);

    expect(screen.getByLabelText('Title')).toBeTruthy();
    expect(screen.getByA11yHint('Description')).toBeTruthy();
  });

  it('AccessibilityLabel and AccessibilityHint set to custom value', () => {
    render(
      <SelectOption
        testID={TEST_ID}
        accessibilityLabel="Custom Label"
        accessibilityHint="Custom Hint"
        title="Title"
        value="Value"
        description="Description"
      />,
    );

    expect(screen.getByLabelText('Custom Label')).toBeTruthy();
    expect(screen.getByA11yHint('Custom Hint')).toBeTruthy();
  });
});
