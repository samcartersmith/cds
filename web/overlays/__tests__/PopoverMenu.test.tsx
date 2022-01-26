import { render, fireEvent } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import {
  popoverMenuBuilder,
  CreatePopoverMenuStoriesProps,
  priceOptions,
} from '../__stories__/popoverMenuBuilder';
import { PopoverMenu, PopoverTrigger, PopoverTriggerWrapper } from '../PopoverMenu';
import { SelectOption } from '../../controls/SelectOption';
import { IconButton, AvatarButton } from '../../buttons';
import { MenuItem } from '../MenuItem';
import { ThemeProvider } from '../../system/ThemeProvider';
import { VStack } from '../../layout/VStack';
import { MenuSectionLabel } from '../MenuSectionLabel';
import { Divider } from '../../layout/Divider';
import { DotStatusColor } from '../../dots/DotStatusColor';

// @ts-expect-error TODO: casting doesn't remove the need for all the component types
const { Default: MockPopoverMenu, AvatarButtonMenu } = popoverMenuBuilder({
  PopoverMenu,
  PopoverTrigger,
  PopoverTriggerWrapper,
  MenuItem,
  SelectOption,
  IconButton,
  ThemeProvider,
  VStack,
  MenuSectionLabel,
  Divider,
  DotStatusColor,
  AvatarButton,
} as CreatePopoverMenuStoriesProps);

const mockTriggerTestID = 'popover-menu-trigger';
const mockPopoverMenuTestID = 'popover-menu';

