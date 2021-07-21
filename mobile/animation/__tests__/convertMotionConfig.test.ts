import { durations } from '@cbhq/cds-common/tokens/motion';

import { convertMotionConfig, mobileCurves } from '../convertMotionConfig';

describe('convertMotionConfig', () => {
  it('returns the correct Animated config based on CDS config', () => {
    expect(
      convertMotionConfig({ toValue: 1, curve: 'enterExpressive', duration: 'fast1' }),
    ).toEqual({
      delay: undefined,
      duration: durations.fast1,
      easing: mobileCurves.enterExpressive,
      toValue: 1,
      useNativeDriver: true,
    });
  });
});
