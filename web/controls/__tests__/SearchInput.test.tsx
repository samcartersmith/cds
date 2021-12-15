import { render, fireEvent } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import { SearchInput } from '../SearchInput';

const TEST_ID = 'searchinput';
const ROLE = 'searchbox';

describe('Search', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <SearchInput placeholder="Placeholder" accessibilityLabel="Search Assets" label="Label" />,
      ),
    ).toHaveNoViolations();
  });

  it('able to set a default value', () => {
    const result = render(<SearchInput value="value" testID={TEST_ID} label="Label" />);

    expect(result.getByRole('searchbox')).toHaveValue('value');
  });

  /** Testing for existence of components */
  it('renders a search', () => {
    const { queryByRole } = render(
      <SearchInput testID={TEST_ID} placeholder="Placeholder" label="Label" />,
    );
    const search = queryByRole(ROLE);
    expect(search).toBeDefined();
  });

  it('renders a Search IconButton at the start node', () => {
    const { getByTestId } = render(
      <SearchInput testID={TEST_ID} placeholder="Placeholder" label="Label" />,
    );
    const searchIconBtn = getByTestId(`${TEST_ID}-search-icon`);
    expect(searchIconBtn).toBeDefined();
  });

  it('renders a Close IconButton at the end node when there is value', () => {
    const { getByTestId } = render(
      <SearchInput testID={TEST_ID} value="value" placeholder="Placeholder" label="Label" />,
    );
    const closeIconBtn = getByTestId(`${TEST_ID}-close-iconbtn`);
    expect(closeIconBtn).toBeDefined();
  });

  /** Testing for events */
  it('fires `onClear` when close icon button is pressed', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <SearchInput
        value="value"
        onClear={spy}
        testID={TEST_ID}
        placeholder="Placeholder"
        label="Label"
      />,
    );

    fireEvent.click(getByTestId(`${TEST_ID}-close-iconbtn`).firstChild as Element);

    expect(spy).toHaveBeenCalled();
  });
});
