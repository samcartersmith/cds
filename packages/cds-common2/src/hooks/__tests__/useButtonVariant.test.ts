import { renderHook } from '@testing-library/react-hooks';

import { ButtonVariant } from '../../types';
import { useButtonVariant } from '../useButtonVariant';

function createHook({ variant, transparent }: { variant: ButtonVariant; transparent?: boolean }) {
  return renderHook(() => {
    return useButtonVariant(variant, transparent);
  }).result.current;
}

describe('useButtonVariant', () => {
  // nonTransparentVariants
  it('returns correct styles for variant: primary, transparent: false', () => {
    const value = createHook({
      variant: 'primary',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'textForegroundInverse',
      backgroundColor: 'backgroundPrimary',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: secondary, transparent: false', () => {
    const value = createHook({
      variant: 'secondary',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'textForeground',
      backgroundColor: 'backgroundSecondary',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: foregroundMuted, transparent: false', () => {
    const value = createHook({
      variant: 'foregroundMuted',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'textForegroundMuted',
      backgroundColor: 'backgroundSecondary',
      borderColor: 'line',
    });
  });
  it('returns correct styles for variant: positive, transparent: false', () => {
    const value = createHook({
      variant: 'positive',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'textForegroundInverse',
      backgroundColor: 'backgroundPositive',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: negative, transparent: false', () => {
    const value = createHook({
      variant: 'negative',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'textForegroundInverse',
      backgroundColor: 'backgroundNegative',
      borderColor: 'transparent',
    });
  });

  // transparentVariants
  it('returns correct styles for variant: primary, transparent: true', () => {
    const value = createHook({
      variant: 'primary',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'textPrimary',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: secondary, transparent: true', () => {
    const value = createHook({
      variant: 'secondary',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'textForeground',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: foregroundMuted, transparent: true', () => {
    const value = createHook({
      variant: 'foregroundMuted',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'textForegroundMuted',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: positive, transparent: true', () => {
    const value = createHook({
      variant: 'positive',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'textPositive',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
  it('returns correct styles for variant: negative, transparent: true', () => {
    const value = createHook({
      variant: 'negative',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'textNegative',
      backgroundColor: 'background',
      borderColor: 'transparent',
    });
  });
});
