import React from 'react';
import { render } from '@testing-library/react-native';

import { TextTitle1 } from '../typography';

/**
 * This is a test for a11yAudit executor. It checks
 * that if a test fails, it will log its output
 */
describe('Fail a11y Test', () => {
  it('Purposely fail pressable', () => {
    const result = render(<TextTitle1 testID="hello">Hello</TextTitle1>);
    console.warn('This is a test to ensure that we are capturing warnings');
    expect(result.getByTestId('hello')).toBeAccessible();
  });
});
