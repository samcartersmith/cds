import { render, screen } from '@testing-library/react';
import { ResponsiveProps, ResponsivePropsDevices } from '@cbhq/cds-common';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { display } from '../../styles/display';
import { responsiveClassName } from '../../styles/responsive';
import { Box, BoxProps } from '../Box';

const DEFAULT_CLASS = 'flex';

function keys<T>(obj: { [key in keyof T]: T[key] }) {
  return Object.keys(obj) as unknown as Extract<keyof T, string>[];
}

function expectClassName<K extends keyof BoxProps>(
  prop: K,
  values: NonNullable<BoxProps[K]>[],
  classPrefix = DEFAULT_CLASS,
) {
  values.forEach((value) => {
    // eslint-disable-next-line jest/require-top-level-describe
    it(`will set "${value}" class name for \`${prop}\` prop`, () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box {...{ [prop]: value }}>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', `${classPrefix} ${value}`.trim());
    });
  });
}

describe('Box', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Box background="background" spacing={2}>
          Child
        </Box>,
      ),
    ).toHaveNoViolations();
  });

  it('only overrides aria-label if accessibilityLabel is provided', () => {
    render(
      <Box accessibilityLabel="custom label" aria-label="label" as="main" role="main">
        Child
      </Box>,
    );

    expect(screen.getByLabelText('custom label')).toBeTruthy();
  });

  it('only aria-labelledby if accessibilityLabelledBy provided', () => {
    render(
      <Box accessibilityLabelledBy="custom-id" aria-labelledby="id" as="main" role="main">
        <Box id="custom-id">custom label</Box>
      </Box>,
    );

    expect(screen.getByLabelText('custom label')).toBeTruthy();
  });

  (['article', 'aside', 'div', 'footer', 'header', 'main', 'section'] as const).forEach((tag) => {
    it(`can render as a "${tag}" element using the \`as\` prop`, () => {
      const { container } = render(<Box as={tag}>Child</Box>);

      // We want to check that a certain HTML element is generated, which requires DOM traversing.
      // - Emily Seibert, 10/25/2022
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelectorAll(tag)).toHaveLength(1);
    });
  });

  it('can pass a `role` attribute', () => {
    render(
      <Box as="main" role="main">
        Child
      </Box>,
    );

    expect(screen.getByRole('main')).not.toBeNull();
  });

  describe('background', () => {
    expectClassName('background', [
      'background',
      'backgroundAlternate',
      'backgroundOverlay',
      'primary',
      'secondary',
      'positive',
      'negative',
    ]);
  });

  describe('display', () => {
    expectClassName('display', keys(display), '');
  });

  describe('border', () => {
    it(`will set border class name for \`bordered\` prop`, () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box bordered>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', `${DEFAULT_CLASS} bordered`);
    });

    it(`will set border radius class name for \`rounded\` prop`, () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box borderRadius="rounded">Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', `${DEFAULT_CLASS} rounded`);
    });

    it(`will set border radius class name for \`borderRadius\` prop`, () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box borderRadius="rounded">Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('class', `${DEFAULT_CLASS} rounded`);
    });
  });

  describe('opacity', () => {
    it('will set styles based on related props', () => {
      render(<Box opacity={0.4}>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('style', 'opacity: 0.4;');
    });
  });

  describe('width', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box maxWidth="789rem" minWidth="66%" width="321px">
          Child
        </Box>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        'max-width: 789rem; min-width: 66%; width: 321px;',
      );
    });
  });

  describe('height', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box height="321px" maxHeight="789rem" minHeight="66%">
          Child
        </Box>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        'height: 321px; max-height: 789rem; min-height: 66%;',
      );
    });
  });

  describe('position', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box bottom="8rem" left="1000%" position="absolute" right="30px" top="25%" zIndex={200}>
          Child
        </Box>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        'position: absolute; bottom: 8rem; left: 1000%; right: 30px; top: 25%; z-index: 200;',
      );
    });
  });

  describe('flex', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box flexBasis="50%" flexGrow={2} flexShrink={3}>
          Child
        </Box>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        'flex-basis: 50%; flex-grow: 2; flex-shrink: 3;',
      );
    });

    describe('align content', () => {
      expectClassName('alignContent', [
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'space-between',
        'space-around',
      ]);
    });

    describe('align items', () => {
      expectClassName('alignItems', ['flex-start', 'flex-end', 'center', 'stretch', 'baseline']);
    });

    describe('align self', () => {
      expectClassName('alignSelf', [
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'auto',
        'baseline',
      ]);
    });

    describe('direction', () => {
      expectClassName('flexDirection', ['row', 'row-reverse', 'column', 'column-reverse']);
    });

    describe('wrap', () => {
      expectClassName('flexWrap', ['wrap', 'wrap-reverse', 'nowrap']);
    });

    describe('justify content', () => {
      expectClassName('justifyContent', [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ]);
    });
  });

  describe('overflow', () => {
    expectClassName('overflow', ['hidden', 'scroll', 'visible']);
  });

  describe('pin', () => {
    it('renders "top" pin', async () => {
      render(<Box pin="top">Child</Box>);

      expect(screen.getByText('Child')).toHaveClass('top');
    });

    it('renders "bottom" pin', async () => {
      render(<Box pin="bottom">Child</Box>);

      expect(screen.getByText('Child')).toHaveClass('bottom');
    });

    it('renders "right" pin', async () => {
      render(<Box pin="right">Child</Box>);

      expect(screen.getByText('Child')).toHaveClass('right');
    });

    it('renders "left" pin', async () => {
      render(<Box pin="left">Child</Box>);

      expect(screen.getByText('Child')).toHaveClass('left');
    });

    it('renders "all" pin', async () => {
      render(<Box pin="all">Child</Box>);

      expect(screen.getByText('Child')).toHaveClass('all');
    });
  });

  describe('styles', () => {
    const style = { opacity: 0.4, padding: '2px 4px' };
    it('can be set _dangerously_', () => {
      render(<Box dangerouslySetStyle={style}>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('style', 'opacity: 0.4; padding: 2px 4px;');
    });
  });

  describe('responsive styles', () => {
    const getClassNamesForResponsiveProps = (config: ResponsiveProps, style: string) => {
      const classNames: string[] = [];

      classNames.push(DEFAULT_CLASS);

      (Object.keys(config) as ResponsivePropsDevices[]).forEach((device) => {
        // @ts-expect-error PITA to type this
        classNames.push(config[device]?.[style] as string);
      });

      classNames.push(responsiveClassName);

      return classNames.join(' ');
    };

    const responsiveFlexStylesConfig: ResponsiveProps = {
      phone: {
        justifyContent: 'flex-start',
      },
      tablet: {
        justifyContent: 'space-around',
      },
      desktop: {
        justifyContent: 'flex-end',
      },
    };

    it('renders flex classNames for styles at each device breakpoint', () => {
      render(<Box responsiveConfig={responsiveFlexStylesConfig}>Child</Box>);
      const classNames = getClassNamesForResponsiveProps(
        responsiveFlexStylesConfig,
        'justifyContent',
      );

      expect(screen.getByText('Child')).toHaveClass(classNames);
    });

    const responsiveVisibilityStylesConfig: ResponsiveProps = {
      phone: {
        visibility: 'hidden',
      },
      tablet: {
        visibility: 'visible',
      },
    };

    it('renders visibility classNames for styles at each device breakpoint', () => {
      render(<Box responsiveConfig={responsiveVisibilityStylesConfig}>Child</Box>);
      const classNames = getClassNamesForResponsiveProps(
        responsiveVisibilityStylesConfig,
        'visibility',
      );

      expect(screen.getByText('Child')).toHaveClass(classNames);
    });
  });
});
