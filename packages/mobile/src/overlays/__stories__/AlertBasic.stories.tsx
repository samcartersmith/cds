import React from 'react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const { BasicAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const AlertBasicScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Alert">
        <BasicAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertBasicScreen;
