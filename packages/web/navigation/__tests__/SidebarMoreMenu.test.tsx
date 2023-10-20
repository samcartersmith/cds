import { useMemo } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { SelectOption } from '../../controls';
import { NavigationIcon } from '../../icons';
import { items } from '../__stories__/NavigationStorySetup';
import { SidebarProvider } from '../SidebarContext';
import { SidebarMoreMenu } from '../SidebarMoreMenu';

const TRIGGER_TEST_ID = 'sidebar-more-menu-trigger';
const MENU_TEST_ID = 'sidebar-more-menu-menu';

const moreMenuOptions = items.slice(4);
const onChangeSpy = jest.fn();

type ExampleProps = {
  value?: string;
  collapsed?: boolean;
};

const SidebarMoreMenuExample = ({ value, collapsed = false }: ExampleProps) => {
  const contextValue = useMemo(() => ({ collapsed }), [collapsed]);

  return (
    <SidebarProvider value={contextValue}>
      <SidebarMoreMenu onChange={onChangeSpy} testID={MENU_TEST_ID} value={value}>
        {moreMenuOptions.map((item) => (
          <SelectOption
            key={`sidebar-more-menu-item--${item.title}`}
            description={item.title}
            media={<NavigationIcon name={item.icon} />}
            value={item.title}
          />
        ))}
      </SidebarMoreMenu>
    </SidebarProvider>
  );
};

describe('SidebarMoreMenu', () => {
  afterEach(() => {
    onChangeSpy.mockClear();
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<SidebarMoreMenuExample />)).toHaveNoViolations();
  });

  it('renders trigger but not menu on mount', () => {
    render(<SidebarMoreMenuExample />);

    expect(screen.getByTestId(TRIGGER_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(MENU_TEST_ID)).not.toBeInTheDocument();
  });

  it('opens menu when trigger is clicked', async () => {
    render(<SidebarMoreMenuExample />);

    fireEvent.click(screen.getByTestId(TRIGGER_TEST_ID));

    expect(screen.getByTestId(MENU_TEST_ID)).toBeInTheDocument();
    expect(await screen.findByText(items[4].title)).toBeDefined();
  });

  it('opens menu and focuses first menu item when trigger is focused and enter is pressed', async () => {
    render(<SidebarMoreMenuExample />);

    fireEvent.keyDown(screen.getByTestId(TRIGGER_TEST_ID), {
      key: 'Enter',
      code: 'Enter',
    });

    const menuItems = await screen.findAllByRole('menuitem');

    expect(screen.getByTestId(MENU_TEST_ID)).toBeInTheDocument();
    expect(menuItems[0]).toHaveFocus();
  });

  it('opens menu and focuses active menu item when trigger is focused and enter is pressed', async () => {
    render(<SidebarMoreMenuExample value={moreMenuOptions[1].title} />);

    fireEvent.keyDown(screen.getByTestId(TRIGGER_TEST_ID), {
      key: 'Enter',
      code: 'Enter',
    });

    const menuItems = await screen.findAllByRole('menuitem');

    expect(screen.getByTestId(MENU_TEST_ID)).toBeInTheDocument();
    expect(menuItems[1]).toHaveFocus();
  });

  it('visually indicates an active menu item', async () => {
    render(<SidebarMoreMenuExample value={moreMenuOptions[1].title} />);

    fireEvent.click(screen.getByTestId(TRIGGER_TEST_ID));

    const checkMarks = await screen.findAllByTestId('accessory');

    expect(checkMarks[0]).toHaveClass('hidden');
    expect(checkMarks[1]).toHaveClass('visible');
    expect(checkMarks[2]).toHaveClass('hidden');
  });

  it('fires onChange and closes menu when menu item is clicked', () => {
    render(<SidebarMoreMenuExample />);

    fireEvent.click(screen.getByTestId(TRIGGER_TEST_ID));
    fireEvent.click(screen.getAllByRole('menuitem')[1]);

    expect(screen.queryByTestId(MENU_TEST_ID)).not.toBeInTheDocument();
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onChange, closes menu, and returns focus to trigger when menu item is selected with enter', () => {
    render(<SidebarMoreMenuExample />);

    fireEvent.keyDown(screen.getByTestId(TRIGGER_TEST_ID), {
      key: 'Enter',
      code: 'Enter',
    });

    fireEvent.keyDown(screen.getAllByRole('menuitem')[1], {
      key: 'Enter',
      code: 'Enter',
    });

    expect(screen.queryByTestId(MENU_TEST_ID)).not.toBeInTheDocument();
    expect(screen.getByTestId(TRIGGER_TEST_ID)).toHaveFocus();
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('returns focus to trigger when menu is closed with escape', async () => {
    render(<SidebarMoreMenuExample />);

    fireEvent.keyDown(screen.getByTestId(TRIGGER_TEST_ID), {
      key: 'Enter',
      code: 'Enter',
    });

    expect(screen.getByTestId(MENU_TEST_ID)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(screen.queryByTestId(MENU_TEST_ID)).not.toBeInTheDocument();
    expect(screen.getByTestId(TRIGGER_TEST_ID)).toHaveFocus();
  });
});
