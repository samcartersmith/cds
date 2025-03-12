import { fireEvent, render, screen } from '@testing-library/react-native';

import { TextTitle1 } from '../../typography';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('passes a11y', () => {
    const testID = 'textinput-id';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text"
          accessibilityLabel="Text"
          end={<TextTitle1>Node</TextTitle1>}
          helperText="Text"
          label="Text"
          placeholder="Text"
          start={<TextTitle1>Node</TextTitle1>}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('passes a11y with wrapper component', () => {
    const testID = 'textinput-id';
    const MockTextInput = TextInput;
    render(
      <DefaultThemeProvider>
        <MockTextInput
          end={<TextTitle1>Node</TextTitle1>}
          helperText="Text"
          label="Text"
          placeholder="Text"
          start={<TextTitle1>Node</TextTitle1>}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('renders a TextInput', () => {
    const testID = 'textinput-id';
    const value = 'Example value';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          onChange={jest.fn()}
          testID={testID}
          value={value}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID).props.value).toBe(value);
  });

  it('renders a label', () => {
    const testID = 'label-testid';
    const labelText = 'Example label';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
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
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
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
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          helperText={helperText}
          testIDMap={{
            helperText: testID,
          }}
          variant="negative"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(`${testID}-error-icon`)).toBeTruthy();
    expect(screen.getByTestId(`${testID}-error-icon`)).toBeAccessible();
  });

  it('should not render error icon when passing helper text node', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          helperText={<TextTitle1>{helperText}</TextTitle1>}
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
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          placeholder={placeholderText}
        />
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          start={<TextTitle1>{startNodeText}</TextTitle1>}
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          start={<TextTitle1>{endNodeText}</TextTitle1>}
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          suffix={suffixText}
          testIDMap={{
            end: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(suffixText);
  });

  it('calls onChangeText when input value changes', () => {
    const testID = 'input-testid';
    const onChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          onChangeText={onChange}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.changeText(screen.getByTestId(testID), 'Updated value');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe('Updated value');
  });

  it('calls onFocus and onBlur when input is focused / blurred', () => {
    const testID = 'input-testid';
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          onBlur={onBlur}
          onFocus={onFocus}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent(screen.getByTestId(testID), 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent(screen.getByTestId(testID), 'blur');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
