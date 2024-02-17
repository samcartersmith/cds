import React from 'react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const { PortalAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const AlertPortalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Portal Alert">
        <PortalAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertPortalScreen;
