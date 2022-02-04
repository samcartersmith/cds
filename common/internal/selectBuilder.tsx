import React, { useState, ReactElement, ComponentType } from 'react';
import type {
  SelectBaseProps,
  SelectOptionBaseProps,
  TrayBaseProps,
  Spectrum,
  ThemeProviderBaseProps,
  BoxBaseProps,
  StackBaseProps,
  Scale,
  TextInputBaseProps,
  IconBaseProps,
  NoopFn,
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
  selected?: boolean;
} & LinkableProps;

type SelectOptionProps = SelectOptionBaseProps & Pick<MenuItemProps, 'value' | 'key' | 'selected'>;

export type SelectProps = {
  children: ReactElement<MenuItemProps>[];
  onChange?: (newValue: string) => void;
  onBlur?: NoopFn;
} & SelectBaseProps;

export type CreateSelectStoriesProps = {
  Select: ComponentType<SelectProps>;
  VStack: ComponentType<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>;
  SelectOption: ComponentType<SelectOptionProps>;
  ThemeProvider: ComponentType<ThemeProviderBaseProps>;
  spectrum?: Spectrum;
  scale?: Scale;
  InputIcon: ComponentType<Omit<IconBaseProps, 'size'>>;
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
  VStack,
  SelectOption,
  ThemeProvider,
  spectrum,
  scale,
  InputIcon,
}: CreateSelectStoriesProps) => {
  const Default = ({
    variant,
    placeholder = 'Choose something',
    label,
    accessibilityLabel,
    testID,
    onPress,
    helperText,
    onBlur,
  }: Pick<
    SelectProps,
    | 'variant'
    | 'label'
    | 'placeholder'
    | 'accessibilityLabel'
    | 'testID'
    | 'onPress'
    | 'helperText'
    | 'onBlur'
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
            onBlur={onBlur}
          >
            {priceOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
                selected={value === option}
              />
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
            startNode={<InputIcon name="calendar" />}
          >
            {priceOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
                selected={value === option}
              />
            ))}
          </Select>
        </VStack>
      </ThemeProvider>
    );
  };
  const Disabled = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack spacing={2} background minHeight={100}>
          <Select
            value={value}
            onChange={setValue}
            placeholder="Choose an amount"
            label="How many would you like?"
            helperText="You can only choose one option"
            disabled
          >
            {priceOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
                selected={value === option}
              />
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
            placeholder="Choose an amount"
            label="How many would you like? "
            helperText="You only get one choice"
          >
            {priceOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                compact
                title={option}
                description="BTC"
                testID={`option-${option}`}
                selected={value === option}
              />
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
    Disabled,
  };
};

export type CreateSelectProps = {
  Select: ComponentType<SelectBaseProps>;
  Tray: ComponentType<TrayBaseProps>;
  SelectOption: ComponentType<SelectOptionBaseProps & LinkableProps>;
  ScrollView: ComponentType;
  HStack: ComponentType<BoxBaseProps & StackBaseProps>;
  VStack: ComponentType<BoxBaseProps & StackBaseProps>;
  TextInput: ComponentType<TextInputBaseProps>;
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
  HStack,
  VStack,
  TextInput,
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
          <Tray disableCapturePanGestureToDismiss title={trayTitle} onCloseComplete={toggleOff}>
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

  const SelectFilter = () => {
    const [year, setYear] = useState<string>();
    const [asset, setAsset] = useState<string>();
    const [yearTrayVisible, handleYearTrayVisibility] = useToggler(false);
    const [assetTrayVisible, handleAssetTrayVisibility] = useToggler(false);

    const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
    const assets = [
      'Bitcoin',
      'Litecoin',
      'Ethereum',
      'Algorand',
      'Cardano',
      'Doge',
      'AMP',
      'Arpa',
    ];
    return (
      <HStack width="100%" gap={1}>
        <Select
          width="48%"
          placeholder="All years"
          value={year}
          onPress={handleYearTrayVisibility.toggle}
        >
          {yearTrayVisible && (
            <Tray onCloseComplete={handleYearTrayVisibility.toggleOff}>
              {({ closeTray }) =>
                years.map((option) => {
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  const onPress = () => {
                    setYear(option);
                    closeTray();
                  };
                  return (
                    <SelectOption
                      title={option}
                      key={option}
                      onPress={onPress}
                      selected={year === option}
                    />
                  );
                })
              }
            </Tray>
          )}
        </Select>
        <Select
          width="48%"
          placeholder="All assets"
          value={asset}
          onPress={handleAssetTrayVisibility.toggle}
        >
          {assetTrayVisible && (
            <Tray onCloseComplete={handleAssetTrayVisibility.toggleOff}>
              {({ closeTray }) =>
                assets.map((option) => {
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  const onPress = () => {
                    setAsset(option);
                    closeTray();
                  };
                  return (
                    <SelectOption
                      title={option}
                      key={option}
                      onPress={onPress}
                      selected={asset === option}
                    />
                  );
                })
              }
            </Tray>
          )}
        </Select>
      </HStack>
    );
  };
  const SelectForm = () => {
    const accountTypeOptions = ['Savings Account', 'Checking Account'];

    const [accountType, setAccountType] = useState(accountTypeOptions[0]);
    const [visible, handleTrayVisibility] = useToggler(false);

    return (
      <VStack gap={2} minHeight={400} background="background">
        <TextInput label="Account number" />
        <TextInput label="Re-enter account number" />
        <Select value={accountType} onPress={handleTrayVisibility.toggle}>
          {visible && (
            <Tray onCloseComplete={handleTrayVisibility.toggleOff}>
              {({ closeTray }) =>
                accountTypeOptions.map((option) => {
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  const onPress = () => {
                    setAccountType(option);
                    closeTray();
                  };
                  return (
                    <SelectOption
                      title={option}
                      key={option}
                      onPress={onPress}
                      selected={accountType === option}
                    />
                  );
                })
              }
            </Tray>
          )}
        </Select>
      </VStack>
    );
  };

  return {
    DefaultSelect,
    ScrollableSelect,
    SelectFilter,
    SelectForm,
  };
};
