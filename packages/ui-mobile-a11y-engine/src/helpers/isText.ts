import { Text } from 'react-native';
import type React from 'react';

const isText = (type: React.ElementType) => {
  return type === Text;
};

export default isText;
