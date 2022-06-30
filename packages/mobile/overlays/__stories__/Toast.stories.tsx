import React from 'react';
import { CreateToastProps, toastBuilder } from '@cbhq/cds-common/internal/toastBuilder';

import { Button } from '../../buttons/Button';
import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Link } from '../../typography/Link';
import { Toast } from '../Toast';

const { BasicToast } = toastBuilder({
  Toast,
  Link,
  Button,
  TextInput,
  Stack: VStack,
} as CreateToastProps);

const ToastScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Toast">
        <BasicToast />
      </Example>
    </ExampleScreen>
  );
};

export default ToastScreen;
