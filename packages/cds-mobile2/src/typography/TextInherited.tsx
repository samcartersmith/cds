import React from 'react';

import { type TextProps, Text } from './Text';

export const TextInherited = (props: TextProps) => <Text inherit font="body" {...props} />;
