import { SvgData } from '../getSvgData';
import { getSvgMarkup, SvgMarkup } from '../getSvgMarkup';

const svgData: SvgData = {
  name: 'Test Illustration',
  width: 240,
  height: 240,
  paths: [
    {
      d: 'M10 10H90V90H10L10 10Z',
      fill: '#0052FF',
      fillRule: 'nonzero',
    },
    {
      d: 'M0 0L64 0L64 32L0 32L0 0Z',
      fill: '#FFD200',
      fillRule: 'evenodd',
    },
  ],
};

const svgLightAndDarkData: SvgData = {
  ...svgData,
  darkPaths: svgData.paths, // use same paths as light version for simplicity
};

const expectedSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 240 240"><path fill="#0052FF" d="M10 10h80v80H10V10Z"/><path fill="#FFD200" fill-rule="evenodd" d="M0 0h64v32H0V0Z"/></svg>';

describe('getSvgMarkup', () => {
  it('returns the expected SVG markup for light paths if darkPaths is undefined', () => {
    const expectedOutput: SvgMarkup = {
      light: expectedSvg,
    };

    const actualOutput = getSvgMarkup(svgData);

    // Use jest's `expect` function to assert that the actual output matches the expected output
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('returns the expected SVG markup for light and dark if paths and darkPaths are defined', () => {
    const expectedOutput: SvgMarkup = {
      light: expectedSvg,
      dark: expectedSvg,
    };

    const actualOutput = getSvgMarkup(svgLightAndDarkData);

    // Use jest's `expect` function to assert that the actual output matches the expected output
    expect(actualOutput).toEqual(expectedOutput);
  });
});
