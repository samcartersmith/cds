import { memo, useMemo } from 'react';
import Calendar, { CalendarEvent } from '@theme/Calendar';
import dayjs, { Dayjs, PluginFunc } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import dayjsRecur from 'dayjs-recur';
import increment from 'semver/functions/inc';
import { useToggler } from '@cbhq/cds-common';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { OnPress, Pressable } from '@cbhq/cds-web/system';
import { palette } from '@cbhq/cds-web/tokens';
import { TextLabel1, TextTitle1 } from '@cbhq/cds-web/typography';

type DayjsRecur = Dayjs & {
  recur: (start: string, end: string) => DayjsRecur;
  every: (val: number) => DayjsRecur;
  days: () => DayjsRecur;
  all: () => Dayjs[];
};

const dayjsRecurrence = dayjs.extend(dayjsRecur as PluginFunc<DayjsRecur>) as DayjsRecur;
dayjs.extend(isBetween);

type EventType = 'beta' | 'asset' | 'freeze';
type CustomCalendarEvent = CalendarEvent & { type?: EventType };

type FilterProps = {
  label: string;
  checked?: boolean;
  onPress: OnPress;
};

function createEventForRange({
  summary,
  color,
  start,
  duration,
  type,
}: {
  summary: string;
  color: string;
  start: string;
  /** Duration in days */
  duration: number;
  type: EventType;
}) {
  const startDate = dayjs(start);
  const startIso = startDate.toISOString();
  const endDate = startDate.add(duration, 'days');
  const endIso = endDate.toISOString();
  return {
    id: `${type}-${startIso}-${endIso}`,
    start: startIso,
    end: endIso,
    summary,
    type,
    color,
  };
}

function excludeType(type: EventType) {
  return function filter(item: CustomCalendarEvent) {
    return item?.type !== type;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function noopFilter(item: CustomCalendarEvent) {
  return true;
}

const Filter = memo(function Filter({ label, checked, onPress }: FilterProps) {
  return (
    <Pressable
      backgroundColor="background"
      borderColor="line"
      borderRadius="roundedSmall"
      transparentWhileInactive
      onPress={onPress}
      width="fit-content"
    >
      <HStack gap={1} alignItems="center" spacing={1}>
        <TextLabel1 as="p" color={checked ? 'foreground' : 'foregroundMuted'}>
          {label}
        </TextLabel1>
        <Icon
          name={checked ? 'checkboxChecked' : 'checkboxEmpty'}
          size="s"
          color={checked ? 'foreground' : 'foregroundMuted'}
        />
      </HStack>
    </Pressable>
  );
});

const ReleaseCalendar = memo(function ReleaseCalendar() {
  const [showBeta, { toggle: toggleBeta }] = useToggler(false);
  const [showAssets, { toggle: toggleAssets }] = useToggler(false);
  const [showFreezes, { toggle: toggleFreezes }] = useToggler(true);

  const events = useMemo(() => {
    let prodVersion = '0.43.0';
    const prodVersions: string[] = [];
    let betaVersion = '1.0.0';
    const betaVersions: string[] = [];

    const codeFreezes = [
      createEventForRange({
        start: '06/30/2022',
        duration: 11,
        type: 'freeze',
        summary: 'Code freeze',
        color: palette.backgroundOverlay,
      }),
      createEventForRange({
        start: '09/26/2022',
        duration: 4,
        type: 'freeze',
        summary: 'Code freeze',
        color: palette.backgroundOverlay,
      }),
    ];

    const releases = dayjsRecurrence
      .recur('06/22/2022', '06/01/2023')
      .every(7)
      .days()
      .all()
      .filter((item) => {
        const betweenChecks = codeFreezes.map((freeze) => {
          const asIso = item.toISOString();
          return dayjs(asIso).isBetween(freeze.start, freeze.end, 'day', '[]');
        });
        return betweenChecks.filter(Boolean).length === 0;
      })
      .reduce((prev, date, index) => {
        // Every other release is production
        const isProd = index % 2 === 0;
        const startAssetRelease = date.hour(12 + 3).toISOString();
        const startRelease = date.hour(12 + 4).toISOString();
        const endRelease = date.hour(12 + 5).toISOString();
        const isFirstRelease = index === 0;

        const assetVersion = increment(prodVersion, 'patch') ?? prodVersion;

        if (isProd) {
          prodVersion = isFirstRelease ? '1.0.0' : (increment(prodVersion, 'minor') as string);
          prodVersions.push(prodVersion);
        } else {
          betaVersion = increment(betaVersion, 'minor') as string;
          betaVersions.push(betaVersion);
        }

        const version = isProd ? prodVersion : betaVersion;

        return [
          ...prev,
          isFirstRelease
            ? null
            : {
                id: `asset-${assetVersion}`,
                start: startAssetRelease,
                end: startRelease,
                summary: isProd ? `🔀 Illustration @ ${assetVersion}` : `🔀 Icon @ ${assetVersion}`,
                type: 'asset',
              },
          {
            id: `release-${version}`,
            start: startRelease,
            summary: isProd ? `🚀 Production @ ${version}` : `🍞 Beta @ ${version}`,
            end: endRelease,
            type: isProd ? undefined : 'beta',
          },
        ].filter(Boolean) as CustomCalendarEvent[];
      }, [] as CustomCalendarEvent[]);

    return [...codeFreezes, ...releases];
  }, []);

  const filteredEvents = useMemo(() => {
    return events
      .filter(showBeta ? noopFilter : excludeType('beta'))
      .filter(showAssets ? noopFilter : excludeType('asset'))
      .filter(showFreezes ? noopFilter : excludeType('freeze'));
  }, [events, showAssets, showBeta, showFreezes]);

  return (
    <VStack justifyContent="flex-end" gap={3} bordered>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        borderedBottom
        spacingVertical={1}
        spacingHorizontal={2}
      >
        <TextTitle1 as="h2">Schedule</TextTitle1>
        <VStack alignItems="flex-end">
          <Filter label="Show Beta releases" checked={showBeta} onPress={toggleBeta} />
          <Filter
            label="Show Icon/Illustration releases"
            checked={showAssets}
            onPress={toggleAssets}
          />
          <Filter label="Show code freezes" checked={showFreezes} onPress={toggleFreezes} />
        </VStack>
      </HStack>
      <Calendar initialDate={events[0].start} events={filteredEvents} />
    </VStack>
  );
});

export default ReleaseCalendar;
