import React from 'react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common2/internal/alertBuilder';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const { LongTitleAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const AlertLongTitleScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Long Title Alert">
        <LongTitleAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertLongTitleScreen;
