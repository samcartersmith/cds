import { render, screen } from '@testing-library/react';
import { Box } from '@cbhq/cds-web/layout';
import { Pressable } from '@cbhq/cds-web/system';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Popover } from '../Popover';

const SUBJECT_TEST_ID = 'subject';
const CONTENT_TEST_ID = 'content';

type ExampleProps = {
  visible?: boolean;
};

const PopoverExample = ({ visible = false }: ExampleProps) => {
  return (
    <Popover content={<Box />} testID={CONTENT_TEST_ID} visible={visible}>
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
