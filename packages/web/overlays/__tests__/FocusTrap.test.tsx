import { fireEvent, render, waitFor } from '@testing-library/react';

import { Default as Dropdown } from '../../dropdown/__stories__/Dropdown.stories';

const subjectTestID = 'subject-test';

const fruitOptions = ['Blueberry', 'Tomato', 'Apple', 'Banana', 'Pear', 'Guava', 'Pomegranate'];

describe('FocusTrap', () => {
  // menu item interactions
  it('focuses on the next menu item when ArrowDown is typed', async () => {
    const { getByTestId, getAllByRole } = render(<Dropdown subjectTestID={subjectTestID} />);

    fireEvent.keyDown(getByTestId(subjectTestID), {
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
    const { getByTestId, getAllByRole } = render(<Dropdown subjectTestID={subjectTestID} />);

    fireEvent.keyDown(getByTestId(subjectTestID), {
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
    const { getByTestId, getAllByRole } = render(<Dropdown subjectTestID={subjectTestID} />);

    fireEvent.keyDown(getByTestId(subjectTestID), {
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

  it('focuses on the first matching element after a US character is typed', async () => {
    const { getByTestId, getAllByRole } = render(
      <Dropdown options={fruitOptions} subjectTestID={subjectTestID} />,
    );

    fireEvent.keyDown(getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const menuItems = getAllByRole('menuitem');

    const firstOption = await waitFor(() => menuItems[0]);
    const optionStartsWithA = menuItems[2];

    fireEvent.keyDown(firstOption, {
      key: 'a',
      code: '65',
    });

    // expect the option "Apple" option to be focused
    expect(optionStartsWithA).toHaveFocus();
  });

  it('keeps focus on the previous element when no matching element for typed US character', async () => {
    const { getByTestId, getAllByRole } = render(
      <Dropdown options={fruitOptions} subjectTestID={subjectTestID} />,
    );

    fireEvent.keyDown(getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const menuItems = getAllByRole('menuitem');

    const firstOption = await waitFor(() => menuItems[0]);

    expect(firstOption).toHaveFocus();

    fireEvent.keyDown(firstOption, {
      key: 'c',
      code: '67',
    });

    expect(firstOption).toHaveFocus();
  });
  it('focuses on the last menu item when End is typed', async () => {
    const { getByTestId, getAllByRole } = render(<Dropdown subjectTestID={subjectTestID} />);

    fireEvent.keyDown(getByTestId(subjectTestID), {
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
    const { getByTestId, getAllByRole } = render(<Dropdown subjectTestID={subjectTestID} />);

    // open the menu
    fireEvent.keyDown(getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => getAllByRole('menuitem')[0]);

    // expect first option to be focused
    expect(firstOption).toHaveFocus();
  });

  it('when the first option is focused and ArrowUp is typed it focuses on the last option', async () => {
    const { getByTestId, getAllByRole } = render(<Dropdown subjectTestID={subjectTestID} />);

    fireEvent.keyDown(getByTestId(subjectTestID), {
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
    const { getByTestId, getAllByRole } = render(<Dropdown subjectTestID={subjectTestID} />);

    fireEvent.keyDown(getByTestId(subjectTestID), {
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
