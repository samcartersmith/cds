import React, { useState, ReactElement } from 'react';
import type {
  SelectInputBaseProps,
  SelectOptionCellBaseProps,
  TrayBaseProps,
  Spectrum,
  ThemeProviderBaseProps,
  BoxBaseProps,
  StackBaseProps,
  Scale,
} from '../types';
import { useToggler } from '../hooks/useToggler';

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
  ThemeProvider: React.ComponentType<ThemeProviderBaseProps>;
  spectrum?: Spectrum;
  scale?: Scale;
};

export const priceOptions = [
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

export const selectInputBuilder = ({
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
            {priceOptions.map((option) => (
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
            {priceOptions.map((option) => (
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
            {priceOptions.map((option) => (
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
            {priceOptions.map((option) => (
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

export type CreateSelectInputProps = {
  SelectInput: React.ComponentType<SelectInputBaseProps>;
  Tray: React.ComponentType<TrayBaseProps>;
  SelectOptionCell: React.ComponentType<SelectOptionCellBaseProps & LinkableProps>;
  ScrollView: React.ComponentType;
};

type OptionProps = {
  label: string;
  value: string;
};

type DefaultSelectInputTypes = {
  options: OptionProps[];
  trayTitle?: string;
  hasDescription?: boolean;
  compactSelectOptionCell?: boolean;
  hideHandleBar?: boolean;
} & Omit<SelectInputBaseProps, 'children'>;

export const selectInputBuilderMobile = ({
  Tray,
  SelectInput,
  SelectOptionCell,
  ScrollView,
}: CreateSelectInputProps) => {
  const DefaultSelectInput = ({
    options,
    value: initialValue,
    trayTitle,
    hasDescription,
    compactSelectOptionCell,
    hideHandleBar,
    ...props
  }: DefaultSelectInputTypes) => {
    const [isTrayVisible, { toggleOff, toggleOn }] = useToggler(false);
    const [value, setValue] = useState<string | undefined>(initialValue);
    return (
      <SelectInput value={value} onPress={toggleOn} {...props}>
        {isTrayVisible && (
          <Tray
            title={trayTitle}
            onCloseComplete={toggleOff}
            hideHandleBar={hideHandleBar}
            testID="select-input-tray"
          >
            {({ closeTray }) =>
              options.map((option) => {
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                const onPress = () => {
                  setValue(option.value);
                  closeTray();
                };
                return (
                  <SelectOptionCell
                    title={option.label}
                    compact={compactSelectOptionCell}
                    key={option.value}
                    description={hasDescription && 'BTC'}
                    onPress={onPress}
                    selected={value === option.value}
                  />
                );
              })
            }
          </Tray>
        )}
      </SelectInput>
    );
  };

  const ScrollableSelectInput = ({
    options,
    value: initialValue,
    trayTitle,
    hasDescription,
    compactSelectOptionCell,
    ...props
  }: DefaultSelectInputTypes) => {
    const [isTrayVisible, { toggleOn, toggleOff }] = useToggler(false);
    const [value, setValue] = useState<string | undefined>(initialValue);
    return (
      <SelectInput value={value} onPress={toggleOn} {...props}>
        {isTrayVisible && (
          <Tray
            disableCapturePanGestureToDismiss={false}
            title={trayTitle}
            onCloseComplete={toggleOff}
          >
            {({ closeTray }) => (
              <ScrollView>
                {options.map((option) => {
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  const onPress = () => {
                    setValue(option.value);
                    closeTray();
                  };
                  return (
                    <SelectOptionCell
                      title={option.label}
                      compact={compactSelectOptionCell}
                      key={option.value}
                      description={hasDescription && 'BTC'}
                      onPress={onPress}
                      selected={value === option.value}
                    />
                  );
                })}
              </ScrollView>
            )}
          </Tray>
        )}
      </SelectInput>
    );
  };

  return {
    DefaultSelectInput,
    ScrollableSelectInput,
  };
};
