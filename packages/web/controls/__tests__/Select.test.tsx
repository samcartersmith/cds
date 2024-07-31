import useMeasure from 'react-use-measure';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  CreateSelectStoriesProps,
  exampleOptions,
  selectBuilder,
} from '@cbhq/cds-common/internal/selectBuilder';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { DotSymbol } from '../../dots';
import { Icon } from '../../icons/Icon';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media';
import { ThemeProvider } from '../../system/ThemeProvider';
import { InputIcon } from '../InputIcon';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

jest.mock('react-use-measure');
const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};
const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 230,
    x: 20,
    y: 64,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

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
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
  });
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
    fireEvent.click(selectButton);

    // expect Menu and SelectOption to render
    const firstSelectOption = await screen.findByText(exampleOptions[0]);

    // select the first option
    fireEvent.click(firstSelectOption);

    const selectButtonRerendered = screen.getAllByRole('button')[0];
    expect(selectButtonRerendered).toHaveFocus();
  });
  it('renders error icon in helper text when variant is negative', async () => {
    render(<MockSelect helperText="helper text" variant="negative" />);

    expect(screen.getByTestId('select-error-icon')).toBeTruthy();
    expect(screen.getByText('helper text')).toBeTruthy();
  });
  it('should not render error icon when passing in helper text node', async () => {
    render(<MockSelect helperText={<span>helper text</span>} variant="negative" />);

    expect(screen.queryByTestId('select-error-icon')).toBeFalsy();
  });
});
