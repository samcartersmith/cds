import { CreateToastProps, toastBuilder } from '@cbhq/cds-common/internal/toastBuilder';

import { Button } from '../../buttons/Button';
import { HStack } from '../../layout';
import { Link } from '../../typography';
import { PortalProvider } from '../PortalProvider';
import { Toast } from '../Toast';

export default {
  title: 'Core Components/Toast',
  component: Toast,
};

const { BasicToast } = toastBuilder({
  Toast,
  Button,
  Link,
  PortalProvider,
  Stack: HStack,
} as CreateToastProps);

export { BasicToast };
