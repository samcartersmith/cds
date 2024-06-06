import { useState } from 'react';
import { DateInputValidationError } from '@cbhq/cds-common/dates/DateInputValidationError';

import { Box } from '../../layout/Box';
import { Group } from '../../layout/Group';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextTitle1 } from '../../typography';
import { Calendar } from '../Calendar';
import { DateInput } from '../DateInput';
import { DatePicker } from '../DatePicker';

export default {
  title: 'Core Components/Dates/A11yTest',
  component: Calendar,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false },
          {
            id: 'aria-required-children',
            enabled: false,
          },
        ],
      },
    },
  },
};

const today = new Date(new Date().setHours(0, 0, 0, 0));
const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const oneWeekLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const lastMonth15th = new Date(today.getFullYear(), today.getMonth() - 1, 15);

const dateInputSharedProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
  label: 'Birthdate',
  calendarIconButtonAccessibilityLabel: 'Birthdate calendar',
  helperTextErrorIconAccessibilityLabel: 'Error',
};

const calendarSharedProps = {
  disabledDateError: 'Date unavailable',
  maxDate: nextMonth15th,
  minDate: lastMonth15th,
  disabledDates: [[oneWeekAgo, twoDaysAgo] as [Date, Date], oneWeekLater],
  highlightedDates: [[oneWeekAgo, twoDaysAgo] as [Date, Date], oneWeekLater],
  nextArrowAccessibilityLabel: 'Next month',
  previousArrowAccessibilityLabel: 'Previous month',
};

const datePickerSharedProps = {
  label: 'Birthdate',
  calendarIconButtonAccessibilityLabel: 'Birthdate calendar',
  helperTextErrorIconAccessibilityLabel: 'Error',
  nextArrowAccessibilityLabel: 'Next month',
  previousArrowAccessibilityLabel: 'Previous month',
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

export const A11yTest = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const [error2, setError2] = useState<DateInputValidationError | null>(
    new DateInputValidationError('custom', 'This is a custom error'),
  );
  const stateProps = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <>
      <ThemeProvider spectrum="light">
        <Group background gap={8} offset={2} spacing={2}>
          <TextTitle1 as="span">DateInput</TextTitle1>
          <DateInput {...dateInputSharedProps} {...stateProps} />
          <DateInput disabled {...dateInputSharedProps} {...stateProps} />
          <DateInput
            {...dateInputSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <TextTitle1 as="span">Calendar</TextTitle1>
          <Calendar selectedDate={date} {...calendarSharedProps} />
          <Calendar disabled selectedDate={date} {...calendarSharedProps} />
          <TextTitle1 as="span">DatePicker</TextTitle1>
          <DatePicker {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} />
          <DatePicker
            disabled
            {...datePickerSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <DatePicker defaultOpen {...datePickerSharedProps} {...stateProps} />
        </Group>
      </ThemeProvider>
      <Box spacingTop={8} />
      <ThemeProvider spectrum="dark">
        <Group background gap={8} offset={2} spacing={2}>
          <TextTitle1 as="span">DateInput</TextTitle1>
          <DateInput {...dateInputSharedProps} {...stateProps} />
          <DateInput disabled {...dateInputSharedProps} {...stateProps} />
          <DateInput
            {...dateInputSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <TextTitle1 as="span">Calendar</TextTitle1>
          <Calendar selectedDate={date} {...calendarSharedProps} />
          <Calendar disabled selectedDate={date} {...calendarSharedProps} />
          <TextTitle1 as="span">DatePicker</TextTitle1>
          <DatePicker {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} />
          <DatePicker
            disabled
            {...datePickerSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <DatePicker defaultOpen {...datePickerSharedProps} {...stateProps} />
        </Group>
      </ThemeProvider>
    </>
  );
};
