import React, { useCallback, useState } from 'react';

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
    const [isTrayVisible, setIsTrayVisible] = useState(false);
    const [selectedValue, setValue] = useState<string | undefined>();
    const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
    const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);

    return (
      <Select onChange={setValue} onPress={setIsTrayVisibleOn} value={selectedValue} {...props}>
        {isTrayVisible && (
          <Tray
            hideHandleBar={hideHandleBar}
            onCloseComplete={setIsTrayVisibleOff}
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
    const [isTrayVisible, setIsTrayVisible] = useState(false);
    const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
    const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);

    const [selectedValue, setValue] = useState<string | undefined>(exampleLongOptions[0]);
    return (
      <Select onChange={setValue} onPress={setIsTrayVisibleOn} value={selectedValue} {...props}>
        {isTrayVisible && (
          <Tray
            hideHandleBar={hideHandleBar}
            onCloseComplete={setIsTrayVisibleOff}
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
    const [isTrayVisible, setIsTrayVisible] = useState(false);
    const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
    const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);

    const [asset, setAsset] = useState<string | undefined>('btc');
    const assetConfig = assets[(asset as AssetKey) ?? 'btc'];
    const ethLogo = assets.eth.imageUrl;

    return (
      <Select
        label="Select Asset"
        onChange={setAsset}
        onPress={setIsTrayVisibleOn}
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
          <Tray onCloseComplete={setIsTrayVisibleOff}>
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
    const [isTrayVisible, setIsTrayVisible] = useState(false);
    const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
    const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);

    const [selectedValue, setValue] = useState<string | undefined>(exampleOptions[2]);
    return (
      <Select onChange={setValue} onPress={setIsTrayVisibleOn} value={selectedValue} {...props}>
        {isTrayVisible && (
          <Tray
            disableCapturePanGestureToDismiss
            onCloseComplete={setIsTrayVisibleOff}
            title={trayTitle}
          >
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

    const [yearTrayVisible, setYearTrayVisible] = useState(false);
    const toggleYearTrayVisible = useCallback(
      () => setYearTrayVisible((prev) => !prev),
      [setYearTrayVisible],
    );
    const setYearTrayVisibleOff = useCallback(
      () => setYearTrayVisible(false),
      [setYearTrayVisible],
    );
    const [assetTrayVisible, setAssetTrayVisible] = useState(false);
    const toggleAssetTrayVisible = useCallback(
      () => setAssetTrayVisible((prev) => !prev),
      [setAssetTrayVisible],
    );
    const setAssetTrayVisibleOff = useCallback(
      () => setAssetTrayVisible(false),
      [setAssetTrayVisible],
    );

    const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];

    return (
      <HStack gap={1} width="100%">
        <Select
          onChange={setYear}
          onPress={toggleYearTrayVisible}
          placeholder="All years"
          value={year}
          width="48%"
        >
          {yearTrayVisible && (
            <Tray onCloseComplete={setYearTrayVisibleOff}>
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
          onPress={toggleAssetTrayVisible}
          placeholder="All assets"
          value={asset}
          width="48%"
        >
          {assetTrayVisible && (
            <Tray onCloseComplete={setAssetTrayVisibleOff}>
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
    const [visible, setVisible] = useState(false);
    const toggleVisible = useCallback(() => setVisible((prev) => !prev), [setVisible]);
    const setVisibleOff = useCallback(() => setVisible(false), [setVisible]);

    return (
      <VStack background="bg" gap={2} minHeight={400}>
        <TextInput label="Account number" />
        <TextInput label="Re-enter account number" />
        <Select
          accessibilityHint="Enter account number"
          accessibilityLabel="Account number"
          onChange={setAccountType}
          onPress={toggleVisible}
          value={accountType}
        >
          {visible && (
            <Tray onCloseComplete={setVisibleOff}>
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
