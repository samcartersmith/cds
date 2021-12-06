import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';
import { PortalProvider } from '../PortalProvider';
import { Button } from '../../buttons/Button';
import { Alert } from '..';

export default {
  title: 'Core Components/Alert',
  component: Alert,
};

export const { BasicAlert, SingleActionAlert, PortalAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);
