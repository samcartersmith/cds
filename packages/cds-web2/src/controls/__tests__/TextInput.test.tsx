// Disabling this because its just testing

import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils';

import { TextTitle1 } from '../../typography/TextTitle1';
import { DefaultThemeProvider } from '../../utils/test';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TextInput
            accessibilityHint="Text"
            accessibilityLabel="Text"
            end={<TextTitle1 as="h1">Node</TextTitle1>}
            helperText="Text"
            label="Text"
            placeholder="Text"
            start={<TextTitle1 as="h1">Node</TextTitle1>}
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders an input', () => {
    const value = 'Example value';
    render(
      <DefaultThemeProvider>
        <TextInput onChange={jest.fn()} value={value} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  it('renders a label', () => {
    const testID = 'label-testid';
    const labelText = 'Example label';
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Example label"
          testIDMap={{
            label: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(labelText);
  });

  it('renders label in start node when compact', () => {
    const testID = 'start-testid';
    const labelText = 'Example label';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          label="Example label"
          testIDMap={{
            start: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(labelText);
  });

  it('renders helper text', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          helperText={helperText}
          testIDMap={{
            helperText: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(helperText);
  });

  it('renders error icon in helper text when variant is negative', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          helperText={helperText}
          testIDMap={{
            helperText: testID,
          }}
          variant="negative"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(`${testID}-error-icon`)).toBeTruthy();
  });

  it('should not render error icon when passing in helper text node', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          helperText={<TextTitle1 as="p">{helperText}</TextTitle1>}
          testIDMap={{
            helperText: testID,
          }}
          variant="negative"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.queryByTestId(`${testID}-error-icon`)).toBeFalsy();
  });

  it('renders placeholder text', () => {
    const placeholderText = 'Example placeholder text';
    render(
      <DefaultThemeProvider>
        <TextInput placeholder={placeholderText} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByPlaceholderText(placeholderText)).toBeDefined();
  });

  it('renders a start node', () => {
    const testID = 'start-testid';
    const startNodeText = 'Example start node';
    render(
      <DefaultThemeProvider>
        <TextInput
          start={<TextTitle1 as="h1">{startNodeText}</TextTitle1>}
          testIDMap={{
            start: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(startNodeText);
  });

  it('renders an end node', () => {
    const testID = 'end-testid';
    const endNodeText = 'Example end node';
    render(
      <DefaultThemeProvider>
        <TextInput
          start={<TextTitle1 as="h1">{endNodeText}</TextTitle1>}
          testIDMap={{
            start: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(endNodeText);
  });

  it('renders suffix in end node', () => {
    const testID = 'end-testid';
    const suffixText = 'Example suffix';
    render(
      <DefaultThemeProvider>
        <TextInput
          suffix={suffixText}
          testIDMap={{
            end: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(suffixText);
  });

  it('calls onChange when input value changes', () => {
    const onChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput onChange={onChange} />
      </DefaultThemeProvider>,
    );
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'Updated value',
      },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe('Updated value');
  });

  it('calls onFocus and onBlur when input is focused / blurred', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput onBlur={onBlur} onFocus={onFocus} />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent.focus(screen.getByRole('textbox'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent.blur(screen.getByRole('textbox'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('focuses input when start node is pressed', () => {
    const onFocus = jest.fn();
    const startNodeText = 'Start';
    render(
      <DefaultThemeProvider>
        <TextInput onFocus={onFocus} start={<TextTitle1 as="h1">{startNodeText}</TextTitle1>} />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(startNodeText));
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('focuses input when end node is pressed', () => {
    const onFocus = jest.fn();
    const endNodeText = 'End';
    render(
      <DefaultThemeProvider>
        <TextInput end={<TextTitle1 as="h1">{endNodeText}</TextTitle1>} onFocus={onFocus} />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(endNodeText));
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Generates accessible id for screen reader to read label if label exists', () => {
    render(
      <DefaultThemeProvider>
        <TextInput inputNode={<input data-testid="internal-input" />} label="textinput" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('internal-input')).toHaveAttribute(
      'id',
      expect.stringMatching(/label-.*/),
    );
  });

  it('id is undefined if label does not exist', () => {
    render(
      <DefaultThemeProvider>
        <TextInput inputNode={<input data-testid="internal-input" />} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('internal-input')).not.toHaveAttribute('id');
  });

  it('Generates accessibleHint mapping if helperText exists', () => {
    render(
      <DefaultThemeProvider>
        <TextInput helperText="success" label="textinput" testID="textinput-testid" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('textinput-testid')).toHaveAttribute(
      'aria-describedby',
      expect.stringMatching(/description-.*/),
    );
  });

  it('accessibilityHint is undefined if label does not exist', () => {
    render(
      <DefaultThemeProvider>
        <TextInput label="textinput" testID="textinput-testid" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('textinput-testid')).not.toHaveAttribute('aria-describedby');
  });

  it('focuses the input element when label is clicked', () => {
    const labelTestID = 'label-testid';
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Example label"
          testIDMap={{
            label: labelTestID,
          }}
        />
      </DefaultThemeProvider>,
    );
    const labelForAttribute = screen.getByTestId(labelTestID).getAttribute('for');
    expect(labelForAttribute?.startsWith('cds-textinput-label')).toBe(true);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', labelForAttribute);
  });
});
