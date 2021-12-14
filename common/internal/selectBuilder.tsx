import React, { useState, ReactElement } from 'react';
import type {
  SelectBaseProps,
  SelectOptionBaseProps,
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

type MenuItemProps = {
  value: string;
  key?: string;
  ref?: ((ref: HTMLElement) => void) | undefined;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
} & LinkableProps;

export type SelectProps = {
  children: ReactElement<MenuItemProps>[];
  onChange?: (newValue: string) => void;
} & SelectBaseProps;

export type CreateSelectStoriesProps = {
  Select: React.ComponentType<SelectProps>;
  MenuItem: React.ComponentType<MenuItemProps>;
  VStack: React.ComponentType<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>;
  SelectOption: React.ComponentType<SelectOptionBaseProps>;
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

export const selectBuilder = ({
  Select,
  MenuItem,
  VStack,
  SelectOption,
  ThemeProvider,
  spectrum,
  scale,
}: CreateSelectStoriesProps) => {
  const Default = ({
    variant,
    placeholder = 'Choose something',
    label,
    accessibilityLabel,
    testID,
    onPress,
    helperText,
  }: Pick<
    SelectProps,
    'variant' | 'label' | 'placeholder' | 'accessibilityLabel' | 'testID' | 'onPress' | 'helperText'
  >) => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={600}>
          <Select
            value={value}
            variant={variant}
            label={label}
            placeholder={placeholder}
            onChange={setValue}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            onPress={onPress}
            helperText={helperText}
          >
            {priceOptions.map((option) => (
              <MenuItem value={option} key={option}>
                <SelectOption
                  title={option}
                  description="BTC"
                  testID={`option-${option}`}
                  selected={value === option}
                />
              </MenuItem>
            ))}
          </Select>
        </VStack>
      </ThemeProvider>
    );
  };
  const InputStackOptions = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={100}>
          <Select
            value={value}
            onChange={setValue}
            placeholder="I am some ridiculously, absurdly, ostentatiously long placeholder text that would ideally get truncated when I meet the edge of my parent container. "
            label="I am a very long label that is supposed to be indicative of what my purpose is. Do you know my purpose? Directive? Directive? Directive? "
            helperText="What happens when helper text gets ridiculously long? We shall find out... Bueller.. Bueller.. is the edge of my parent container present? Ugh I still have a way to go. "
          >
            {priceOptions.map((option) => (
              <MenuItem value={option} key={option}>
                <SelectOption
                  title={option}
                  description="BTC"
                  testID={`option-${option}`}
                  selected={value === option}
                />
              </MenuItem>
            ))}
          </Select>
        </VStack>
      </ThemeProvider>
    );
  };
  const WithLabel = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={100}>
          <Select
            value={value}
            onChange={setValue}
            placeholder="Choose something"
            label="Pick your poison"
          >
            {priceOptions.map((option) => (
              <MenuItem value={option} key={option}>
                <SelectOption
                  title={option}
                  description="BTC"
                  testID={`option-${option}`}
                  selected={value === option}
                />
              </MenuItem>
            ))}
          </Select>
        </VStack>
      </ThemeProvider>
    );
  };
  const Compact = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={100}>
          <Select
            value={value}
            compact
            onChange={setValue}
            placeholder="Choose something"
            label="Pick your poison"
            helperText="You only get one choice"
          >
            {priceOptions.map((option) => (
              <MenuItem value={option} key={option}>
                <SelectOption
                  compact
                  title={option}
                  description="BTC"
                  testID={`option-${option}`}
                  selected={value === option}
                />
              </MenuItem>
            ))}
          </Select>
        </VStack>
      </ThemeProvider>
    );
  };
  const Variants = () => {
    return (
      <VStack>
        <Default label="I am a label" helperText="I am helpful text" variant="foreground" />
        <Default label="I am a label" helperText="I am helpful text" variant="foregroundMuted" />
        <Default label="I am a label" helperText="I am helpful text" variant="primary" />
        <Default label="I am a label" helperText="I am helpful text" variant="positive" />
        <Default label="I am a label" helperText="I am helpful text" variant="negative" />
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

export type CreateSelectProps = {
  Select: React.ComponentType<SelectBaseProps>;
  Tray: React.ComponentType<TrayBaseProps>;
  SelectOption: React.ComponentType<SelectOptionBaseProps & LinkableProps>;
  ScrollView: React.ComponentType;
};

type OptionProps = {
  label: string;
  value: string;
};

type DefaultSelectTypes = {
  options: OptionProps[];
  trayTitle?: string;
  hasDescription?: boolean;
  compactSelectOption?: boolean;
  hideHandleBar?: boolean;
} & Omit<SelectBaseProps, 'children'>;

export const selectBuilderMobile = ({
  Tray,
  Select,
  SelectOption,
  ScrollView,
}: CreateSelectProps) => {
  const DefaultSelect = ({
    options,
    value: initialValue,
    trayTitle,
    hasDescription,
    compactSelectOption,
    hideHandleBar,
    ...props
  }: DefaultSelectTypes) => {
    const [isTrayVisible, { toggleOff, toggleOn }] = useToggler(false);
    const [value, setValue] = useState<string | undefined>(initialValue);
    return (
      <Select value={value} onPress={toggleOn} {...props}>
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
                  <SelectOption
                    title={option.label}
                    compact={compactSelectOption}
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
      </Select>
    );
  };

  const ScrollableSelect = ({
    options,
    value: initialValue,
    trayTitle,
    hasDescription,
    compactSelectOption,
    ...props
  }: DefaultSelectTypes) => {
    const [isTrayVisible, { toggleOn, toggleOff }] = useToggler(false);
    const [value, setValue] = useState<string | undefined>(initialValue);
    return (
      <Select value={value} onPress={toggleOn} {...props}>
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
                    <SelectOption
                      title={option.label}
                      compact={compactSelectOption}
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
      </Select>
    );
  };

  return {
    DefaultSelect,
    ScrollableSelect,
  };
};
