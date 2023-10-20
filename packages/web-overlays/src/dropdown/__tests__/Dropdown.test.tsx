import { fireEvent, render, screen } from '@testing-library/react';
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
    render(<DropdownExample subjectTestID={subjectTestID} />);

    expect(screen.getByTestId(subjectTestID)).toBeInTheDocument();
  });
  it('passes accessibility', async () => {
    expect(await renderA11y(<DropdownExample />)).toHaveNoViolations();
  });
  it('opens the menu when the subject is pressed', async () => {
    render(<DropdownExample options={options} subjectTestID={subjectTestID} />);

    fireEvent.click(screen.getByTestId(subjectTestID));

    // expect to see first menu item
    expect(await screen.findByText(options[0])).toBeDefined();
  });
  it('opens the menu when enter is typed when the subject is focused', async () => {
    render(<DropdownExample options={options} subjectTestID={subjectTestID} />);

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    // expect to see first menu item
    expect(await screen.findByText(options[0])).toBeDefined();
  });
  it('DropdownContent has overflow set to auto', async () => {
    render(<DropdownExample options={options} subjectTestID={subjectTestID} />);

    fireEvent.click(screen.getByTestId(subjectTestID));

    // look for overflow: auto
    expect(await screen.findByRole('menu')).toHaveClass('auto');
  });
});
