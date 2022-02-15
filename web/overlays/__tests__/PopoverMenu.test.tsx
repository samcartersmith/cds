import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import {
  popoverMenuBuilder,
  CreatePopoverMenuStoriesProps,
  priceOptions,
} from '../__stories__/popoverMenuBuilder';
import { PopoverMenu } from '../PopoverMenu/PopoverMenu';
import { PopoverTrigger } from '../PopoverMenu/PopoverTrigger';
import { PopoverTriggerWrapper } from '../PopoverMenu/PopoverTriggerWrapper';
import { SelectOption } from '../../controls/SelectOption';
import { IconButton, AvatarButton } from '../../buttons';
import { MenuItem } from '../PopoverMenu/MenuItem';
import { ThemeProvider } from '../../system/ThemeProvider';
import { VStack, HStack } from '../../layout';
import { SectionTitle } from '../PopoverMenu/SectionTitle';
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
  HStack,
  SectionTitle,
  Divider,
  DotStatusColor,
  AvatarButton,
} as CreatePopoverMenuStoriesProps);

const mockTriggerTestID = 'popover-menu-trigger';
const mockPopoverMenuTestID = 'popover-menu';
const onBlurSpy = jest.fn();

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
  it('when the menu is opened it updates the aria props on the trigger', async () => {
    const { getByTestId } = render(<MockPopoverMenu triggerTestID={mockTriggerTestID} />);

    // open the menu
    fireEvent.click(getByTestId(mockTriggerTestID));

    const trigger = await waitFor(() => getByTestId(mockTriggerTestID));
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
  it('passes accessibility props to the menu', async () => {
    const { getByRole, getByTestId } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // open the menu
    fireEvent.click(getByTestId(mockTriggerTestID));

    const menu = await waitFor(() => getByRole('menu'));
    expect(menu).toHaveAttribute('id');
  });
  it('renders the Trigger', () => {
    const { getByTestId } = render(<MockPopoverMenu triggerTestID={mockTriggerTestID} />);

    expect(getByTestId(mockTriggerTestID)).toBeDefined();
  });
  it('opens the PopoverMenu when the Trigger is pressed', async () => {
    const { getByText, getByTestId } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} testID={mockPopoverMenuTestID} />,
    );

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // expect PopoverMenu and SelectOption to render
    await waitFor(() => expect(getByText(priceOptions[0])).toBeDefined());
  });
  it('closes the PopoverMenu when an option is pressed and fires onChange', async () => {
    const { getAllByRole, getByTestId } = render(
      <MockPopoverMenu
        triggerTestID={mockTriggerTestID}
        testID={mockPopoverMenuTestID}
        onBlur={onBlurSpy}
      />,
    );

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // expect PopoverMenu and SelectOption to render
    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);

    // select the first option
    fireEvent.click(firstOption);

    // menu should dismount
    expect(onBlurSpy).toHaveBeenCalled();
  });
  it('the selected option has a tabindex of 0', async () => {
    const { getAllByRole, getByTestId } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} onBlur={onBlurSpy} />,
    );

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // select the first option
    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
    fireEvent.click(firstOption);

    // menu should dismount
    expect(onBlurSpy).toHaveBeenCalled();

    // press the trigger
    fireEvent.click(getByTestId(mockTriggerTestID));

    // expect the first option to have tabindex 0
    // you have to rerender it because it has a checkbox accessory now
    const firstOptionRerendered = await waitFor(() => getAllByRole('menuitem')[0]);
    expect(firstOptionRerendered).toHaveAttribute('tabindex', '0');
  });
  // keyboard interactions to open the menu
  it('opens the menu when the trigger is focused and user types Enter', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const menuItems = await waitFor(() => getAllByRole('menuitem')[0]);
    // expect the menu to open
    expect(menuItems).toBeDefined();
  });
  it('opens the menu when the trigger is focused and user types Space', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: ' ',
      code: 'Space',
    });

    const menuItems = await waitFor(() => getAllByRole('menuitem')[0]);
    // expect the menu to open
    expect(menuItems).toBeDefined();
  });
  it('opens the menu when the trigger is focused and user types ArrowUp', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    const menuItems = await waitFor(() => getAllByRole('menuitem')[0]);
    // expect the menu to open
    expect(menuItems).toBeDefined();
  });
  it('opens the menu when the trigger is focused and user types ArrowDown', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    const menuItems = await waitFor(() => getAllByRole('menuitem')[0]);
    // expect the menu to open
    expect(menuItems).toBeDefined();
  });
  // menu item interactions
  it('focuses on the next menu item when ArrowDown is typed', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
    const secondOption = getAllByRole('menuitem')[1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    // expect second option to be focused
    expect(secondOption).toHaveFocus();
  });
  it('focuses on the previous menu item when ArrowUp is typed', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
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
  it('focuses on the first menu item when Home is typed', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
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
  it('focuses on the last menu item when End is typed', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
    const lastOption = getAllByRole('menuitem')[getAllByRole('menuitem').length - 1];

    fireEvent.keyDown(firstOption, {
      key: 'End',
      code: 'End',
    });

    // expect last option to be focused
    expect(lastOption).toHaveFocus();
  });

  // initial focus
  it('focuses on the first option when the menu is opened by a keyboard interaction', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // open the menu
    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);

    // expect first option to be focused
    expect(firstOption).toHaveFocus();
  });
  it('selects a value with keyboard navigation and focuses on the already selected value when the menu is reopened', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} />,
    );

    // open the menu
    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
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

    setTimeout(() => {
      // expect selected option be focused
      const secondOptionRerendered = getAllByRole('menuitem')[1];
      expect(secondOptionRerendered).toHaveFocus();
    }, 1000);
  });
  // escape to close
  it('closes the menu when a menu item is focused and the user types Escape', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} onBlur={onBlurSpy} />,
    );

    // open the menu
    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
    expect(firstOption).toBeInTheDocument();

    // type escape
    fireEvent.keyDown(firstOption, {
      key: 'Escape',
      code: 'Escape',
    });

    // expect menu to close
    expect(onBlurSpy).toHaveBeenCalled();
  });

  it('when the first option is focused and ArrowUp is typed it closes the menu', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} onBlur={onBlurSpy} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);

    fireEvent.keyDown(firstOption, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    // expect the menu to close
    expect(onBlurSpy).toHaveBeenCalled();
  });
  it('when the last option is focused and ArrowDown is typed it closes the menu', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} onBlur={onBlurSpy} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);

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
    expect(onBlurSpy).toHaveBeenCalled();
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
  it('opens the PopoverMenu when the trigger is pressed', async () => {
    const { getByTestId, getAllByRole } = render(
      <AvatarButtonMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.click(getByTestId(mockTriggerTestID));

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
    expect(firstOption).toBeDefined();
  });
  it('opens the PopoverMenu when an enter key is pressed when the trigger is focused', async () => {
    const { getByTestId, getAllByRole } = render(
      <AvatarButtonMenu triggerTestID={mockTriggerTestID} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
    expect(firstOption).toBeDefined();
  });
});
