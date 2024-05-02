import { PaletteConfigWithInteractableTokens } from '../../types/ThemeConfig';
import { darkDefaultPalette, defaultPalette } from '../constants';
import { paletteConfigToInteractableTokens } from '../paletteConfigToInteractableTokens';

const expectedWebDarkTokens: PaletteConfigWithInteractableTokens = {
  foreground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(133, 133, 134)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(226, 226, 226)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(211, 211, 211)',
    },
  },
  foregroundMuted: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(74, 78, 86)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(147, 154, 166)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(154, 160, 172)',
    },
  },
  background: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  backgroundAlternate: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(15, 16, 19)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(25, 26, 30)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(39, 40, 43)',
    },
  },
  backgroundInverse: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(133, 133, 134)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(226, 226, 226)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(211, 211, 211)',
    },
  },
  backgroundOverlay: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(102, 105, 110)',
    },
    hovered: {
      contentOpacity: 0.9,
      backgroundColor: 'rgb(175, 179, 188)',
    },
    pressed: {
      contentOpacity: 0.84,
      backgroundColor: 'rgb(164, 168, 176)',
    },
  },
  line: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(74, 78, 86)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(147, 154, 166)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(154, 160, 172)',
    },
  },
  lineHeavy: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(74, 78, 86)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(147, 154, 166)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(154, 160, 172)',
    },
  },
  primary: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(49, 75, 132)',
    },
    hovered: {
      contentOpacity: 0.91,
      backgroundColor: 'rgb(80, 127, 229)',
    },
    pressed: {
      contentOpacity: 0.85,
      backgroundColor: 'rgb(75, 120, 214)',
    },
  },
  primaryWash: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(5, 14, 32)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(5, 21, 55)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(20, 35, 67)',
    },
  },
  primaryForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  negative: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(125, 54, 61)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(241, 110, 121)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(242, 119, 129)',
    },
  },
  negativeWash: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(31, 6, 9)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(55, 5, 9)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(67, 20, 24)',
    },
  },
  negativeForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  positive: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(25, 92, 65)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(56, 180, 128)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(69, 184, 136)',
    },
  },
  positiveForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  secondary: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(30, 32, 37)',
    },
    hovered: {
      contentOpacity: 0.96,
      backgroundColor: 'rgb(58, 61, 69)',
    },
    pressed: {
      contentOpacity: 0.9,
      backgroundColor: 'rgb(71, 73, 80)',
    },
  },
  secondaryForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(133, 133, 134)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(226, 226, 226)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(211, 211, 211)',
    },
  },
  transparent: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'transparent',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'transparent',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'transparent',
    },
  },
  warning: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(107, 79, 7)',
    },
    hovered: {
      contentOpacity: 0.93,
      backgroundColor: 'rgb(208, 154, 18)',
    },
    pressed: {
      contentOpacity: 0.87,
      backgroundColor: 'rgb(211, 160, 33)',
    },
  },
  warningForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(129, 81, 50)',
    },
    hovered: {
      contentOpacity: 0.91,
      backgroundColor: 'rgb(227, 137, 79)',
    },
    pressed: {
      contentOpacity: 0.85,
      backgroundColor: 'rgb(212, 129, 75)',
    },
  },
};

const expectedWebLightTokens: PaletteConfigWithInteractableTokens = {
  foreground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(133, 133, 134)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(39, 40, 42)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(54, 55, 57)',
    },
  },
  foregroundMuted: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(173, 176, 183)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(85, 90, 102)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(80, 85, 96)',
    },
  },
  background: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  backgroundAlternate: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(247, 248, 249)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(233, 235, 238)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(220, 222, 225)',
    },
  },
  backgroundInverse: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(133, 133, 134)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(39, 40, 42)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(54, 55, 57)',
    },
  },
  backgroundOverlay: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(153, 154, 158)',
    },
    hovered: {
      contentOpacity: 0.9,
      backgroundColor: 'rgb(71, 73, 80)',
    },
    pressed: {
      contentOpacity: 0.84,
      backgroundColor: 'rgb(83, 85, 92)',
    },
  },
  line: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(173, 176, 183)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(85, 90, 102)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(80, 85, 96)',
    },
  },
  lineHeavy: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(173, 176, 183)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(85, 90, 102)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(80, 85, 96)',
    },
  },
  primary: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(128, 169, 255)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(1, 76, 236)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(1, 72, 221)',
    },
  },
  primaryWash: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(250, 252, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(240, 243, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(226, 229, 236)',
    },
  },
  primaryForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  negative: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(231, 144, 151)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(191, 30, 44)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(179, 29, 42)',
    },
  },
  negativeForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  negativeWash: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(255, 250, 251)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 240, 241)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 226, 227)',
    },
  },
  positive: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(132, 194, 168)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(9, 123, 76)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(9, 116, 71)',
    },
  },
  positiveForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  secondary: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(247, 248, 249)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(233, 235, 238)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(220, 222, 225)',
    },
  },
  secondaryForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(133, 133, 134)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(39, 40, 42)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(54, 55, 57)',
    },
  },
  transparent: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'transparent',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'transparent',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'transparent',
    },
  },
  warning: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(222, 193, 128)',
    },
    hovered: {
      contentOpacity: 0.93,
      backgroundColor: 'rgb(176, 123, 1)',
    },
    pressed: {
      contentOpacity: 0.87,
      backgroundColor: 'rgb(165, 115, 2)',
    },
  },
  warningForeground: {
    disabled: {
      contentOpacity: 0.5,
      backgroundColor: 'rgb(246, 184, 151)',
    },
    hovered: {
      contentOpacity: 0.94,
      backgroundColor: 'rgb(223, 106, 45)',
    },
    pressed: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(210, 100, 43)',
    },
  },
};

const convertInteractableTokensToMobile = (
  webInteractableTokens: PaletteConfigWithInteractableTokens,
) =>
  Object.entries(webInteractableTokens)
    .map(([key, value]) => ({
      [key]: {
        ...value,
        hovered: undefined,
      },
    }))
    .reduce((previous, current) => {
      return { ...previous, ...current };
    }, {} as PaletteConfigWithInteractableTokens);

const expectedMobileDarkTokens = convertInteractableTokensToMobile(expectedWebDarkTokens);
const expectedMobileLightTokens = convertInteractableTokensToMobile(expectedWebLightTokens);

describe('paletteConfigToInteractableTokens', () => {
  it('works for web - dark', () => {
    expect(
      paletteConfigToInteractableTokens({
        paletteConfig: darkDefaultPalette,
        isWeb: true,
        spectrum: 'dark',
      }),
    ).toEqual(expectedWebDarkTokens);
  });

  it('works for web - light', () => {
    expect(
      paletteConfigToInteractableTokens({
        paletteConfig: defaultPalette,
        isWeb: true,
        spectrum: 'light',
      }),
    ).toEqual(expectedWebLightTokens);
  });
  it('works for mobile - dark', () => {
    expect(
      paletteConfigToInteractableTokens({
        paletteConfig: darkDefaultPalette,
        isWeb: false,
        spectrum: 'dark',
      }),
    ).toEqual(expectedMobileDarkTokens);
  });

  it('works for mobile - light', () => {
    expect(
      paletteConfigToInteractableTokens({
        paletteConfig: defaultPalette,
        isWeb: false,
        spectrum: 'light',
      }),
    ).toEqual(expectedMobileLightTokens);
  });
});
