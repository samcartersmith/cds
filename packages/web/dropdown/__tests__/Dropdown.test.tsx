import useMeasure from 'react-use-measure';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import * as useBreakpoints from '../../hooks/useBreakpoints';
import { Default as DropdownExample } from '../__stories__/Dropdown.stories';

jest.mock('react-use-measure');
const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};
const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 230,
    x: 20,
    y: 64,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

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
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
  });
  it('renders a subject', () => {
    render(<DropdownExample subjectTestID={subjectTestID} />);

    expect(screen.getByTestId(subjectTestID)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { expanded: false })[0]).toBeInTheDocument();
  });
  it('passes accessibility', async () => {
    expect(await renderA11y(<DropdownExample />)).toHaveNoViolations();
  });
  it('opens the menu when the subject is pressed', async () => {
    render(<DropdownExample options={options} subjectTestID={subjectTestID} />);

    fireEvent.click(screen.getByTestId(subjectTestID));

    // expect to see first menu item
    expect(await screen.findByText(options[0])).toBeDefined();
    expect(screen.getAllByRole('button', { expanded: true })[0]).toBeInTheDocument();
  });
  it('does not open the menu when disabled', () => {
    render(<DropdownExample disabled options={options} subjectTestID={subjectTestID} />);

    fireEvent.click(screen.getByTestId(subjectTestID));

    // expect to see first menu item
    expect(screen.queryByText(options[0])).not.toBeInTheDocument();
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

  it('Dropdown renders as a modal when enableMobileModal is set', async () => {
    jest.spyOn(useBreakpoints, 'useBreakpoints').mockImplementation(() => ({
      isPhone: true,
    }));

    render(<DropdownExample enableMobileModal options={options} subjectTestID={subjectTestID} />);

    fireEvent.click(screen.getByTestId(subjectTestID));

    // look for overflow: auto
    expect(await screen.findByTestId('dropdown-modal')).toBeInTheDocument();
  });
});
