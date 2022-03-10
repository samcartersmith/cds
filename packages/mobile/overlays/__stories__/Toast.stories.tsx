import React from 'react';
import { CreateToastProps, toastBuilder } from '@cbhq/cds-common/internal/toastBuilder';

import { Button } from '../../buttons/Button';
import { Link } from '../../typography/Link';
import { TextInput } from '../../controls/TextInput';

import { Toast } from '../Toast';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

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
