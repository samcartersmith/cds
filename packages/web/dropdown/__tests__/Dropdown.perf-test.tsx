import { fireEvent, screen } from '@testing-library/react';
import { measurePerformance } from 'reassure';

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

describe('Dropdown performance tests', () => {
  it('renders Dropdown content when opened', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByTestId(subjectTestID));
      await screen.findByText(options[0]);
    };

    await measurePerformance(<DropdownExample subjectTestID={subjectTestID} options={options} />, {
      scenario,
    });
  });
  it('renders Dropdown content when opened with portal disabled', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByTestId(subjectTestID));
      await screen.findByText(options[0]);
    };

    await measurePerformance(
      <DropdownExample disablePortal subjectTestID={subjectTestID} options={options} />,
      {
        scenario,
      },
    );
  });
});
