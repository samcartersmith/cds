import { memo, useCallback } from 'react';
import { IllustrationPictogramNames, NoopFn as NoopFnType, useToggler } from '@cbhq/cds-common';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { getZIndexFromRow } from '@cbhq/cds-web/utils/overflow';

import { NavigationIconButton } from '../buttons/NavigationIconButton';
import { TileButton } from '../buttons/TileButton';
import { DotCount } from '../dots/DotCount';
import { HStack } from '../layout';
import { SectionTitle } from '../overlays/PopoverMenu/SectionTitle';

import { Switcher } from './Switcher';

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

const appSwitcherData: AppSwitcherData = {
  sections: [
    {
      sectionTitle: 'For Individuals',
      tiles: [
        { pictogram: 'cardNavigation', title: 'Card', onPress: NoopFn },
        { pictogram: 'earnNavigation', title: 'Earn ksdjfkasdbakdjbfaskdjfbds', onPress: NoopFn },
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

type AppSwitcherContentSectionProps = {
  columns: number;
  data: AppSwitcherSection;
};

const AppSwitcherContentSection = memo(({ columns, data }: AppSwitcherContentSectionProps) => {
  const rows = Math.ceil(data.tiles.length / columns);
  return (
    <>
      <SectionTitle text={data.sectionTitle} />
      {[...Array<number>(rows)].map((_, row) => {
        return (
          <HStack gap={0.5}>
            {data.tiles
              // We are able to infer the interval because we know how big dataset is + what row we are on.
              .slice(row * columns, row * columns + columns)
              .map((props) => {
                return (
                  <HStack zIndex={getZIndexFromRow(row, rows)}>
                    <TileButton {...props} />
                  </HStack>
                );
              })}
          </HStack>
        );
      })}
    </>
  );
});

type AppSwitcherContentProps = {
  columns?: number;
  data?: AppSwitcherData;
};

const AppSwitcherContent = memo(
  ({ columns = 3, data = appSwitcherData }: AppSwitcherContentProps) => {
    return (
      <>
        {data.sections.map((section) => {
          return <AppSwitcherContentSection data={section} columns={columns} />;
        })}
      </>
    );
  },
);

/** This is the component that Identity will likely encapsulate themselves. */
const AppSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  const [visible, toggleVisibility] = useToggler(false);
  const handleSubjectPress = useCallback(() => {
    toggleVisibility.toggle();
  }, [toggleVisibility]);

  const handleClose = useCallback(() => {
    toggleVisibility.toggleOff();
  }, [toggleVisibility]);
  return (
    <Switcher
      onPressSubject={handleSubjectPress}
      onClose={handleClose}
      visible={visible}
      content={<AppSwitcherContent />}
    >
      {children}
    </Switcher>
  );
});

export const AppSwitcher = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
      </AppSwitcherRecipe>
    </HStack>
  );
};

export const AppSwitcherWithDot = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <DotCount pin="top-end" count={4}>
          <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
        </DotCount>
      </AppSwitcherRecipe>
    </HStack>
  );
};

export default {
  title: 'Core Components/Switchers/AppSwitcher',
  component: AppSwitcher,
};
