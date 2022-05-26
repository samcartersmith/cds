import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { AvatarButton, IconButton } from '../../buttons';
import { SelectOption } from '../../controls/SelectOption';
import { DotStatusColor } from '../../dots/DotStatusColor';
import { HStack, VStack } from '../../layout';
import { Divider } from '../../layout/Divider';
import { ThemeProvider } from '../../system/ThemeProvider';
import {
  CreatePopoverMenuStoriesProps,
  popoverMenuBuilder,
  priceOptions,
} from '../__stories__/popoverMenuBuilder';
import { PopoverMenu } from '../PopoverMenu/PopoverMenu';
import { PopoverTrigger } from '../PopoverMenu/PopoverTrigger';
import { PopoverTriggerWrapper } from '../PopoverMenu/PopoverTriggerWrapper';
import { SectionTitle } from '../PopoverMenu/SectionTitle';

// @ts-expect-error TODO: casting doesn't remove the need for all the component types
const { Default: MockPopoverMenu, AvatarButtonMenu } = popoverMenuBuilder({
  PopoverMenu,
  PopoverTrigger,
  PopoverTriggerWrapper,
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
    const secondOption = getAllByRole('menuitem')[1];
    const lastOption = getAllByRole('menuitem')[getAllByRole('menuitem').length - 1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(secondOption, {
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

  it('when the first option is focused and ArrowUp is typed it focuses on the last option', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} onBlur={onBlurSpy} />,
    );

    fireEvent.keyDown(getByTestId(mockTriggerTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);
    const lastOption = getAllByRole('menuitem')[getAllByRole('menuitem').length - 1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    expect(lastOption).toHaveFocus();
  });
  it('when the last option is focused and ArrowDown is typed it focuses on the first option', async () => {
    const { getByTestId, getAllByRole } = render(
      <MockPopoverMenu triggerTestID={mockTriggerTestID} onBlur={onBlurSpy} />,
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

    fireEvent.keyDown(lastOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    expect(firstOption).toHaveFocus();
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
