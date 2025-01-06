import React, { useRef, useState } from 'react';

import { useToggler } from '../hooks/useToggler';
import type {
  BoxBaseProps,
  DotSymbolBaseProps,
  IconBaseProps,
  RemoteImageBaseProps,
  SelectBaseProps,
  SelectOptionBaseProps,
  StackBaseProps,
  TextInputBaseProps,
  TrayBaseProps,
} from '../types';

import { AssetKey, assets } from './data/assets';
import { loremIpsum } from './data/loremIpsum';

type LinkableProps = {
  onPress?: null | ((event: unknown) => void) | undefined;
  onKeyPress?: null | ((event: unknown) => void) | undefined;
};

export type SelectOptionProps = {
  /** Prevent menu from closing when an option is selected */
  disableCloseOnOptionChange?: boolean;
} & SelectOptionBaseProps & { ref?: React.Ref<HTMLElement> } & LinkableProps;

export type SelectProps = {
  children: React.ReactNode;
  onBlur?: () => void;
  ref?: React.ForwardedRef<HTMLButtonElement>;
} & SelectBaseProps;

export type CreateSelectStoriesProps = {
  Select: React.ComponentType<React.PropsWithChildren<SelectProps>>;
  VStack: React.ComponentType<
    React.PropsWithChildren<Omit<BoxBaseProps, 'flexDirection'> & StackBaseProps>
  >;
  SelectOption: React.ComponentType<React.PropsWithChildren<SelectOptionProps>>;
  InputIcon: React.ComponentType<React.PropsWithChildren<Omit<IconBaseProps, 'size'>>>;
  DotSymbol: React.ComponentType<React.PropsWithChildren<DotSymbolBaseProps & { source: string }>>;
  RemoteImage: React.ComponentType<
    React.PropsWithChildren<RemoteImageBaseProps & { source: string }>
  >;
  Box: React.ComponentType<React.PropsWithChildren<BoxBaseProps>>;
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

export const exampleLongOptions = [
  'This is a very long text. This is a very long text. This is a very long text. ',
  'This is a long text. This is a very long text. This is a very long text. ',
  'This is a text. This is a very long text. This is a very long text. ',
];

const assetKeys = Object.keys(assets) as AssetKey[];

export const selectBuilder = ({
  Select,
  VStack,
  SelectOption,
  InputIcon,
  DotSymbol,
  RemoteImage,
  Box,
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
    width,
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
    | 'width'
  >) => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <VStack background="background" padding={2}>
        <Select
          accessibilityLabel={accessibilityLabel}
          helperText={helperText}
          label={label}
          onBlur={onBlur}
          onChange={setValue}
          onPress={onPress}
          placeholder={placeholder}
          testID={testID}
          value={value}
          variant={variant}
          width={width}
        >
          <SelectOption
            key="Disabled"
            disabled
            description="BTC"
            title="Disabled"
            value="disabled"
          />
          {exampleOptions.map((option) => (
            <SelectOption
              key={option}
              description="BTC"
              testID={`option-${option}`}
              title={option}
              value={option}
            />
          ))}
        </Select>
      </VStack>
    );
  };

  const LongTextSelect = ({
    variant,
    placeholder = 'Choose something',
    label,
    accessibilityLabel,
    testID,
    onPress,
    helperText,
    onBlur,
    width,
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
    | 'width'
  >) => {
    const [value, setValue] = useState<string | undefined>(exampleLongOptions[0]);

    return (
      <VStack background="background" padding={2}>
        <Select
          accessibilityLabel={accessibilityLabel}
          helperText={helperText}
          label={label}
          onBlur={onBlur}
          onChange={setValue}
          onPress={onPress}
          placeholder={placeholder}
          testID={testID}
          value={value}
          variant={variant}
          width={width}
        >
          {exampleLongOptions.map((option) => (
            <SelectOption
              key={option}
              description="BTC"
              testID={`option-${option}`}
              title={option}
              value={option}
            />
          ))}
        </Select>
      </VStack>
    );
  };

  const AssetSelect = () => {
    const [asset, setAsset] = useState<string | undefined>('btc');
    const assetConfig = assets[(asset as AssetKey) ?? 'btc'];
    const ethLogo = assets.eth.imageUrl;

    return (
      <VStack background="background" minHeight={100} padding={2}>
        <Select
          label="Select Asset"
          onChange={setAsset}
          startNode={
            <Box paddingX={2}>
              <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
                <RemoteImage shape="circle" size="l" source={assetConfig.imageUrl} />
              </DotSymbol>
            </Box>
          }
          value={asset}
          valueLabel={assetConfig.name}
        >
          {Object.values(assets).map(({ name, imageUrl }, idx) => (
            <SelectOption
              key={name}
              description="BTC"
              media={
                <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
                  <RemoteImage shape="circle" size="l" source={imageUrl} />
                </DotSymbol>
              }
              testID={`option-${name}`}
              title={name}
              value={assetKeys[idx]}
            />
          ))}
        </Select>
      </VStack>
    );
  };
  const InputStackOptions = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <VStack background="background" minHeight={100} padding={2}>
        <Select
          helperText="What happens when helper text gets ridiculously long? We shall find out... Bueller.. Bueller.. is the edge of my parent container present? Ugh I still have a way to go. "
          label="I am a very long label that is supposed to be indicative of what my purpose is. Do you know my purpose? Directive? Directive? Directive? "
          onChange={setValue}
          placeholder="I am some ridiculously, absurdly, ostentatiously long placeholder text that would ideally get truncated when I meet the edge of my parent container. "
          startNode={<InputIcon name="calendar" />}
          value={value}
        >
          {exampleOptions.map((option) => (
            <SelectOption
              key={option}
              description="BTC"
              testID={`option-${option}`}
              title={option}
              value={option}
            />
          ))}
        </Select>
      </VStack>
    );
  };
  const Disabled = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <VStack background="background" minHeight={100} padding={2}>
        <Select
          disabled
          helperText="You can only choose one option"
          label="How many would you like?"
          onChange={setValue}
          placeholder="Choose an amount"
          value={value}
        >
          {exampleOptions.map((option) => (
            <SelectOption
              key={option}
              description="BTC"
              testID={`option-${option}`}
              title={option}
              value={option}
            />
          ))}
        </Select>
      </VStack>
    );
  };
  const Compact = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
      <VStack background="background" minHeight={100} padding={2}>
        <Select
          compact
          helperText="You only get one choice"
          label="How many would you like? "
          onChange={setValue}
          placeholder="Choose an amount"
          value={value}
        >
          {exampleOptions.map((option) => (
            <SelectOption
              key={option}
              compact
              description="BTC"
              testID={`option-${option}`}
              title={option}
              value={option}
            />
          ))}
        </Select>
      </VStack>
    );
  };
  const Variants = () => {
    return (
      <VStack>
        <Default helperText="I am helpful text" label="I am a label" variant="foreground" />
        <Default helperText="I am helpful text" label="I am a label" variant="foregroundMuted" />
        <Default helperText="I am helpful text" label="I am a label" variant="primary" />
        <Default helperText="I am helpful text" label="I am a label" variant="positive" />
        <Default helperText="I am helpful text" label="I am a label" variant="negative" />
      </VStack>
    );
  };
  const LongText = () => {
    const [value, setValue] = useState<string | undefined>('');
    const selectRef = useRef<HTMLButtonElement>(null);

    return (
      <VStack background="background" minHeight={100} padding={2}>
        <Select ref={selectRef} onChange={setValue} placeholder="Choose an amount" value={value}>
          <SelectOption compact description="BTC" title={loremIpsum} value={loremIpsum} />
        </Select>
      </VStack>
    );
  };
  return {
    Default,
    LongTextSelect,
    AssetSelect,
    InputStackOptions,
    Compact,
    Variants,
    Disabled,
    LongText,
  };
};

