import React from 'react';
import { CreateToastProps, toastBuilder } from '@cbhq/cds-common/internal/toastBuilder';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Toast } from '../Toast';

const { BasicToast } = toastBuilder({
  Toast,
  Button,
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
