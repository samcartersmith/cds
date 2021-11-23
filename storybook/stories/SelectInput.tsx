import React, { useState, ReactElement } from 'react';

import {
  BoxBaseProps,
  StackBaseProps,
  Scale,
  SelectInputBaseProps,
  SelectOptionCellBaseProps,
  Spectrum,
  SystemProviderProps,
} from '@cbhq/cds-common';

type LinkableProps = {
  onPress?: null | ((event: unknown) => void) | undefined;
};

type SelectOptionCellProps = {
  value: string;
  key?: string;
  ref?: ((ref: HTMLElement) => void) | undefined;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
} & SelectOptionCellBaseProps &
  LinkableProps;

export type SelectInputProps = {
  children: ReactElement<SelectOptionCellProps>[];
  onChange?: (newValue: string) => void;
} & SelectInputBaseProps;

export type CreateSelectInputStoriesProps = {
  SelectInput: React.ComponentType<SelectInputProps>;
  VStack: React.ComponentType<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>;
  SelectOptionCell: React.ComponentType<SelectOptionCellProps>;
  ThemeProvider: React.ComponentType<SystemProviderProps>;
  spectrum?: Spectrum;
  scale?: Scale;
};

export const options = [
  '666',
  '2387',
  '4542',
  '54534',
  '5435',
  '77',
  '123',
  '4345345',
  '6544',
  '874',
  '675765',
  '65655',
];

export const createStories = ({
  SelectInput,
  VStack,
  SelectOptionCell,
  ThemeProvider,
  spectrum,
  scale,
}: CreateSelectInputStoriesProps) => {
  const Default = ({
    variant,
    placeholder = 'Choose something',
    label,
    accessibilityLabel,
    testID,
    onPress,
  }: Pick<
    SelectInputProps,
    'variant' | 'label' | 'placeholder' | 'accessibilityLabel' | 'testID' | 'onPress'
  >) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={600}>
          <SelectInput
            value={value}
            variant={variant}
            label={label}
            placeholder={placeholder}
            onChange={setValue}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            onPress={onPress}
          >
            {options.map((option) => (
              <SelectOptionCell
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
              />
            ))}
          </SelectInput>
        </VStack>
      </ThemeProvider>
    );
  };
  const InputStackOptions = () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={100}>
          <SelectInput
            value={value}
            onChange={setValue}
            placeholder="Choose something"
            label="Pick your poison"
            helperText="You only get one choice"
          >
            {options.map((option) => (
              <SelectOptionCell value={option} key={option} title={option} description="BTC" />
            ))}
          </SelectInput>
        </VStack>
      </ThemeProvider>
    );
  };
  const WithLabel = () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={100}>
          <SelectInput
            value={value}
            onChange={setValue}
            placeholder="Choose something"
            label="Pick your poison"
          >
            {options.map((option) => (
              <SelectOptionCell value={option} key={option} title={option} description="BTC" />
            ))}
          </SelectInput>
        </VStack>
      </ThemeProvider>
    );
  };
  const Compact = () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={100}>
          <SelectInput
            value={value}
            compact
            onChange={setValue}
            placeholder="Choose something"
            label="Pick your poison"
            helperText="You only get one choice"
          >
            {options.map((option) => (
              <SelectOptionCell
                compact
                value={option}
                key={option}
                title={option}
                description="BTC"
              />
            ))}
          </SelectInput>
        </VStack>
      </ThemeProvider>
    );
  };
  const Variants = () => {
    return (
      <VStack>
        <Default variant="foreground" />
        <Default variant="foregroundMuted" />
        <Default variant="primary" />
        <Default variant="positive" />
        <Default variant="negative" />
      </VStack>
    );
  };
  return {
    Default,
    InputStackOptions,
    Compact,
    Variants,
    WithLabel,
  };
};
