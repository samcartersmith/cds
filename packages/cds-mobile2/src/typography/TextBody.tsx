import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextBody = memo((props: TextProps) => <Text font="body" {...props} />);
