import { fireEvent, render, screen } from '@testing-library/react';
import {
  CreateSelectStoriesProps,
  exampleOptions,
  selectBuilder,
} from '@cbhq/cds-common/internal/selectBuilder';
import { InputIcon } from '@cbhq/cds-web/controls/InputIcon';
import { DotSymbol } from '@cbhq/cds-web/dots';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { Box } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { RemoteImage } from '@cbhq/cds-web/media';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

const { Default: MockSelect } = selectBuilder({
  Select,
  VStack,
  SelectOption,
  ThemeProvider,
  Icon,
  InputIcon,
  Box,
  RemoteImage,
  DotSymbol,
} as unknown as CreateSelectStoriesProps);

const mockPlaceholder = 'Choose something...';
const accessibilityLabel = 'label';
const mockTestID = 'select-input-test';

describe('Select', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<MockSelect accessibilityLabel={accessibilityLabel} />),
    ).toHaveNoViolations();
    expect(await renderA11y(<MockSelect label="Test" />)).toHaveNoViolations();
  });
  it('can pass `aria-label` attribute', () => {
    render(<MockSelect accessibilityLabel={accessibilityLabel} testID={mockTestID} />);

    expect(screen.getByTestId(mockTestID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
  it('renders the Select trigger', async () => {
    render(<MockSelect testID={mockTestID} />);

    expect(screen.getByTestId(mockTestID)).toBeDefined();
  });
  it('opens the Menu when the Select is pressed', async () => {
    const onPressSpy = jest.fn();
    render(<MockSelect onPress={onPressSpy} placeholder={mockPlaceholder} />);

    fireEvent.click(screen.getByText(mockPlaceholder));
    expect(onPressSpy).toHaveBeenCalled();

    const firstOption = await screen.findByText(exampleOptions[0]);
    // expect Menu and SelectOption to render
    expect(firstOption).toBeDefined();
  });
  it('closes the Menu when an option is pressed and fires onChange', async () => {
    const onChangeSpy = jest.fn();

    render(<MockSelect onPress={onChangeSpy} placeholder={mockPlaceholder} />);

    const placeholder = screen.getByText(mockPlaceholder);

    fireEvent.click(placeholder);

    // expect Menu and SelectOption to render
    const firstSelectOption = await screen.findByText(exampleOptions[0]);

    // select the first option
    fireEvent.click(firstSelectOption);
    expect(onChangeSpy).toHaveBeenCalled();

    expect(screen.queryByText(mockPlaceholder)).toBeNull();
  });
  it('replaces the placeholder text with the selected value when pressed', async () => {
    render(<MockSelect placeholder={mockPlaceholder} />);

    const placeholder = screen.getByText(mockPlaceholder);

    fireEvent.click(placeholder);

    // expect Menu and SelectOption to render
    const secondSelectOption = await screen.findByText(exampleOptions[1]);
    fireEvent.click(secondSelectOption);

    expect(screen.getAllByText(exampleOptions[1])).toBeDefined();
    expect(screen.queryByText(mockPlaceholder)).toBeNull();
  });

  it('trigger is in focus after interaction and menu is closed', async () => {
    render(<MockSelect placeholder={mockPlaceholder} />);

    const selectButton = screen.getAllByRole('button')[0];
    expect(selectButton).not.toHaveFocus();

    fireEvent.click(selectButton);

    // expect Menu and SelectOption to render
    const firstSelectOption = await screen.findByText(exampleOptions[0]);

    // select the first option
    fireEvent.click(firstSelectOption);

    expect(selectButton).toHaveFocus();
  });
});
