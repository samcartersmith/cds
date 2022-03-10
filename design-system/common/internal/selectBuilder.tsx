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

type SelectOptionProps = SelectOptionBaseProps & Pick<MenuItemProps, 'value' | 'key'>;

export type SelectProps = {
  children: ReactElement<MenuItemProps>[];
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

export const exampleOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
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
            {exampleOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
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
            {exampleOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
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
            {exampleOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                title={option}
                description="BTC"
                testID={`option-${option}`}
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
            {exampleOptions.map((option) => (
              <SelectOption
                value={option}
                key={option}
                compact
                title={option}
                description="BTC"
                testID={`option-${option}`}
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

type SelectOptionMobileProps = {
  onPress?: NoopFn;
} & Omit<SelectOptionBaseProps, 'compact'>;

export type CreateSelectProps = {
  Select: ComponentType<SelectBaseProps>;
  Tray: ComponentType<TrayBaseProps>;
  SelectOption: ComponentType<SelectOptionMobileProps>;
  ScrollView: ComponentType;
  HStack: ComponentType<BoxBaseProps & StackBaseProps>;
  VStack: ComponentType<BoxBaseProps & StackBaseProps>;
  TextInput: ComponentType<TextInputBaseProps>;
};

type DefaultSelectTypes = {
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
    trayTitle,
    hasDescription,
    hideHandleBar,
    ...props
  }: DefaultSelectTypes) => {
    const [isTrayVisible, { toggleOff, toggleOn }] = useToggler(false);
    const [selectedValue, setValue] = useState<string | undefined>();
    return (
      <Select value={selectedValue} onPress={toggleOn} onChange={setValue} {...props}>
        {isTrayVisible && (
          <Tray
            title={trayTitle}
            onCloseComplete={toggleOff}
            hideHandleBar={hideHandleBar}
            testID="select-input-tray"
          >
            {({ handleClose }) =>
              exampleOptions.map((option) => {
                return (
                  <SelectOption
                    title={option}
                    key={option}
                    description={hasDescription && 'Description'}
                    onPress={handleClose}
                    value={option}
                  />
                );
              })
            }
          </Tray>
        )}
      </Select>
    );
  };

  const ScrollableSelect = ({ trayTitle, hasDescription, ...props }: DefaultSelectTypes) => {
    const [isTrayVisible, { toggleOn, toggleOff }] = useToggler(false);
    const [selectedValue, setValue] = useState<string | undefined>(exampleOptions[2]);
    return (
      <Select value={selectedValue} onPress={toggleOn} onChange={setValue} {...props}>
        {isTrayVisible && (
          <Tray disableCapturePanGestureToDismiss title={trayTitle} onCloseComplete={toggleOff}>
            {({ handleClose }) => (
              <ScrollView>
                {exampleOptions.map((option) => {
                  return (
                    <SelectOption
                      title={option}
                      key={option}
                      description={hasDescription && 'Description'}
                      onPress={handleClose}
                      value={option}
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
    const [year, setYear] = useState<string | undefined>();
    const [asset, setAsset] = useState<string | undefined>();
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
          onChange={setYear}
        >
          {yearTrayVisible && (
            <Tray onCloseComplete={handleYearTrayVisibility.toggleOff}>
              {({ handleClose }) =>
                years.map((option) => {
                  return (
                    <SelectOption
                      title={option}
                      key={option}
                      onPress={handleClose}
                      value={option}
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
          onChange={setAsset}
        >
          {assetTrayVisible && (
            <Tray onCloseComplete={handleAssetTrayVisibility.toggleOff}>
              {({ handleClose }) =>
                assets.map((option) => {
                  return (
                    <SelectOption
                      title={option}
                      key={option}
                      onPress={handleClose}
                      value={option}
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

    const [accountType, setAccountType] = useState<string | undefined>(accountTypeOptions[0]);
    const [visible, handleTrayVisibility] = useToggler(false);

    return (
      <VStack gap={2} minHeight={400} background="background">
        <TextInput label="Account number" />
        <TextInput label="Re-enter account number" />
        <Select value={accountType} onPress={handleTrayVisibility.toggle} onChange={setAccountType}>
          {visible && (
            <Tray onCloseComplete={handleTrayVisibility.toggleOff}>
              {({ handleClose }) =>
                accountTypeOptions.map((option) => {
                  return (
                    <SelectOption
                      title={option}
                      key={option}
                      onPress={handleClose}
                      value={option}
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
