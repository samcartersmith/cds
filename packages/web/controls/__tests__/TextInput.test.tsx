// Disabling this because its just testing
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { render, screen } from '@testing-library/react';

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
        value={value}
        testID={testID}
        onChange={jest.fn()}
      />,
    );
    const input = screen.getByTestId(testID);
    expect(input.getAttribute('value')).toBe(value);
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
        start={<TextTitle1 as="h1">Hello</TextTitle1>}
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
        end={<TextTitle1 as="h1">Hello</TextTitle1>}
      />,
    );
    expect(screen.getByTestId(testID)).toBeDefined();
  });

  it('Generates accessible id for screen reader to read label if label exists', () => {
    render(<TextInput label="textinput" inputNode={<input data-testid="internal-input" />} />);

    expect(screen.getByTestId('internal-input')).toHaveAttribute(
      'id',
      expect.stringMatching(/cds-textinput-label-.*/),
    );
  });

  it('id is undefined if label does not exist', () => {
    render(<TextInput inputNode={<input data-testid="internal-input" />} />);

    expect(screen.getByTestId('internal-input')).not.toHaveAttribute('id');
  });

  it('Generates accessibleHint mapping if helperText exists', () => {
    render(<TextInput testID="textinput-testid" label="textinput" helperText="success" />);

    expect(screen.getByTestId('textinput-testid')).toHaveAttribute(
      'aria-describedby',
      expect.stringMatching(/cds-textinput-description-.*/),
    );
  });

  it('accessibilityHint is undefined if label does not exist', () => {
    render(<TextInput testID="textinput-testid" label="textinput" />);

    expect(screen.getByTestId('textinput-testid')).not.toHaveAttribute('aria-describedby');
  });
});
