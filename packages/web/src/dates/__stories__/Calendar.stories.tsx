import { useState } from 'react';

import { Box } from '../../layout/Box';
import { Group } from '../../layout/Group';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Calendar } from '../Calendar';

import { Note } from './Note';

export default {
  title: 'Core Components/Dates/Calendar',
  component: Calendar,
};

const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const oneWeekLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const lastMonth15th = new Date(today.getFullYear(), today.getMonth() - 1, 15);

const exampleProps = {
  maxDate: nextMonth15th,
  minDate: lastMonth15th,
  disabledDateError: 'Date unavailable',
};

export const Examples = () => {
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);
  const [selectedDate3, setSelectedDate3] = useState<Date | null>(null);
  return (
    <Group gap={8}>
      <VStack>
        <Note>Calendar</Note>
        <Calendar {...exampleProps} onPressDate={setSelectedDate1} selectedDate={selectedDate1} />
      </VStack>
      <VStack>
        <Note>Calendar dark mode</Note>
        <ThemeProvider spectrum="dark">
          <Calendar {...exampleProps} onPressDate={setSelectedDate2} selectedDate={selectedDate2} />
        </ThemeProvider>
      </VStack>
      <VStack>
        <Note>Calendar xSmall scale</Note>
        <ThemeProvider scale="xSmall">
          <Calendar {...exampleProps} onPressDate={setSelectedDate3} selectedDate={selectedDate3} />
        </ThemeProvider>
      </VStack>
      <Box height={100} />
    </Group>
  );
};

Examples.parameters = { a11y: { disable: true } };

export const Props = () => (
  <Group gap={8}>
    <VStack>
      <Note>Calendar with no props</Note>
      <Calendar />
    </VStack>
    <VStack>
      <Note>Calendar with seedDate</Note>
      <Calendar seedDate={lastMonth15th} />
    </VStack>
    <VStack>
      <Note>Calendar with selectedDate</Note>
      <Calendar selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with disabledDates and disabledDateError</Note>
      <Calendar
        disabledDateError="Date unavailable"
        disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
      />
    </VStack>
    <VStack>
      <Note>Calendar with minDate, maxDate, and disabledDateError</Note>
      <Calendar
        disabledDateError="Date unavailable"
        maxDate={nextMonth15th}
        minDate={lastMonth15th}
      />
    </VStack>
    <VStack>
      <Note>Calendar with highlightedDates</Note>
      <Calendar highlightedDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]} />
    </VStack>
    <VStack>
      <Note>Calendar with disabledDates, highlightedDates, and disabledDateError</Note>
      <Calendar
        disabledDateError="Date unavailable"
        disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
        highlightedDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
      />
    </VStack>
    <VStack>
      <Note>Calendar with hideControls</Note>
      <Calendar hideControls />
    </VStack>
    <VStack>
      <Note>Calendar when disabled</Note>
      <Calendar disabled />
    </VStack>
    <Box height={100} />
  </Group>
);

Props.parameters = { a11y: { disable: true } };
