import React, { memo } from 'react';
import type { CalendarProps } from '@theme/Calendar';
import { HeaderProps, Schedulely } from 'schedulely';
import { IconButton } from '@cbhq/cds-web/buttons';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack } from '@cbhq/cds-web/layout';
import { TextTitle2 } from '@cbhq/cds-web/typography';

const CalendarHeader = memo(function CalendarHeader({
  month,
  year,
  isCurrentMonth,
  onPrevMonth,
  onNextMonth,
}: HeaderProps) {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      spacingBottom={2}
      spacingHorizontal={2}
      width="100%"
    >
      <IconButton compact name="caretLeft" onPress={onPrevMonth} variant="secondary" />
      <HStack gap={0.5}>
        <TextTitle2 as="h3">{`${month} - ${year}`}</TextTitle2>
        {isCurrentMonth ? <Icon color="primary" name="dot" size="xs" /> : null}
      </HStack>
      <IconButton compact name="caretRight" onPress={onNextMonth} variant="secondary" />
    </HStack>
  );
});

const componentOverrides: CalendarProps['schedulelyComponents'] = {
  headerComponent: CalendarHeader,
};

const Calendar = memo(function Calendar(props: CalendarProps) {
  return <Schedulely schedulelyComponents={componentOverrides} theme="minimal" {...props} />;
});

export default Calendar;
