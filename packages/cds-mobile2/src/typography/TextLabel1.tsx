import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextLabel1 = memo((props: TextProps) => <Text font="label1" {...props} />);
