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
      color: 'fgInverse',
      backgroundColor: 'bgPrimary',
      borderColor: 'bgPrimary',
    });
  });
  it('returns correct styles for variant: secondary, transparent: false', () => {
    const value = createHook({
      variant: 'secondary',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'fg',
      backgroundColor: 'bgSecondary',
      borderColor: 'bgSecondary',
    });
  });
  it('returns correct styles for variant: foregroundMuted, transparent: false', () => {
    const value = createHook({
      variant: 'foregroundMuted',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'fgMuted',
      backgroundColor: 'bgSecondary',
      borderColor: 'bgLine',
    });
  });
  it('returns correct styles for variant: positive, transparent: false', () => {
    const value = createHook({
      variant: 'positive',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'fgInverse',
      backgroundColor: 'bgPositive',
      borderColor: 'bgPositive',
    });
  });
  it('returns correct styles for variant: negative, transparent: false', () => {
    const value = createHook({
      variant: 'negative',
      transparent: false,
    });
    expect(value).toStrictEqual({
      color: 'fgInverse',
      backgroundColor: 'bgNegative',
      borderColor: 'bgNegative',
    });
  });

  // transparentVariants
  it('returns correct styles for variant: primary, transparent: true', () => {
    const value = createHook({
      variant: 'primary',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'fgPrimary',
      backgroundColor: 'bg',
      borderColor: 'bg',
    });
  });
  it('returns correct styles for variant: secondary, transparent: true', () => {
    const value = createHook({
      variant: 'secondary',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'fg',
      backgroundColor: 'bg',
      borderColor: 'bg',
    });
  });
  it('returns correct styles for variant: foregroundMuted, transparent: true', () => {
    const value = createHook({
      variant: 'foregroundMuted',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'fgMuted',
      backgroundColor: 'bg',
      borderColor: 'bg',
    });
  });
  it('returns correct styles for variant: positive, transparent: true', () => {
    const value = createHook({
      variant: 'positive',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'fgPositive',
      backgroundColor: 'bg',
      borderColor: 'bg',
    });
  });
  it('returns correct styles for variant: negative, transparent: true', () => {
    const value = createHook({
      variant: 'negative',
      transparent: true,
    });
    expect(value).toStrictEqual({
      color: 'fgNegative',
      backgroundColor: 'bg',
      borderColor: 'bg',
    });
  });
});
