import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextHeadline = memo((props: TextProps) => <Text font="headline" {...props} />);
