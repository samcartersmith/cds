import { render } from '@testing-library/react';
import { ResponsiveGridProps, ResponsivePropsDevices } from '@cbhq/cds-common';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { responsiveClassName } from '../../styles/responsive';
import { Grid, GridProps } from '../Grid';
import { GridColumn } from '../GridColumn';

const DEFAULT_CLASS = 'grid';

function expectClassName<K extends keyof GridProps>(
  prop: K,
  values: NonNullable<GridProps[K]>[],
  classPrefix = DEFAULT_CLASS,
) {
  values.forEach((value) => {
    // eslint-disable-next-line jest/require-top-level-describe
    it(`will set "${value}" class name for \`${prop}\` prop`, () => {
      const { container, rerender } = render(<Grid columnMin="0px">Child</Grid>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(
        <Grid columnMin="0px" {...{ [prop]: value }}>
          Child
        </Grid>,
      );

      expect(container.firstChild).toHaveAttribute('class', `${classPrefix} ${value}`.trim());
    });
  });
}

describe('Grid', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Grid columns={12} spacing={2} background="background">
          Child
        </Grid>,
      ),
    ).toHaveNoViolations();
  });

  (['article', 'aside', 'div', 'footer', 'header', 'main', 'section'] as const).forEach((tag) => {
    it(`can render as a "${tag}" element using the \`as\` prop`, () => {
      const { container } = render(
        <Grid columns={12} as={tag}>
          Child
        </Grid>,
      );

      expect(container.querySelectorAll(tag)).toHaveLength(1);
    });
  });

  it('can pass a `role` attribute', () => {
    const { queryByRole } = render(
      <Grid columns={12} as="main" role="main">
        Child
      </Grid>,
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
      const { container, rerender } = render(<Grid columnMin="0px">Child</Grid>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(
        <Grid columnMin="0px" bordered>
          Child
        </Grid>,
      );

      expect(container.firstChild).toHaveAttribute('class', `${DEFAULT_CLASS} bordered`);
    });

    it(`will set border radius class name for \`rounded\` prop`, () => {
      const { container, rerender } = render(<Grid columnMin="0px">Child</Grid>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(
        <Grid columnMin="0px" borderRadius="standard">
          Child
        </Grid>,
      );

      expect(container.firstChild).toHaveAttribute('class', `${DEFAULT_CLASS} standard`);
    });

    it(`will set border radius class name for \`borderRadius\` prop`, () => {
      const { container, rerender } = render(<Grid columnMin="0px">Child</Grid>);

      expect(container.firstChild).toHaveAttribute('class', DEFAULT_CLASS);

      rerender(
        <Grid columnMin="0px" borderRadius="badge">
          Child
        </Grid>,
      );

      expect(container.firstChild).toHaveAttribute('class', `${DEFAULT_CLASS} badge`);
    });
  });

  describe('opacity', () => {
    it('will set styles based on related props', () => {
      const { container } = render(
        <Grid columns={12} opacity={0.4}>
          Child
        </Grid>,
      );

      expect(container.firstChild).toHaveAttribute('style', 'opacity: 0.4;');
    });
  });

  describe('width', () => {
    it('will set styles based on related props', () => {
      const { container, rerender } = render(<Grid columns={12}>Child</Grid>);

      expect(container.firstChild).not.toHaveAttribute('style');

      rerender(
        <Grid columns={12} width="321px" maxWidth="789rem" minWidth="66%">
          Child
        </Grid>,
      );

      expect(container.firstChild).toHaveAttribute(
        'style',
        'max-width: 789rem; min-width: 66%; width: 321px;',
      );
    });
  });

  describe('height', () => {
    it('will set styles based on related props', () => {
      const { container, rerender } = render(<Grid columns={12}>Child</Grid>);

      expect(container.firstChild).not.toHaveAttribute('style');

      rerender(
        <Grid columns={12} height="321px" maxHeight="789rem" minHeight="66%">
          Child
        </Grid>,
      );

      expect(container.firstChild).toHaveAttribute(
        'style',
        'height: 321px; max-height: 789rem; min-height: 66%;',
      );
    });
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

describe('styles', () => {
  const style = { opacity: 0.4, padding: '2px 4px' };
  it('can be set _dangerously_', () => {
    const { container } = render(
      <Grid columns={12} dangerouslySetStyle={style}>
        Child
      </Grid>,
    );

    expect(container.firstChild).toHaveAttribute('style', 'opacity: 0.4; padding: 2px 4px;');
  });
});

describe('explicit columns', () => {
  it('renders columns className', () => {
    const { container } = render(<Grid columns={12}>Child</Grid>);

    expect(container.firstChild).toHaveClass('columns-12');
    expect(container.firstChild).toHaveClass(DEFAULT_CLASS);
  });
});

describe('implicit columns', () => {
  it('applies implicit column styling when passed a columnMin', () => {
    const columnMin = '100px';
    const { container } = render(<Grid columnMin={columnMin}>Child</Grid>);

    expect(container.firstChild).toHaveAttribute(
      'style',
      `grid-template-columns: repeat(auto-fill, minmax(${columnMin}, 1fr));`,
    );
  });
  it('applies implicit column styling when passed a columnMin and columnMax', () => {
    const columnMin = '100px';
    const columnMax = '200px';
    const { container } = render(
      <Grid columnMin={columnMin} columnMax={columnMax}>
        Child
      </Grid>,
    );

    expect(container.firstChild).toHaveAttribute(
      'style',
      `grid-template-columns: repeat(auto-fill, minmax(${columnMin}, ${columnMax}));`,
    );
  });
});

const getClassNamesForResponsiveGridProps = (config: ResponsiveGridProps, style: string) => {
  const classNames: string[] = [];

  classNames.push(DEFAULT_CLASS);
  classNames.push(responsiveClassName);

  (Object.keys(config) as ResponsivePropsDevices[]).forEach((device) => {
    // @ts-expect-error PITA to type this
    const value = config[device]?.[style] as string;
    if (style === 'columns') {
      classNames.push(`columns-${value}`);
      return;
    }
    classNames.push(value);
  });

  return classNames.join(' ');
};

describe('responsive styles', () => {
  const responsiveFlexStylesConfig: ResponsiveGridProps = {
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
    const { container } = render(
      <Grid columnMin="0px" responsiveConfig={responsiveFlexStylesConfig}>
        Child
      </Grid>,
    );
    const classNames = getClassNamesForResponsiveGridProps(
      responsiveFlexStylesConfig,
      'justifyContent',
    );

    expect(container.firstChild).toHaveAttribute('class', classNames);
  });

  const responsiveVisibilityStylesConfig: ResponsiveGridProps = {
    phone: {
      visibility: 'hidden',
    },
    tablet: {
      visibility: 'visible',
    },
  };

  it('renders visibility classNames for styles at each device breakpoint', () => {
    const { container } = render(
      <Grid columnMin="0px" responsiveConfig={responsiveVisibilityStylesConfig}>
        Child
      </Grid>,
    );
    const classNames = getClassNamesForResponsiveGridProps(
      responsiveVisibilityStylesConfig,
      'visibility',
    );

    expect(container.firstChild).toHaveAttribute('class', classNames);
  });
  const responsiveColumnsConfig: ResponsiveGridProps = {
    phone: {
      columns: 3,
    },
    tablet: {
      columns: 6,
    },
    desktop: {
      columns: 12,
    },
  };

  it('renders columns classNames for styles at each device breakpoint', () => {
    const { container } = render(
      <Grid columnMin="0px" responsiveConfig={responsiveColumnsConfig}>
        Child
      </Grid>,
    );
    const classNames = getClassNamesForResponsiveGridProps(responsiveColumnsConfig, 'columns');

    expect(container.firstChild).toHaveAttribute('class', classNames);
  });
});

const DEFAULT_COLUMN_CLASS = 'flex';

describe('GridColumn', () => {
  it('renders the colStart className', () => {
    const { container } = render(<GridColumn colStart={2}>Child</GridColumn>);

    expect(container.firstChild).toHaveAttribute(
      'class',
      `${DEFAULT_COLUMN_CLASS} colStart-2 colEnd-auto`,
    );
  });
  it('renders the colEnd className', () => {
    const { container } = render(<GridColumn colEnd={2}>Child</GridColumn>);

    expect(container.firstChild).toHaveAttribute(
      'class',
      `${DEFAULT_COLUMN_CLASS} colStart-auto colEnd-2`,
    );
  });
  it('renders the colSpan style', () => {
    const { container } = render(<GridColumn colSpan={2}>Child</GridColumn>);

    expect(container.firstChild).toHaveStyle('grid-column: auto / span 2');
  });
  it('renders the gridColumn style', () => {
    const { container } = render(<GridColumn gridColumn="2 / 4">Child</GridColumn>);

    expect(container.firstChild).toHaveStyle('grid-column: 2 / 4');
  });
});
