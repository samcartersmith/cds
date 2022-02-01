import { render, RenderResult } from '@testing-library/react';
import type axe from 'axe-core';
import { axe as runAxe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

export async function renderA11y(
  element: React.ReactElement,
  {
    beforeRender,
    afterRender,
    ...options
  }: axe.RunOptions & {
    beforeRender?: () => Promise<unknown>;
    afterRender?: (result: RenderResult) => Promise<unknown>;
  } = {},
): Promise<axe.AxeResults> {
  if (beforeRender) {
    await beforeRender();
  }

  const result = render(element);

  if (afterRender) {
    await afterRender(result);
  }

  // @ts-expect-error mismatched types
  const results = await runAxe(result.container, options);

  // @types/jest-axe uses v3 axe types, while axe-core/jest-axe is v4.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
  return results as any;
}
