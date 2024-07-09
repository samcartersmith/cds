import React, { useCallback } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { SelectOption } from '../../controls/SelectOption';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { TextCaption } from '../../typography/TextCaption';
import { SelectChipProps } from '../SelectChip';
import { SelectChip } from '../SelectChip';

const selectChipTestId = 'select-chip-test';
const sortOptions = ['Balance', 'Name', 'Asset Value'];

const ExampleSelectChip = ({
  onChange,
  value: defaultValue,
  ...props
}: Omit<SelectChipProps, 'content' | 'children'>) => {
  const [value, setValue] = React.useState<string | undefined>(defaultValue);
  const handleValueChange = useCallback(
    (val: string) => {
      setValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  const content = (
    <VStack>
      <HStack role="separator" spacingHorizontal={2} spacingVertical={2}>
        <TextCaption as="h2" color="foregroundMuted">
          Section Heading
        </TextCaption>
      </HStack>
      {sortOptions.map((option) => (
        <SelectOption key={option} title={option} value={option} />
      ))}
    </VStack>
  );
  return (
    <SelectChip
      content={content}
      onChange={handleValueChange}
      placeholder="Select an option"
      testID={selectChipTestId}
      value={value}
      {...props}
    />
  );
};

describe('SelectChip', () => {
  it('renders and displays the currently selected value', () => {
    render(<ExampleSelectChip value={sortOptions[0]} />);

    expect(screen.getByText(sortOptions[0])).toBeTruthy();
  });
  it('passes accessibility', async () => {
    expect(await renderA11y(<ExampleSelectChip />)).toHaveNoViolations();
  });
  it('opens a dropdown menu when the chip is pressed', async () => {
    const onPress = jest.fn();
    render(<ExampleSelectChip onPress={onPress} />);

    fireEvent.click(screen.getByTestId(selectChipTestId));
    expect(onPress).toHaveBeenCalled();

    const notSelectedOption = await screen.findByText(sortOptions[1]);
    expect(notSelectedOption).toBeDefined();
  });
  it('does not open the menu when disabled', () => {
    const onPress = jest.fn();
    render(<ExampleSelectChip disabled onPress={onPress} />);

    fireEvent.click(screen.getByTestId(selectChipTestId));

    expect(screen.queryByTestId(`${selectChipTestId}-dropdown`)).not.toBeInTheDocument();
    expect(onPress).not.toHaveBeenCalled();
  });
  it('renders a placeholder when no value is selected', () => {
    render(<ExampleSelectChip />);

    expect(screen.getByText('Select an option')).toBeTruthy();
  });
  it('updates the value when an option is selected', async () => {
    const onChange = jest.fn();
    render(<ExampleSelectChip onChange={onChange} />);

    fireEvent.click(screen.getByTestId(selectChipTestId));

    const notSelectedOption = await screen.findByText(sortOptions[1]);
    // click the first menu item
    fireEvent.click(notSelectedOption);
    expect(onChange).toHaveBeenCalled();
    // have to redefine/find it because it's a different node
    expect(await screen.findByText(sortOptions[1])).toBeDefined();
    expect(screen.queryByText('Select an option')).not.toBeInTheDocument();
  });
  it('trigger is in focus after interaction and menu is closed', async () => {
    render(<ExampleSelectChip />);

    fireEvent.click(screen.getByTestId(selectChipTestId));

    const firstSelectOption = await screen.findByText(sortOptions[1]);
    // select the first option
    fireEvent.click(firstSelectOption);

    expect(screen.getByTestId(selectChipTestId)).toHaveFocus();
  });
  it('renders a valueLabel when provided instead of the value', () => {
    render(<ExampleSelectChip value="Example" valueLabel="Some label" />);

    expect(screen.getByText('Some label')).toBeTruthy();
    expect(screen.queryByText('Example')).not.toBeInTheDocument();
  });
});