type SelectOptionMobileProps = {
  onPress?: () => void;
} & Omit<SelectOptionBaseProps, 'compact'>;

export type CreateSelectProps = {
  Select: React.ComponentType<React.PropsWithChildren<SelectBaseProps>>;
  Tray: React.ComponentType<TrayBaseProps>;
  SelectOption: React.ComponentType<React.PropsWithChildren<SelectOptionMobileProps>>;
  ScrollView: React.ComponentType<React.PropsWithChildren<unknown>>;
  HStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>;
  VStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>;
  TextInput: React.ComponentType<React.PropsWithChildren<TextInputBaseProps>>;
  DotSymbol: React.ComponentType<React.PropsWithChildren<DotSymbolBaseProps & { source: string }>>;
  RemoteImage: React.ComponentType<
    React.PropsWithChildren<RemoteImageBaseProps & { source: string }>
  >;
  Box: React.ComponentType<React.PropsWithChildren<BoxBaseProps>>;
};

type DefaultSelectTypes = {
  trayTitle?: string;
  // TODO: will be fixed during API Alignment Q3 2022
  // eslint-disable-next-line react/boolean-prop-naming
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
  Box,
  RemoteImage,
  DotSymbol,
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
      <Select onChange={setValue} onPress={toggleOn} value={selectedValue} {...props}>
        {isTrayVisible && (
          <Tray
            hideHandleBar={hideHandleBar}
            onCloseComplete={toggleOff}
            testID="select-input-tray"
            title={trayTitle}
          >
            {({ handleClose }) =>
              exampleOptions.map((option) => {
                return (
                  <SelectOption
                    key={option}
                    description={hasDescription && 'Description'}
                    onPress={handleClose}
                    title={option}
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

  const LongTextSelect = ({
    trayTitle,
    hasDescription,
    hideHandleBar,
    ...props
  }: DefaultSelectTypes) => {
    const [isTrayVisible, { toggleOff, toggleOn }] = useToggler(false);
    const [selectedValue, setValue] = useState<string | undefined>(exampleLongOptions[0]);
    return (
      <Select onChange={setValue} onPress={toggleOn} value={selectedValue} {...props}>
        {isTrayVisible && (
          <Tray
            hideHandleBar={hideHandleBar}
            onCloseComplete={toggleOff}
            testID="select-input-tray"
            title={trayTitle}
          >
            {({ handleClose }) =>
              exampleLongOptions.map((option) => {
                return (
                  <SelectOption
                    key={option}
                    description={hasDescription && 'Description'}
                    onPress={handleClose}
                    title={option}
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

  const AssetSelect = () => {
    const [isTrayVisible, { toggleOn, toggleOff }] = useToggler(false);
    const [asset, setAsset] = useState<string | undefined>('btc');
    const assetConfig = assets[(asset as AssetKey) ?? 'btc'];
    const ethLogo = assets.eth.imageUrl;

    return (
      <Select
        label="Select Asset"
        onChange={setAsset}
        onPress={toggleOn}
        startNode={
          <Box paddingX={2}>
            <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
              <RemoteImage shape="circle" size="l" source={assetConfig.imageUrl} />
            </DotSymbol>
          </Box>
        }
        value={asset}
        valueLabel={assetConfig.name}
      >
        {isTrayVisible && (
          <Tray onCloseComplete={toggleOff}>
            {({ handleClose }) =>
              Object.values(assets).map(({ name, imageUrl }, idx) => (
                <SelectOption
                  key={name}
                  description="BTC"
                  media={
                    <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
                      <RemoteImage shape="circle" size="l" source={imageUrl} />
                    </DotSymbol>
                  }
                  onPress={handleClose}
                  testID={`option-${name}`}
                  title={name}
                  value={assetKeys[idx]}
                />
              ))
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
      <Select onChange={setValue} onPress={toggleOn} value={selectedValue} {...props}>
        {isTrayVisible && (
          <Tray disableCapturePanGestureToDismiss onCloseComplete={toggleOff} title={trayTitle}>
            {({ handleClose }) => (
              <ScrollView>
                {exampleOptions.map((option) => {
                  return (
                    <SelectOption
                      key={option}
                      description={hasDescription && 'Description'}
                      onPress={handleClose}
                      title={option}
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

    return (
      <HStack gap={1} width="100%">
        <Select
          onChange={setYear}
          onPress={handleYearTrayVisibility.toggle}
          placeholder="All years"
          value={year}
          width="48%"
        >
          {yearTrayVisible && (
            <Tray onCloseComplete={handleYearTrayVisibility.toggleOff}>
              {({ handleClose }) =>
                years.map((option) => {
                  return (
                    <SelectOption
                      key={option}
                      onPress={handleClose}
                      title={option}
                      value={option}
                    />
                  );
                })
              }
            </Tray>
          )}
        </Select>
        <Select
          onChange={setAsset}
          onPress={handleAssetTrayVisibility.toggle}
          placeholder="All assets"
          value={asset}
          width="48%"
        >
          {assetTrayVisible && (
            <Tray onCloseComplete={handleAssetTrayVisibility.toggleOff}>
              {({ handleClose }) =>
                Object.values(assets).map(({ name: option }) => {
                  return (
                    <SelectOption
                      key={option}
                      onPress={handleClose}
                      title={option}
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
      <VStack background="background" gap={2} minHeight={400}>
        <TextInput label="Account number" />
        <TextInput label="Re-enter account number" />
        <Select
          accessibilityHint="Enter account number"
          accessibilityLabel="Account number"
          onChange={setAccountType}
          onPress={handleTrayVisibility.toggle}
          value={accountType}
        >
          {visible && (
            <Tray onCloseComplete={handleTrayVisibility.toggleOff}>
              {({ handleClose }) =>
                accountTypeOptions.map((option) => {
                  return (
                    <SelectOption
                      key={option}
                      onPress={handleClose}
                      title={option}
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
    LongTextSelect,
    AssetSelect,
    ScrollableSelect,
    SelectFilter,
    SelectForm,
  };
};
