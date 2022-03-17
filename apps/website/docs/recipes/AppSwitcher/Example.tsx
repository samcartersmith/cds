import { memo, useCallback } from 'react';
import { IllustrationPictogramNames, NoopFn as NoopFnType, useToggler } from '@cbhq/cds-common';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { NavigationIconButton } from '@cbhq/cds-web/buttons/NavigationIconButton';
import { TileButton } from '@cbhq/cds-web/buttons/TileButton';
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Switcher } from '@cbhq/cds-web/navigation/Switcher';
import { SectionTitle } from '@cbhq/cds-web/overlays/PopoverMenu/SectionTitle';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system/FeatureFlagProvider';
import { getZIndexFromRow } from '@cbhq/cds-web/utils/overflow';

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

type AppSwitcherContentSectionProps = {
  columns: number;
  data: AppSwitcherSection;
};

const AppSwitcherContentSection = memo(({ columns, data }: AppSwitcherContentSectionProps) => {
  const { tiles, sectionTitle } = data;
  const rows = Math.ceil(tiles.length / columns);
  return (
    <VStack spacingHorizontal={2}>
      <SectionTitle text={sectionTitle} />
      {[...Array<number>(rows)].map((_, row) => {
        return (
          <HStack gap={0.5}>
            {tiles
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
    </VStack>
  );
});

type AppSwitcherContentProps = {
  columns?: number;
  data?: AppSwitcherData;
};

const AppSwitcherContent = memo(
  ({ columns = 3, data = appSwitcherData }: AppSwitcherContentProps) => {
    const { sections } = data;
    return (
      <>
        {sections.map((section, idx) => {
          return (
            <>
              <AppSwitcherContentSection data={section} columns={columns} />
              {idx < sections.length - 1 ? <Divider spacingVertical={1} /> : null}
            </>
          );
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

export const AppSwitcherExample = () => {
  return (
    <FeatureFlagProvider frontierColor frontierButton>
      <PortalProvider>
        <VStack
          alignItems="center"
          justifyContent="center"
          spacingVertical={4}
          bordered
          borderRadius="standard"
        >
          <AppSwitcherRecipe>
            <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
          </AppSwitcherRecipe>
        </VStack>
      </PortalProvider>
    </FeatureFlagProvider>
  );
};
