import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextLegal = memo((props: TextProps) => <Text font="legal" {...props} />);
