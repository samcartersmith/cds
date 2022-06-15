import {
  colorSurgeBuilder,
  CreateColorSurgeProps,
} from '@cbhq/cds-common/internal/hintMotionBuilder';

import { Button } from '../../buttons';
import { Box, VStack } from '../../layout';
import { TextBody } from '../../typography';
import { ColorSurge as ColorSurgeComponent } from '../ColorSurge';

export default {
  title: 'Core Components/Motion/HintMotion',
};

export const { ColorSurge } = colorSurgeBuilder({
  VStack,
  Button,
  Box,
  ColorSurge: ColorSurgeComponent,
  TextBody,
} as CreateColorSurgeProps);
