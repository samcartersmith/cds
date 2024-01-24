import React, { memo, ReactNode, useMemo } from 'react';
import { useSpectrum } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { densePictogramSize, pictogramSize } from '@cbhq/cds-common/tokens/tile';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { TileButton, TileButtonProps } from '../buttons/TileButton';
import { Divider, HStack, VStack } from '../layout';
import { RemoteImage } from '../media';
import { ThemeProvider } from '../system';
import { TextLabel1 } from '../typography';
import { getZIndexFromRow } from '../utils/overflow';

export const appSwitcherData: AppSwitcherData = {
  sections: [
    {
      sectionTitle: 'For Individuals',
      tiles: [
        { pictogram: 'cardNavigation', title: 'Card', onPress: NoopFn },
        { pictogram: 'earnNavigation', title: 'Earn', onPress: NoopFn },
        { pictogram: 'walletNavigation', title: 'Wallet', onPress: NoopFn, count: 9 },
        { pictogram: 'proNavigation', title: 'Pro', onPress: NoopFn },
        {
          pictogram: 'privateClientNavigation',
          title: 'Private Client',
          onPress: NoopFn,
          count: 4,
        },
      ],
    },
    {
      sectionTitle: 'For Businesses',
      tiles: [
        { pictogram: 'primeNavigation', title: 'Prime', onPress: NoopFn, count: 10 },
        { pictogram: 'commerceNavigation', title: 'Commerce', onPress: NoopFn },
        { pictogram: 'exchangeNavigation', title: 'Exchange', onPress: NoopFn },

        { pictogram: 'assetHubNavigation', title: 'Asset Hub', onPress: NoopFn, count: 2 },
        { pictogram: 'custodyNavigation', title: 'Custody', onPress: NoopFn, count: 999 },
        { pictogram: 'analyticsNavigation', title: 'Analytics', onPress: NoopFn },

        { pictogram: 'venturesNavigation', title: 'Ventures', onPress: NoopFn },
        { pictogram: 'institutionalNavigation', title: 'Institutional', onPress: NoopFn },
      ],
    },
  ],
};

type AppSwitcherSection = {
  sectionTitle: string;
  tiles: TileButtonProps[];
};

type AppSwitcherData = {
  sections: AppSwitcherSection[];
};

type AppSwitcherContentSectionProps = {
  columns: number;
  data: AppSwitcherSection;
};

const AppSwitcherContentSection = memo(({ columns, data }: AppSwitcherContentSectionProps) => {
  const theme = useSpectrum();
  const isDense = useScaleDensity() === 'dense';
  const rows = Math.ceil(data.tiles.length / columns);
  // this creates a key for each row
  const rowsArr = Array.from(Array(rows), (_, i) => i + 1);
  const computedPictogramSize = useMemo(
    () => (isDense ? densePictogramSize : pictogramSize),
    [isDense],
  );
  return (
    <VStack spacingHorizontal={2}>
      <HStack spacingHorizontal={2} spacingVertical={2}>
        <TextLabel1 as="p" color="foregroundMuted">
          {data.sectionTitle}
        </TextLabel1>
      </HStack>
      {rowsArr.map((_, row) => {
        return (
          <HStack key={_} gap={0.5}>
            {data.tiles
              // We are able to infer the interval because we know how big dataset is + what row we are on.
              .slice(row * columns, row * columns + columns)
              .map((props) => {
                return (
                  <HStack
                    key={props.title}
                    gap={0.5}
                    spacingBottom={0.5}
                    zIndex={getZIndexFromRow(row, rows)}
                  >
                    <TileButton {...props}>
                      <RemoteImage
                        height={computedPictogramSize}
                        source={`https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/${theme}/${props.pictogram}-2.svg`}
                        width={computedPictogramSize}
                      />
                    </TileButton>
                  </HStack>
                );
              })}
          </HStack>
        );
      })}
    </VStack>
  );
});

type AppSwitcherContentProps = {
  columns?: number;
  data?: AppSwitcherData;
  header?: ReactNode;
};

export const AppSwitcherContent = memo(
  ({ columns = 3, data = appSwitcherData, header }: AppSwitcherContentProps) => {
    return (
      <ThemeProvider>
        <VStack gap={1} spacingVertical={2}>
          {header != null && (
            <VStack alignContent="center" alignItems="center" gap={2}>
              {header}
              <Divider />
            </VStack>
          )}
          {data.sections.map((section, idx) => {
            return (
              <>
                <AppSwitcherContentSection
                  key={section.sectionTitle}
                  columns={columns}
                  data={section}
                />
                {data.sections.length - 1 !== idx && <Divider spacingVertical={1} />}
              </>
            );
          })}
        </VStack>
      </ThemeProvider>
    );
  },
);
