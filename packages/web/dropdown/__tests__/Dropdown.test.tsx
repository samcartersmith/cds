import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Default as DropdownExample } from '../__stories__/Dropdown.stories';

const subjectTestID = 'subject-test';

describe('Dropdown', () => {
  it('renders a subject', () => {
    const { getByTestId } = render(<DropdownExample subjectTestID={subjectTestID} />);

    expect(getByTestId(subjectTestID)).toBeInTheDocument();
  });
  it('passes accessibility', async () => {
    expect(await renderA11y(<DropdownExample />)).toHaveNoViolations();
  });
});
