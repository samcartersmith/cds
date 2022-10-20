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
    const value = 'input';

    const result = render(
      <TextInput
        accessibilityHint="Text input field"
        accessibilityLabel="Text input field"
        value={value}
        testID={testID}
        onChange={jest.fn()}
      />,
    );
    const input = result.getByTestId(testID) as HTMLInputElement;
    expect(input.value).toBe(value);
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

  it('Generates accessible id for screen reader to read label if label exists', () => {
    const result = render(
      <TextInput label="textinput" inputNode={<input data-testid="internal-input" />} />,
    );

    expect(result.getByTestId('internal-input')).toHaveAttribute(
      'id',
      expect.stringMatching(/cds-textinput-label-.*/),
    );
  });

  it('id is undefined if label does not exist', () => {
    const result = render(<TextInput inputNode={<input data-testid="internal-input" />} />);

    expect(result.getByTestId('internal-input')).not.toHaveAttribute('id');
  });

  it('Generates accessibleHint mapping if helperText exists', () => {
    const result = render(
      <TextInput testID="textinput-testid" label="textinput" helperText="success" />,
    );

    expect(result.getByTestId('textinput-testid')).toHaveAttribute(
      'aria-describedby',
      expect.stringMatching(/cds-textinput-description-.*/),
    );
  });

  it('accessibilityHint is undefined if label does not exist', () => {
    const result = render(<TextInput testID="textinput-testid" label="textinput" />);

    expect(result.getByTestId('textinput-testid')).not.toHaveAttribute('aria-describedby');
  });
});