describe('PopoverMenu', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockPopoverMenu />)).toHaveNoViolations();
  });
  it('passes accessibility props to the trigger element', () => {
    const { getByTestId } = render(<MockPopoverMenu triggerTestID={mockTriggerTestID} />);

    expect(getByTestId(mockTriggerTestID)).toHaveAttribute('aria-expanded', 'false');
    expect(getByTestId(mockTriggerTestID)).toHaveAttribute('aria-controls');
    expect(getByTestId(mockTriggerTestID)).toHaveAttribute('aria-haspopup', 'dialog');
  });
  it('when the menu is opened it updates the aria props on the trigger', () => {
    const { getByTestId } = render(<MockPopoverMenu triggerTestID={mockTriggerTestID} />);

    // open the menu
    fireEvent.click(getByTestId(mockTriggerTestID));

    expect(getByTestId(mockTriggerTestID)).toHaveAttribute('aria-expanded', 'true');
  });
  it('passes accessibility props to the menu', () => {
    const { getByRole, getByTestId } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // open the menu
    fireEvent.click(getByTestId(mockTriggerTestID));

    expect(getByRole('menu')).toHaveAttribute('id');
  });
  it('renders the Trigger', () => {
    const { getByTestId } = render(<MockPopoverMenu triggerTestID={mockTriggerTestID} />);

    expect(getByTestId(mockTriggerTestID)).toBeDefined();
  });
  it('opens the PopoverMenu when the Trigger is pressed', () => {
    const { getByText, getByTestId } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} testID={mockPopoverMenuTestID} />,
    );

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // expect PopoverMenu and SelectOption to render
    expect(getByText(priceOptions[0])).toBeDefined();
  });
  it('closes the PopoverMenu when an option is pressed and fires onChange', () => {
    const { getAllByRole, getByTestId } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} testID={mockPopoverMenuTestID} />,
    );

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // expect PopoverMenu and SelectOption to render
    const firstOption = getAllByRole('menuitem')[0];

    // select the first option
    fireEvent.click(firstOption);

    // menu should dismount
    expect(firstOption).not.toBeInTheDocument();
  });
  it('the selected option has a tabindex of 0', () => {
    const { getAllByRole, getByTestId } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // select the first option
    const firstOption = getAllByRole('menuitem')[0];
    fireEvent.click(firstOption);

    // menu should dismount
    expect(firstOption).not.toBeInTheDocument();

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // expect the first option to have tabindex 0
    // you have to rerender it because it has a checkbox accessory now
    const firstOptionRerendered = getAllByRole('menuitem')[0];
    expect(firstOptionRerendered).toHaveAttribute('tabindex', '0');
  });
  // keyboard interactions to open the menu
  it('opens the menu when the trigger is focused and user types Enter', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    // expect the menu to open
    expect(getAllByRole('menuitem')[0]).toBeDefined();
  });
  it('opens the menu when the trigger is focused and user types Space', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: ' ',
      code: 'Space',
    });

    // expect the menu to open
    expect(getAllByRole('menuitem')[0]).toBeDefined();
  });
  it('opens the menu when the trigger is focused and user types ArrowUp', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    // expect the menu to open
    expect(getAllByRole('menuitem')[0]).toBeDefined();
  });
  it('opens the menu when the trigger is focused and user types ArrowDown', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    // expect the menu to open
    expect(getAllByRole('menuitem')[0]).toBeDefined();
  });
  // menu item interactions
  it('focuses on the next menu item when ArrowDown is typed', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];
    const secondOption = getAllByRole('menuitem')[1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    // expect second option to be focused
    expect(secondOption).toHaveFocus();
  });
  it('focuses on the previous menu item when ArrowUp is typed', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];
    const secondOption = getAllByRole('menuitem')[1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    fireEvent.keyDown(secondOption, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    // expect first option to be focused
    expect(firstOption).toHaveFocus();
  });
  it('focuses on the first menu item when Home is typed', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];
    const secondOption = getAllByRole('menuitem')[1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    fireEvent.keyDown(secondOption, {
      key: 'Home',
      code: 'Home',
    });

    // expect second option to be focused
    expect(firstOption).toHaveFocus();
  });
  it('focuses on the last menu item when End is typed', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];
    const lastOption = getAllByRole('menuitem')[getAllByRole('menuitem').length - 1];

    fireEvent.keyDown(firstOption, {
      key: 'End',
      code: 'End',
    });

    // expect last option to be focused
    expect(lastOption).toHaveFocus();
  });

  // initial focus
  it('focuses on the first option when the menu is opened by a keyboard interaction', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // open the menu
    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];

    // expect first option to be focused
    expect(firstOption).toHaveFocus();
  });
  it('selects a value with keyboard navigation and focuses on the already selected value when the menu is reopened', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // open the menu
    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];
    const secondOption = getAllByRole('menuitem')[1];

    // choose the second option
    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(secondOption, {
      key: 'Enter',
      code: 'Enter',
    });

    // open the menu
    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    // expect selected option be focused
    const secondOptionRerendered = getAllByRole('menuitem')[1];
    expect(secondOptionRerendered).toHaveFocus();
  });
  // escape to close
  it('closes the menu when a menu item is focused and the user types Escape', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // open the menu
    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];
    expect(firstOption).toBeInTheDocument();

    // type escape
    fireEvent.keyDown(firstOption, {
      key: 'Escape',
      code: 'Escape',
    });

    expect(firstOption).not.toBeInTheDocument();
  });

  it('when the first option is focused and ArrowUp is typed it closes the menu', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    // expect the menu to close
    expect(firstOption).not.toBeInTheDocument();
  });
  it('when the last option is focused and ArrowDown is typed it closes the menu', () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];

    fireEvent.keyDown(firstOption, {
      key: 'End',
      code: 'End',
    });

    const lastOption = getAllByRole('menuitem')[getAllByRole('menuitem').length - 1];
    fireEvent.keyDown(lastOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    // expect the menu to close
    expect(firstOption).not.toBeInTheDocument();
  });
});

describe('PopoverMenu trigger is injected with props when top level node is not the trigger (requires use of PopoverTriggerWrapper and PopoverTrigger)', () => {
  it('renders', () => {
    const { getByTestId } = render(<AvatarButtonMenu triggerTestID={mockTriggerTestID} />);

    expect(getByTestId(mockTriggerTestID)).toBeDefined();
  });
  it('receives props from PopoverMenu', () => {
    const { getByTestId } = render(<AvatarButtonMenu triggerTestID={mockTriggerTestID} />);

    expect(getByTestId(mockTriggerTestID)).toHaveAttribute('aria-expanded', 'false');
    expect(getByTestId(mockTriggerTestID)).toHaveAttribute('aria-controls');
    expect(getByTestId(mockTriggerTestID)).toHaveAttribute('aria-haspopup', 'dialog');
  });
  it('opens the PopoverMenu when the trigger is pressed', () => {
    const { getByTestId, getAllByRole } = render(
      <AvatarButtonMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.click(getByTestId(mockTriggerTestID));

    const firstOption = getAllByRole('menuitem')[0];
    expect(firstOption).toBeDefined();
  });
  it('opens the PopoverMenu when an enter key is pressed when the trigger is focused', () => {
    const { getByTestId, getAllByRole } = render(
      <AvatarButtonMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = getAllByRole('menuitem')[0];
    expect(firstOption).toBeDefined();
  });
});
