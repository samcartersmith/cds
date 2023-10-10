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
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      spacingHorizontal={2}
      spacingBottom={2}
    >
      <IconButton name="caretLeft" variant="secondary" compact onPress={onPrevMonth} />
      <HStack gap={0.5}>
        <TextTitle2 as="h3">{`${month} - ${year}`}</TextTitle2>
        {isCurrentMonth ? <Icon name="dot" color="primary" size="xs" /> : null}
      </HStack>
      <IconButton name="caretRight" variant="secondary" compact onPress={onNextMonth} />
    </HStack>
  );
});

const componentOverrides: CalendarProps['schedulelyComponents'] = {
  headerComponent: CalendarHeader,
};

const Calendar = memo(function Calendar(props: CalendarProps) {
  return <Schedulely theme="minimal" schedulelyComponents={componentOverrides} {...props} />;
});

export default Calendar;
