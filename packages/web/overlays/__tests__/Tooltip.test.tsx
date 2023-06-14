import { fireEvent, render, screen } from '@testing-library/react';
import { BaseTooltipPlacement } from '@cbhq/cds-common/types';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../buttons/Button';
import { PortalProvider } from '../PortalProvider';
import { Tooltip } from '../Tooltip/Tooltip';

const tooltipTestID = 'tooltip-test';

const StoryExample = ({
  placement = 'top',
}: {
  disabled?: boolean;
  placement?: BaseTooltipPlacement;
}) => {
  return (
    <PortalProvider>
      <Tooltip
        testID={tooltipTestID}
        content="This is the content in the tooltip!"
        placement={placement}
      >
        <Button>Button</Button>
      </Tooltip>
    </PortalProvider>
  );
};

describe('Tooltip', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<StoryExample />)).toHaveNoViolations();
  });

  it('passes accessibility when open', async () => {
    expect(
      await renderA11y(<StoryExample />, {
        async afterRender() {
          fireEvent.mouseEnter(screen.getByRole('button'));
          const tooltip = await screen.findByTestId(tooltipTestID);
          return tooltip;
        },
      }),
    ).toHaveNoViolations();
  });

  it('renders the button with a tooltip but does not show content', () => {
    render(<StoryExample />);

    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.queryByTestId(tooltipTestID)).not.toBeInTheDocument();
  });

  it('shows tooltip content on hover', async () => {
    render(<StoryExample />);
    const button = screen.getByRole('button');

    expect(screen.queryByTestId(tooltipTestID)).not.toBeInTheDocument();

    fireEvent.mouseEnter(button as Element);

    expect(await screen.findByTestId(tooltipTestID)).toBeInTheDocument();
  });
});
