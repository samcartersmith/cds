import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { TextBody } from '../../typography';
import { DefaultThemeProvider } from '../../utils/test';
import { Tag } from '../Tag';

describe('Tag', () => {
  const TEST_ID = 'cds-tag-test';
  it('should render text', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue">
          <TextBody as="p">Tag</TextBody>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Tag')).toBeDefined();
  });

  it('attaches testId', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <TextBody as="p">Tag</TextBody>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('check Tag passes a11y', async () => {
    const TagMock = () => (
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <TextBody as="p">Tag</TextBody>
        </Tag>
      </DefaultThemeProvider>
    );
    expect(await renderA11y(<TagMock />)).toHaveNoViolations();
  });

  it('set small border-radius when intent is informational', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <TextBody>Tag</TextBody>
        </Tag>
      </DefaultThemeProvider>,
    );

    // The border radius is set with a linaria class, so we need to check the className
    expect(screen.getByTestId(TEST_ID).className).toContain('100');
  });

  it('set full border-radius when intent is promotional', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" intent="promotional" testID={TEST_ID}>
          <TextBody>Tag</TextBody>
        </Tag>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).className).toContain('1000');
  });

  it('can set different color scheme', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="red" testID={TEST_ID}>
          <TextBody as="p">Tag</TextBody>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      background: '--background: rgb(var(--red0))', // red
    });
  });
});
