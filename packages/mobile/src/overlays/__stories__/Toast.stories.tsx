import React from 'react';
import { CreateToastProps, toastBuilder } from '@cbhq/cds-common/src/internal/toastBuilder';

import { Button } from '../../buttons/Button';
import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Link } from '../../typography/Link';
import { Toast } from '../Toast';

const { BasicToast, MultilineToast } = toastBuilder({
  Toast,
  Link,
  Button,
  TextInput,
} as CreateToastProps);

const ToastScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Toast">
        <BasicToast />
      </Example>
      <Example title="Multiline Toast">
        <MultilineToast />
      </Example>
    </ExampleScreen>
  );
};

export default ToastScreen;
