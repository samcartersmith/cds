import React, { useState } from 'react';
import { DateInputValidationError } from '@cbhq/cds-common/dates/DateInputValidationError';
import { LocaleProvider } from '@cbhq/cds-common/system/LocaleProvider';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Group } from '../../layout/Group';
import { ThemeProvider } from '../../system/ThemeProvider';
import { DateInput } from '../DateInput';

const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
const oneDayAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

const sharedProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

export const Examples = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <ExampleScreen>
      <Example>
        <Group gap={8} spacingEnd={8}>
          <DateInput {...sharedProps} {...props} />
          <LocaleProvider locale="ES-es">
            <DateInput {...sharedProps} {...props} />
          </LocaleProvider>
          <ThemeProvider name="dateinput-dark" spectrum="dark">
            <DateInput {...sharedProps} {...props} />
          </ThemeProvider>
          <DateInput compact {...sharedProps} {...props} />
          <ThemeProvider name="dateinput-xsmall1" scale="xSmall">
            <DateInput {...sharedProps} {...props} />
          </ThemeProvider>
          <ThemeProvider name="dateinput-xsmall2" scale="xSmall">
            <DateInput compact {...sharedProps} {...props} />
          </ThemeProvider>
          <DateInput {...sharedProps} {...props} maxDate={today} minDate={oneDayAgo} />
          <DateInput {...sharedProps} {...props} separator="-" />
          <DateInput
            {...sharedProps}
            {...props}
            end={<Icon name="camera" size="m" spacing={2} />}
            placeholder="Hello world"
            start={<Icon name="blockchain" size="m" spacing={2} />}
          />
          <DateInput disabled {...sharedProps} {...props} />
          <DateInput required {...sharedProps} {...props} />
        </Group>
      </Example>
    </ExampleScreen>
  );
};

export default Examples;
