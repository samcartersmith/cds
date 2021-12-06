import React from 'react';
import { Button } from '@cbhq/cds-mobile/buttons';
import { Link } from '@cbhq/cds-mobile/typography';
import { Toast } from '@cbhq/cds-mobile/overlays';
import { TextInput } from '@cbhq/cds-mobile/controls';
import { CreateToastProps, toastBuilder } from '@cbhq/cds-common/internal/toastBuilder';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const { BasicToast, MultilineToast } = toastBuilder({
  Toast,
  Link,
  Button,
  TextInput,
} as CreateToastProps);

const ToastScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Basic Toast">
        <BasicToast />
      </Example>
      <Example title="Multiline Toast">
        <MultilineToast />
      </Example>
    </ExamplesScreen>
  );
};

export default ToastScreen;
