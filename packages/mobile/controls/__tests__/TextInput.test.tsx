import { render, screen } from '@testing-library/react-native';

import { TextTitle1 } from '../../typography';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('renders a TextInput', () => {
    const testID = 'textinput-id';
    render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testID={testID}
      />,
    );
    expect(screen.getByTestId(testID)).toBeDefined();
  });

  it('renders a Label', () => {
    const testID = 'label-id';
    render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        label="TextInput"
        testIDMap={{
          label: testID,
        }}
      />,
    );
    expect(screen.getByTestId(testID)).toBeDefined();
  });

  it('renders a HelperText', () => {
    const testID = 'helpertext-id';
    render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        helperText="Helper Text"
        testIDMap={{
          helperText: testID,
        }}
      />,
    );
    expect(screen.getByTestId(testID)).toBeDefined();
  });

  it('renders an Input', () => {
    const testID = 'input-id';
    const value = 'input';

    render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testID={testID}
        value={value}
      />,
    );
    expect(screen.getByTestId(testID).props.value).toBe(value);
  });

  it('renders a start node', () => {
    const testID = 'start-id';
    render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testIDMap={{
          start: testID,
        }}
        start={<TextTitle1>Hello</TextTitle1>}
      />,
    );
    expect(screen.getByTestId(testID)).toBeDefined();
  });

  it('renders an end node', () => {
    const testID = 'end-id';
    render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testIDMap={{
          end: testID,
        }}
        end={<TextTitle1>Hello</TextTitle1>}
      />,
    );
    expect(screen.getByTestId(testID)).toBeDefined();
  });
});
