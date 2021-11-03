import { createStories, CreateAlertProps } from ':cds-storybook/stories/Alert';
import { PortalProvider } from '../PortalProvider';
import { Button } from '../../buttons/Button';
import { Alert } from '..';

export default {
  title: 'Core Components/Alert',
  component: Alert,
};

export const { BasicAlert, SingleActionAlert, PortalAlert } = createStories({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);
