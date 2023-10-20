import { memo } from 'react';
import { IllustrationPictogramNames, NoopFn as NoopFnType } from '@cbhq/cds-common';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { TileButton } from '../buttons/TileButton';
import { Divider, HStack, VStack } from '../layout';
import { TextCaption } from '../typography/TextCaption';
import { getZIndexFromRow } from '../utils/overflow';

const appSwitcherData: AppSwitcherData = {
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
  tiles: {
    pictogram: IllustrationPictogramNames;
    title: string;
    onPress: NoopFnType;
    count?: number;
  }[];
};

type AppSwitcherData = {
  sections: AppSwitcherSection[];
};

type AppSwitcherContentSectionProps = {
  columns: number;
  data: AppSwitcherSection;
};

const AppSwitcherContentSection = memo(({ columns, data }: AppSwitcherContentSectionProps) => {
  const rows = Math.ceil(data.tiles.length / columns);
  // this creates a key for each row
  const rowsArr = Array.from(Array(rows), (_, i) => i + 1);
  return (
    <VStack spacingHorizontal={2}>
      <HStack spacingHorizontal={2} spacingVertical={2}>
        <TextCaption as="h2" color="foregroundMuted">
          {data.sectionTitle}
        </TextCaption>
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
                    <TileButton {...props} />
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
};

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const AppSwitcherContent = memo(
  ({ columns = 3, data = appSwitcherData }: AppSwitcherContentProps) => {
    return (
      <VStack spacingVertical={2}>
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
    );
  },
);
