import React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { create } from 'react-test-renderer';

const testInstancePrototype = Object.getPrototypeOf(
  create(React.createElement('div')).root,
) as Record<string, string>;

export default function isReactTestInstance(candidate: unknown): candidate is ReactTestInstance {
  return (
    !!candidate &&
    typeof candidate === 'object' &&
    Object.getPrototypeOf(candidate) === testInstancePrototype
  );
}
