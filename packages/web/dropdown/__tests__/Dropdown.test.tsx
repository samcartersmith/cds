// eslint-disable-next-line jest/no-mocks-import
import '../../jest/__mocks__/matchMediaMinWidth.mock';

import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Default as DropdownExample } from '../__stories__/Dropdown.stories';

const subjectTestID = 'subject-test';
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
];

describe('Dropdown', () => {
  it('renders a subject', () => {
    const { getByTestId } = render(<DropdownExample subjectTestID={subjectTestID} />);

    expect(getByTestId(subjectTestID)).toBeInTheDocument();
  });
  it('passes accessibility', async () => {
    expect(await renderA11y(<DropdownExample />)).toHaveNoViolations();
  });
  it('opens the menu when the subject is pressed', async () => {
    const { getByTestId, getByText } = render(
      <DropdownExample subjectTestID={subjectTestID} options={options} />,
    );

    fireEvent.click(getByTestId(subjectTestID));

    // expect to see first menu item
    await waitFor(() => expect(getByText(options[0])).toBeDefined());
  });
  it('opens the menu when enter is typed when the subject is focused', async () => {
    const { getByTestId, getByText } = render(
      <DropdownExample subjectTestID={subjectTestID} options={options} />,
    );

    fireEvent.keyDown(getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    // expect to see first menu item
    await waitFor(() => expect(getByText(options[0])).toBeDefined());
  });
});
