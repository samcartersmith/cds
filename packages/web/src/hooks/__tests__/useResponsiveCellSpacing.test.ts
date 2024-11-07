import { renderHook } from '@testing-library/react-hooks';

import { getDeviceStyles, useResponsiveCellSpacingStyles } from '../useResponsiveCellSpacing';

describe('useResponsiveCellSpacing', () => {
  it('gets device styles', () => {
    const deviceStyles1 = getDeviceStyles(
      { innerSpacing: { spacingVertical: 3, spacingStart: 2 } },
      'desktop',
    );
    expect(deviceStyles1.innerSpacingClassNames).toHaveLength(2);
    expect(deviceStyles1.outerSpacingClassNames).toHaveLength(0);

    const deviceStyles2 = getDeviceStyles(
      { innerSpacing: { spacingVertical: 3 }, outerSpacing: { spacing: 2 } },
      'tablet',
    );
    expect(deviceStyles2.innerSpacingClassNames).toHaveLength(1);
    expect(deviceStyles2.outerSpacingClassNames).toHaveLength(1);

    const deviceStyles3 = getDeviceStyles(
      { innerSpacing: { offsetVertical: 1 }, outerSpacing: { offsetEnd: 2 } },
      'phone',
    );
    expect(deviceStyles3.innerSpacingClassNames).toHaveLength(1);
    expect(deviceStyles3.outerSpacingClassNames).toHaveLength(1);

    const deviceStyles4 = getDeviceStyles(
      { outerSpacing: { offsetHorizontal: 2, offsetTop: 3 } },
      'desktop',
    );
    expect(deviceStyles4.innerSpacingClassNames).toHaveLength(0);
    expect(deviceStyles4.outerSpacingClassNames).toHaveLength(2);
  });

  it('returns cell spacing styles', () => {
    const { result } = renderHook(() =>
      useResponsiveCellSpacingStyles({
        desktop: {
          innerSpacing: { spacing: 3, spacingBottom: 2 },
          outerSpacing: { spacingVertical: 5 },
        },
        tablet: {
          innerSpacing: { spacing: 1, spacingBottom: 1 },
          outerSpacing: { spacingVertical: 0 },
        },
      }),
    );

    expect(result.current.responsiveInnerSpacing.split(' ')).toHaveLength(4);
    expect(result.current.responsiveOuterSpacing.split(' ')).toHaveLength(2);
  });

  it('returns empty array if responsive config is undefined', () => {
    const { result } = renderHook(() => useResponsiveCellSpacingStyles(undefined));

    expect(result.current.responsiveInnerSpacing).toBe('');
    expect(result.current.responsiveOuterSpacing).toBe('');
  });
});
