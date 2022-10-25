import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { SearchInput } from '../SearchInput';

const TEST_ID = 'searchinput';
const ROLE = 'searchbox';

describe('Search', () => {
  const onClearSpy = jest.fn();
  const onChangeTextSpy = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <SearchInput
          value="value"
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          accessibilityLabel="Search Assets"
        />,
      ),
    ).toHaveNoViolations();
  });

  it('able to set a default value', () => {
    render(<SearchInput onChangeText={onChangeTextSpy} value="value" testID={TEST_ID} />);

    expect(screen.getByRole('searchbox')).toHaveValue('value');
  });

  /** Testing for existence of components */
  it('renders a search', () => {
    render(
      <SearchInput
        value="value"
        onChangeText={onChangeTextSpy}
        testID={TEST_ID}
        placeholder="Placeholder"
      />,
    );
    const search = screen.queryByRole(ROLE);
    expect(search).toBeDefined();
  });

  it('renders a Search IconButton at the start node', () => {
    render(
      <SearchInput
        value="value"
        onChangeText={onChangeTextSpy}
        testID={TEST_ID}
        placeholder="Placeholder"
      />,
    );
    const searchIconBtn = screen.getByTestId(`${TEST_ID}-search-icon`);
    expect(searchIconBtn).toBeDefined();
  });

  it('does not render a Search IconButton when hideStartIcon=true', () => {
    render(
      <SearchInput
        value="value"
        onChangeText={onChangeTextSpy}
        testID={TEST_ID}
        hideStartIcon
        placeholder="Placeholder"
      />,
    );
    expect(screen.queryByTestId(`${TEST_ID}-search-icon`)).toBeNull();
  });

  it('renders a Close IconButton at the end node when there is value', () => {
    render(
      <SearchInput
        onChangeText={onChangeTextSpy}
        testID={TEST_ID}
        value="value"
        placeholder="Placeholder"
      />,
    );
    const closeIconBtn = screen.getByTestId(`${TEST_ID}-close-iconbtn`);
    expect(closeIconBtn).toBeDefined();
  });

  /** Testing for events */
  it('fires `onClear` when close icon button is pressed', () => {
    render(
      <SearchInput
        onChangeText={onChangeTextSpy}
        value="value"
        testID={TEST_ID}
        onClear={onClearSpy}
        placeholder="Placeholder"
      />,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClearSpy).toHaveBeenCalled();
  });
});
