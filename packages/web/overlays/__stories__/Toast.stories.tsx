import { CreateToastProps, toastBuilder } from '@cbhq/cds-common/internal/toastBuilder';

import { Button } from '../../buttons/Button';
import { Link } from '../../typography';
import { PortalProvider } from '../PortalProvider';
import { Toast } from '../Toast';

export default {
  title: 'Core Components/Toast',
  component: Toast,
};

export const { BasicToast, MultilineToast } = toastBuilder({
  Toast,
  Button,
  Link,
  PortalProvider,
} as CreateToastProps);
