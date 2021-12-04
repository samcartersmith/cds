import { createStories, CreateToastProps } from ':cds-storybook/stories/Toast';
import { PortalProvider } from '../PortalProvider';
import { Button } from '../../buttons/Button';
import { Link } from '../../typography';

import { Toast } from '..';

export default {
  title: 'Core Components/Toast',
  component: Toast,
};

export const { BasicToast, MultilineToast } = createStories({
  Toast,
  Button,
  Link,
  PortalProvider,
} as CreateToastProps);
