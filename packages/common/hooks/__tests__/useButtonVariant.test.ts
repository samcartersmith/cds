import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { ButtonVariant } from '../../types';
import { useButtonVariant } from '../useButtonVariant';

function createHook({
  variant,
  transparent,
  enableFrontier,
}: {
  variant: ButtonVariant;
  transparent?: boolean;
  enableFrontier?: boolean;
}) {
  return renderHook(
    () => {
      return useButtonVariant(variant, transparent, enableFrontier);
    },
    enableFrontier
      ? {
          wrapper: FeatureFlagProvider,
          initialProps: {
            frontierButton: true,
          },
        }
      : {},
  ).result.current;
}

describe('useButtonVariant', () => {
  // nonTransparentVariants
  it('returns correct styles for variant: primary, transparent: false, enableFrontier: false', () => {
    const value = createHook({
      variant: 'primary',
      transparent: false,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'primaryForeground',
      backgroundColor: 'primary',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: secondary, transparent: false, enableFrontier: false', () => {
    const value = createHook({
      variant: 'secondary',
      transparent: false,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'secondaryForeground',
      backgroundColor: 'secondary',
      borderColor: 'line',
    });
  });
  it('returns correct styles for variant: foregroundMuted, transparent: false, enableFrontier: false', () => {
    const value = createHook({
      variant: 'foregroundMuted',
      transparent: false,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'foregroundMuted',
      backgroundColor: 'secondary',
      borderColor: 'line',
    });
  });
  it('returns correct styles for variant: positive, transparent: false, enableFrontier: false', () => {
    const value = createHook({
      variant: 'positive',
      transparent: false,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'positiveForeground',
      backgroundColor: 'positive',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: negative, transparent: false, enableFrontier: false', () => {
    const value = createHook({
      variant: 'negative',
      transparent: false,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'negativeForeground',
      backgroundColor: 'negative',
      borderColor: 'transparent',
    });
  });

  // frontierVariants
  it('returns correct styles for variant: secondary, transparent: false, enableFrontier: true', () => {
    const value = createHook({
      variant: 'secondary',
      transparent: false,
      enableFrontier: true,
    });
    expect(value).toStrictEqual({
      color: 'secondaryForeground',
      backgroundColor: 'secondary',
      borderColor: 'transparent',
    });
  });

  // transparentVariants
  it('returns correct styles for variant: primary, transparent: true, enableFrontier: false', () => {
    const value = createHook({
      variant: 'primary',
      transparent: true,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'primary',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: secondary, transparent: true, enableFrontier: false', () => {
    const value = createHook({
      variant: 'secondary',
      transparent: true,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'secondaryForeground',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: foregroundMuted, transparent: true, enableFrontier: false', () => {
    const value = createHook({
      variant: 'foregroundMuted',
      transparent: true,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'foregroundMuted',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: positive, transparent: true, enableFrontier: false', () => {
    const value = createHook({
      variant: 'positive',
      transparent: true,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'positive',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: negative, transparent: true, enableFrontier: false', () => {
    const value = createHook({
      variant: 'negative',
      transparent: true,
      enableFrontier: false,
    });
    expect(value).toStrictEqual({
      color: 'negative',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
});
