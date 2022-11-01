import { fireEvent, render, screen } from '@testing-library/react-native';

import { SearchInput } from '../SearchInput';

const TEST_ID = 'search';
const ROLE = 'search';

describe('Search', () => {
  let SearchComponent: React.ReactElement;
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

  it('passes a11y', () => {
    render(SearchComponent);

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders a search', () => {
    render(SearchComponent);

    expect(screen.getByRole(ROLE)).toBeDefined();
  });

  it('able to set a default value', () => {
    render(SearchComponent);

    expect(screen.getByRole('search').props.value).toBe('value');
  });

  it('renders a backArrow icon button at the start node', () => {
    render(SearchComponent);

    expect(screen.getByTestId(`${TEST_ID}-searchinput-iconbtn`)).toBeDefined();
  });

  it('does not render a startIcon when hideStartIcon=true', () => {
    render(
      <SearchInput
        onChangeText={onChangeTextSpy}
        value="value"
        testID={TEST_ID}
        placeholder="Placeholder"
        hideStartIcon
      />,
    );

    expect(screen.queryByTestId(`${TEST_ID}-searchinput-iconbtn`)).toBeNull();
  });

  it('renders a close icon button at the end node', () => {
    render(SearchComponent);

    expect(screen.getByTestId(`${TEST_ID}-close-iconbtn`)).toBeDefined();
  });

  it('fires `onSearch` when search btn is pressed', () => {
    render(SearchComponent);

    fireEvent.press(screen.getByTestId(`${TEST_ID}-searchinput-iconbtn`));

    expect(onSearchSpy).toHaveBeenCalled();
  });

  it('fires `onClear` when clear btn is pressed', () => {
    render(SearchComponent);

    fireEvent.press(screen.getByTestId(`${TEST_ID}-close-iconbtn`));

    expect(onClearSpy).toHaveBeenCalled();
  });
});
