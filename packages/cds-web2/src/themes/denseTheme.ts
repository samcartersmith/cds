import type { ThemeConfig } from '../core/theme';

import { defaultTheme } from './defaultTheme';

// TO DO: update the space token once the design tokens are updated
export const denseTheme = {
  ...defaultTheme,
  space: {
    '0': 0,
    '0.25': 1,
    '0.5': 3,
    '0.75': 5,
    '1': 6,
    '1.5': 9,
    '2': 12,
    '3': 18,
    '4': 24,
    '5': 30,
    '6': 36,
    '7': 42,
    '8': 48,
    '9': 54,
    '10': 60,
  },
  iconSize: {
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
  },
  avatarSize: {
    s: 16,
    m: 20,
    l: 24,
    xl: 36,
    xxl: 44,
    xxxl: 48,
  },
  control: {
    checkboxSize: 16,
    radioSize: 16,
    switchWidth: 42,
    switchHeight: 24,
    switchThumbSize: 22,
  },
  fontFamily: {
    // TO DO: Align font family values with doc.
    display1: 'var(--cds-font-display)',
    display2: 'var(--cds-font-display)',
    display3: 'var(--cds-font-display)',
    title1: 'var(--cds-font-sans)',
    title2: 'var(--cds-font-sans)',
    title3: 'var(--cds-font-sans)',
    title4: 'var(--cds-font-sans)',
    headline: 'var(--cds-font-sans)',
    body: 'var(--cds-font-text)',
    label1: 'var(--cds-font-text)',
    label2: 'var(--cds-font-text)',
    caption: 'var(--cds-font-text)',
    legal: 'var(--cds-font-text)',
  },
  fontSize: {
    display1: '4rem', // 64px
    display2: '3rem', // 48px
    display3: '2.5rem', // 40px
    title1: '1.75rem', // 28px
    title2: '1.75rem', // 28px
    title3: '1.25rem', // 20px
    title4: '1.25rem', // 20px
    headline: '1rem', // 16px
    body: '1rem', // 16px
    label1: '0.875rem', // 14px
    label2: '0.875rem', // 14px
    caption: '0.8125rem', // 13px
    legal: '0.8125rem', // 13px
  },
  fontWeight: {
    // TO DO: Align line weight values with doc. Keys are different.
    display1: '400',
    display2: '400',
    display3: '400',
    title1: '600',
    title2: '400',
    title3: '600',
    title4: '400',
    headline: '600',
    body: '400',
    label1: '600',
    label2: '400',
    caption: '600',
    legal: '400',
  },
  lineHeight: {
    display1: '4.5rem', // 72px
    display2: '3.5rem', // 56px
    display3: '3rem', // 48px
    title1: '2.25rem', // 36px
    title2: '2.25rem', // 36px
    title3: '1.75rem', // 28px
    title4: '1.75rem', // 28px
    headline: '1.5rem', // 24px
    body: '1.5rem', // 24px
    label1: '1.25rem', // 20px
    label2: '1.25rem', // 20px
    caption: '1rem', // 16px
    legal: '1rem', // 16px
  },
} as const satisfies ThemeConfig;
