import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Box } from '../../layout';
import { Pressable } from '../../system';
import { Popover } from '../popover/Popover';

const SUBJECT_TEST_ID = 'subject';
const CONTENT_TEST_ID = 'content';

type ExampleProps = {
  visible?: boolean;
};

const PopoverExample = ({ visible = false }: ExampleProps) => {
  return (
    <Popover content={<Box />} visible={visible} testID={CONTENT_TEST_ID}>
      <Pressable backgroundColor="primary" testID={SUBJECT_TEST_ID}>
        Button
      </Pressable>
    </Popover>
  );
};

describe('Popover', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<PopoverExample />)).toHaveNoViolations();
  });

  it('renders subject but not content on mount', () => {
    render(<PopoverExample />);

    expect(screen.getByTestId(SUBJECT_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument();
  });

  it('renders content when visible', async () => {
    render(<PopoverExample visible />);

    expect(await screen.findByTestId(CONTENT_TEST_ID)).toBeInTheDocument();
  });

  it('renders content with a transparent container', async () => {
    render(<PopoverExample visible />);

    expect(await screen.findByTestId(CONTENT_TEST_ID)).toHaveStyle('background-color: transparent');
  });
});
