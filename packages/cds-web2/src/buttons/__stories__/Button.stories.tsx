import React from 'react';

import { VStack } from '../../layout/VStack';
import { Button } from '../Button';

export default {
  component: Button,
  title: 'Buttons/Button',
};

export const PrimaryButton = () => (
  <VStack gap={2}>
    <Button variant="primary">Testable</Button>
  </VStack>
);
