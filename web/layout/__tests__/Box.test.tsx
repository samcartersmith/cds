import { render } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { Box, BoxProps } from '../Box';

const DEFAULT_CLASS = 'flex';

function expectClassName<K extends keyof BoxProps>(
  prop: K,
  values: NonNullable<BoxProps[K]>[],
  classPrefix = DEFAULT_CLASS,
) {
  values.forEach(value => {
    it(`will set "${value}" class name for \`${prop}\` prop`, () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box {...{ [prop]: value }}>Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', `${classPrefix} ${value}`.trim());
    });
  });
}

describe('Box', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Box spacing={2} background="background">
          Child
        </Box>,
      ),
    ).toHaveNoViolations();
  });

  (['article', 'aside', 'div', 'footer', 'header', 'main', 'section'] as const).forEach(tag => {
    it(`can render as a "${tag}" element using the \`as\` prop`, () => {
      const { container } = render(<Box as={tag}>Child</Box>);

      expect(container.querySelectorAll(tag)).toHaveLength(1);
    });
  });

  it('can pass a `role` attribute', () => {
    const { queryByRole } = render(
      <Box as="main" role="main">
        Child
      </Box>,
    );

    expect(queryByRole('main')).not.toBeNull();
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

  describe('border', () => {
    it(`will set border class name for \`bordered\` prop`, () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box bordered>Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', `${DEFAULT_CLASS} bordered`);
    });

    it(`will set border radius class name for \`rounded\` prop`, () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box borderRadius="standard">Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', `${DEFAULT_CLASS} standard`);
    });

    it(`will set border radius class name for \`borderRadius\` prop`, () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(<Box borderRadius="badge">Child</Box>);

      expect(container.firstChild).toHaveAttribute('class', `${DEFAULT_CLASS} badge`);
    });
  });

  describe('width', () => {
    it('will set styles based on related props', () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).not.toHaveAttribute('style');

      rerender(
        <Box width="321px" maxWidth="789rem" minWidth="66%">
          Child
        </Box>,
      );

      expect(container.firstChild).toHaveAttribute(
        'style',
        'max-width: 789rem; min-width: 66%; width: 321px;',
      );
    });
  });

  describe('height', () => {
    it('will set styles based on related props', () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).not.toHaveAttribute('style');

      rerender(
        <Box height="321px" maxHeight="789rem" minHeight="66%">
          Child
        </Box>,
      );

      expect(container.firstChild).toHaveAttribute(
        'style',
        'height: 321px; max-height: 789rem; min-height: 66%;',
      );
    });
  });

  describe('position', () => {
    it('will set styles based on related props', () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).not.toHaveAttribute('style');

      rerender(
        <Box position="absolute" top="25%" right="30px" bottom="8rem" left="1000%" zIndex={200}>
          Child
        </Box>,
      );

      expect(container.firstChild).toHaveAttribute(
        'style',
        'position: absolute; bottom: 8rem; left: 1000%; right: 30px; top: 25%; z-index: 200;',
      );
    });
  });

  describe('flex', () => {
    it('will set styles based on related props', () => {
      const { container, rerender } = render(<Box>Child</Box>);

      expect(container.firstChild).not.toHaveAttribute('style');

      rerender(
        <Box flexBasis="50%" flexGrow={2} flexShrink={3}>
          Child
        </Box>,
      );

      expect(container.firstChild).toHaveAttribute(
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
      const { container } = render(<Box pin="top">Child</Box>);

      expect(container.firstChild).toHaveClass('top');
    });

    it('renders "bottom" pin', async () => {
      const { container } = render(<Box pin="bottom">Child</Box>);

      expect(container.firstChild).toHaveClass('bottom');
    });

    it('renders "right" pin', async () => {
      const { container } = render(<Box pin="right">Child</Box>);

      expect(container.firstChild).toHaveClass('right');
    });

    it('renders "left" pin', async () => {
      const { container } = render(<Box pin="left">Child</Box>);

      expect(container.firstChild).toHaveClass('left');
    });

    it('renders "all" pin', async () => {
      const { container } = render(<Box pin="all">Child</Box>);

      expect(container.firstChild).toHaveClass('all');
    });
  });
});
