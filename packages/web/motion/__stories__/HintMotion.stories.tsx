import {
  CreateHintMotionProps,
  hintMotionBuilder,
} from '@cbhq/cds-common/internal/hintMotionBuilder';

import { Button } from '../../buttons';
import { Box, VStack } from '../../layout';
import { TextBody } from '../../typography';
import { ColorSurge as ColorSurgeComponent } from '../ColorSurge';
import { Shake as ShakeComponent } from '../Shake';

export default {
  title: 'Core Components/Motion/HintMotion',
};

export const { ColorSurge, Shake } = hintMotionBuilder({
  VStack,
  Button,
  Box,
  TextBody,
  ColorSurge: ColorSurgeComponent,
  Shake: ShakeComponent,
} as CreateHintMotionProps);
