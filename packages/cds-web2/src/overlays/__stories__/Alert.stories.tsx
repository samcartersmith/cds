import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common2/internal/alertBuilder';

import { Button } from '../../buttons/Button';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

export default {
  title: 'Core Components/Alert',
  component: Alert,
};

const { BasicAlert, LongTitleAlert, SingleActionAlert, PortalAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

export { BasicAlert, LongTitleAlert, PortalAlert, SingleActionAlert };
