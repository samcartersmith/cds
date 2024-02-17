import React from 'react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const { SingleActionAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const AlertSingleActionScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Single Action Alert">
        <SingleActionAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertSingleActionScreen;
