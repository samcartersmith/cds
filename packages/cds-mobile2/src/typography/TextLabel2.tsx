import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextLabel2 = memo((props: TextProps) => <Text font="label2" {...props} />);
