import { memo, useMemo } from 'react';
import Calendar, { CalendarEvent } from '@theme/Calendar';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import { useToggler } from '@cbhq/cds-common';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { OnPress, Pressable } from '@cbhq/cds-web/system';
import { palette } from '@cbhq/cds-web/tokens';
import { TextLabel1, TextTitle1 } from '@cbhq/cds-web/typography';

dayjs.extend(weekday);
dayjs.extend(customParseFormat);

type EventType = 'beta' | 'asset' | 'freeze';
type CustomCalendarEvent = CalendarEvent & { type?: EventType };

type FilterProps = {
  label: string;
  checked?: boolean;
  onPress: OnPress;
};

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

const getFirstWednesday = (date: dayjs.Dayjs) => {
  const dateOfFirstOfTheMonth = date.startOf('month').day();

  // if first day of the month is >= 3 (Thursday - 4, Friday - 5, Saturday 6), then we need to go to the start of next week
  const firstWednesday =
    dateOfFirstOfTheMonth <= 3
      ? date.startOf('month').weekday(3)
      : date.startOf('month').add(1, 'week').weekday(3);

  return firstWednesday;
};

const ReleaseCalendar = memo(function ReleaseCalendar() {
  const [showAssets, { toggle: toggleAssets }] = useToggler(true);
  // Get the current date
  const currentDate = dayjs();

  const events = useMemo(() => {
    // Create an array to store the event dates
    const eventDates = [];

    // Loop through the next 12 months and find the first Wednesday of each month
    for (let i = 0; i < 12; i += 1) {
      // create CustomCalendarEvent using the firstWednesday date
      const month = currentDate.month(i);
      const firstWednesday = getFirstWednesday(month).toISOString();

      const illustrationEvent = {
        id: `asset-${i}`,
        start: firstWednesday,
        end: firstWednesday,
        summary: '🔀 Illustration',
        type: 'asset',
        color: palette.backgroundOverlay,
      };

      const iconEvent = {
        id: `asset-${i}`,
        start: firstWednesday,
        end: firstWednesday,
        summary: '🔀 Icons',
        type: 'asset',
        color: palette.backgroundOverlay,
      };

      const packageRelease = {
        id: `asset-${i}`,
        start: firstWednesday,
        end: firstWednesday,
        summary: '🚀 CDS Packages',
        color: palette.backgroundOverlay,
      };

      const adoptionTracker = {
        id: `asset-${i}`,
        start: firstWednesday,
        end: firstWednesday,
        summary: '🚀 Adoption Tracker',
        color: palette.backgroundOverlay,
      };

      eventDates.push(illustrationEvent, iconEvent, packageRelease, adoptionTracker);
    }

    return eventDates as CustomCalendarEvent[];
  }, [currentDate]);

  const filteredEvents = useMemo(() => {
    return events.filter(showAssets ? noopFilter : excludeType('asset'));
  }, [events, showAssets]);

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
          <Filter
            label="Show Icon/Illustration releases"
            checked={showAssets}
            onPress={toggleAssets}
          />
        </VStack>
      </HStack>
      <Calendar initialDate={currentDate.toISOString()} events={filteredEvents} />
    </VStack>
  );
});

export default ReleaseCalendar;
