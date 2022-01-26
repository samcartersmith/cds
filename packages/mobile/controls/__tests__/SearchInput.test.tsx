import { fireEvent, render } from '@testing-library/react-native';

import { SearchInput } from '../SearchInput';

const TEST_ID = 'search';
const ROLE = 'search';

describe('Search', () => {
  let SearchComponent = <></>;
  const onClearSpy = jest.fn();
  const onChangeTextSpy = jest.fn();
  const onSearchSpy = jest.fn();

  beforeAll(() => {
    SearchComponent = (
      <SearchInput
        value="value"
        testID={TEST_ID}
        onSearch={onSearchSpy}
        onClear={onClearSpy}
        onChangeText={onChangeTextSpy}
        placeholder="Placeholder"
      />
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders a search', () => {
    const result = render(SearchComponent);

    expect(result.getByRole(ROLE)).toBeDefined();
  });

  it('able to set a default value', () => {
    const result = render(SearchComponent);

    expect(result.getByRole('search').props.value).toBe('value');
  });

  it('renders a backArrow icon button at the start node', () => {
    const result = render(SearchComponent);

    expect(result.getByTestId(`${TEST_ID}-searchinput-iconbtn`)).toBeDefined();
  });

  it('renders a close icon button at the end node', () => {
    const result = render(SearchComponent);

    expect(result.getByTestId(`${TEST_ID}-close-iconbtn`)).toBeDefined();
  });

  it('fires `onSearch` when search btn is pressed', () => {
    const result = render(SearchComponent);

    fireEvent.press(result.getByTestId(`${TEST_ID}-searchinput-iconbtn`));

    expect(onSearchSpy).toHaveBeenCalled();
  });

  it('fires `onClear` when clear btn is pressed', () => {
    const result = render(SearchComponent);

    fireEvent.press(result.getByTestId(`${TEST_ID}-close-iconbtn`));

    expect(onClearSpy).toHaveBeenCalled();
  });
});
