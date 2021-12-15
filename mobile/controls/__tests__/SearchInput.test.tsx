import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from '../SearchInput';

const TEST_ID = 'search';
const ROLE = 'search';

describe('Search', () => {
  it('renders a search', () => {
    const result = render(<SearchInput placeholder="Placeholder" label="Label" />);

    expect(result.getByRole(ROLE)).toBeDefined();
  });

  it('able to set a default value', () => {
    const result = render(<SearchInput value="value" testID={TEST_ID} label="Label" />);

    expect(result.getByRole('search').props.value).toBe('value');
  });

  it('renders a backArrow icon button at the start node', () => {
    const result = render(<SearchInput testID={TEST_ID} placeholder="Placeholder" label="Label" />);

    expect(result.getByTestId(`${TEST_ID}-searchinput-iconbtn`)).toBeDefined();
  });

  it('renders a close icon button at the end node', () => {
    const result = render(
      <SearchInput value="value" testID={TEST_ID} placeholder="Placeholder" label="Label" />,
    );

    expect(result.getByTestId(`${TEST_ID}-close-iconbtn`)).toBeDefined();
  });

  it('fires `onSearch` when search btn is pressed', () => {
    const spy = jest.fn();
    const result = render(
      <SearchInput testID={TEST_ID} onSearch={spy} placeholder="Placeholder" label="Label" />,
    );

    fireEvent.press(result.getByTestId(`${TEST_ID}-searchinput-iconbtn`));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onClear` when search btn is pressed', () => {
    const spy = jest.fn();
    const result = render(
      <SearchInput
        value="value"
        testID={TEST_ID}
        onClear={spy}
        placeholder="Placeholder"
        label="Label"
      />,
    );

    fireEvent.press(result.getByTestId(`${TEST_ID}-close-iconbtn`));

    expect(spy).toHaveBeenCalled();
  });
});
