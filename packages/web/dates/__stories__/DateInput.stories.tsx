/* eslint-disable react/no-unescaped-entities, react-perf/jsx-no-new-array-as-prop */
import { useState } from 'react';
import { type DateInputValidationError } from '@cbhq/cds-common/dates/DateInputValidationError';
import { LocaleProvider } from '@cbhq/cds-common/system/LocaleProvider';

import { Icon } from '../../icons';
import { Group } from '../../layout/Group';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { DateInput } from '../DateInput';

import { Note } from './Note';

export default {
  title: 'Core Components/Dates/DateInput',
  component: DateInput,
};

const today = new Date(new Date().setHours(0, 0, 0, 0));
const oneDayAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

const sharedProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

export const Examples = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <Group gap={8} spacingEnd={8}>
      <VStack>
        <Note>DateInput</Note>
        <DateInput required {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput ES-es locale</Note>
        <LocaleProvider locale="ES-es">
          <DateInput {...sharedProps} {...props} />
        </LocaleProvider>
      </VStack>
      <VStack>
        <Note>DateInput dark mode</Note>
        <ThemeProvider spectrum="dark">
          <DateInput {...sharedProps} {...props} />
        </ThemeProvider>
      </VStack>
      <VStack>
        <Note>DateInput compact</Note>
        <DateInput compact {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput xSmall scale</Note>
        <ThemeProvider scale="xSmall">
          <DateInput {...sharedProps} {...props} />
        </ThemeProvider>
      </VStack>
      <VStack>
        <Note>DateInput compact and xSmall scale</Note>
        <ThemeProvider scale="xSmall">
          <DateInput compact {...sharedProps} {...props} />
        </ThemeProvider>
      </VStack>
    </Group>
  );
};

Examples.parameters = { a11y: { disable: true } };

export const Props = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <Group gap={8} spacingEnd={8}>
      <VStack>
        <Note>
          DateInput with invalidDateError (always required)
          <br />
          <br />
          Enter an impossible month or day number to see the result
        </Note>
        <DateInput {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput with date</Note>
        <DateInput {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>
          DateInput with disabledDates and disabledDateError
          <br />
          <br />
          Enter today's date to see the result
        </Note>
        <DateInput {...sharedProps} {...props} disabledDates={[today]} />
      </VStack>
      <VStack>
        <Note>
          DateInput with minDate, maxDate, and disabledDateError
          <br />
          <br />
          Enter a date several days in the past or future to see the result
        </Note>
        <DateInput {...sharedProps} {...props} maxDate={today} minDate={oneDayAgo} />
      </VStack>
      <VStack>
        <Note>DateInput with separator</Note>
        <DateInput {...sharedProps} {...props} separator="-" />
      </VStack>
      <VStack>
        <Note>DateInput with start, end, and placeholder</Note>
        <DateInput
          {...sharedProps}
          {...props}
          end={<Icon name="camera" size="m" spacing={2} />}
          placeholder="Hello world"
          start={<Icon name="blockchain" size="m" spacing={2} />}
        />
      </VStack>
      <VStack>
        <Note>DateInput with disabled</Note>
        <DateInput disabled {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput with required</Note>
        <DateInput required {...sharedProps} {...props} />
      </VStack>
    </Group>
  );
};

Props.parameters = { a11y: { disable: true } };
