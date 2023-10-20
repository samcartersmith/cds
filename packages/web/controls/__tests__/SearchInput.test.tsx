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
          accessibilityLabel="Search Assets"
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          value="value"
        />,
      ),
    ).toHaveNoViolations();
  });

  it('able to set a default value', () => {
    render(<SearchInput onChangeText={onChangeTextSpy} testID={TEST_ID} value="value" />);

    expect(screen.getByRole('searchbox')).toHaveValue('value');
  });

  /** Testing for existence of components */
  it('renders a search', () => {
    render(
      <SearchInput
        onChangeText={onChangeTextSpy}
        placeholder="Placeholder"
        testID={TEST_ID}
        value="value"
      />,
    );
    const search = screen.queryByRole(ROLE);
    expect(search).toBeDefined();
  });

  it('renders a Search IconButton at the start node', () => {
    render(
      <SearchInput
        onChangeText={onChangeTextSpy}
        placeholder="Placeholder"
        testID={TEST_ID}
        value="value"
      />,
    );
    const searchIconBtn = screen.getByTestId(`${TEST_ID}-search-icon`);
    expect(searchIconBtn).toBeDefined();
  });

  it('does not render a Search IconButton when hideStartIcon=true', () => {
    render(
      <SearchInput
        hideStartIcon
        onChangeText={onChangeTextSpy}
        placeholder="Placeholder"
        testID={TEST_ID}
        value="value"
      />,
    );
    expect(screen.queryByTestId(`${TEST_ID}-search-icon`)).toBeNull();
  });

  it('renders a Close IconButton at the end node when there is value', () => {
    render(
      <SearchInput
        onChangeText={onChangeTextSpy}
        placeholder="Placeholder"
        testID={TEST_ID}
        value="value"
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
        onClear={onClearSpy}
        placeholder="Placeholder"
        testID={TEST_ID}
        value="value"
      />,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClearSpy).toHaveBeenCalled();
  });
});
