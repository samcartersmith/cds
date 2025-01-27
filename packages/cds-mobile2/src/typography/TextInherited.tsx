import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextInherited = memo((props: TextProps) => <Text inherit font="body" {...props} />);
