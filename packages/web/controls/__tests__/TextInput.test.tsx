// Disabling this because its just testing
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { render } from '@testing-library/react';

import { TextTitle1 } from '../../typography';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('renders a TextInput', () => {
    const testID = 'textinput-id';
    const result = render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testID={testID}
      />,
    );
    expect(result.getByTestId(testID)).toBeDefined();
  });

  it('renders a Label', () => {
    const testID = 'label-id';
    const result = render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        label="TextInput"
        testIDMap={{
          label: testID,
        }}
      />,
    );
    expect(result.getByTestId(testID)).toBeDefined();
  });

  it('renders a HelperText', () => {
    const testID = 'helpertext-id';
    const result = render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        helperText="Helper Text"
        testIDMap={{
          helperText: testID,
        }}
      />,
    );
    expect(result.getByTestId(testID)).toBeDefined();
  });

  it('renders an Input', () => {
    const testID = 'input-id';
    const result = render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testIDMap={{
          input: testID,
        }}
      />,
    );
    expect(result.getByTestId(testID)).toBeDefined();
  });

  it('renders a start node', () => {
    const testID = 'start-id';
    const result = render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testIDMap={{
          start: testID,
        }}
        start={<TextTitle1 as="h1">Hello</TextTitle1>}
      />,
    );
    expect(result.getByTestId(testID)).toBeDefined();
  });

  it('renders an end node', () => {
    const testID = 'end-id';
    const result = render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        testIDMap={{
          end: testID,
        }}
        end={<TextTitle1 as="h1">Hello</TextTitle1>}
      />,
    );
    expect(result.getByTestId(testID)).toBeDefined();
  });
});
