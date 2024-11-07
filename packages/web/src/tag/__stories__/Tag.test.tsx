import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { TextBody } from '../../typography';
import { Tag } from '../Tag';

describe('Tag', () => {
  const TEST_ID = 'cds-tag-test';
  it('should render text', () => {
    render(
      <Tag colorScheme="blue">
        <TextBody as="p">Tag</TextBody>
      </Tag>,
    );
    expect(screen.getByText('Tag')).toBeDefined();
  });

  it('attaches testId', () => {
    render(
      <Tag colorScheme="blue" testID={TEST_ID}>
        <TextBody as="p">Tag</TextBody>
      </Tag>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('check Tag passes a11y', async () => {
    const TagMock = () => (
      <Tag colorScheme="blue" testID={TEST_ID}>
        <TextBody as="p">Tag</TextBody>
      </Tag>
    );
    expect(await renderA11y(<TagMock />)).toHaveNoViolations();
  });

  it('set small border-radius when intent is informational', () => {
    render(
      <Tag colorScheme="blue" testID={TEST_ID}>
        <TextBody as="p">Tag</TextBody>
      </Tag>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveClass('roundedSmall');
  });

  it('set full border-radius when intent is promotional', () => {
    render(
      <Tag colorScheme="blue" intent="promotional" testID={TEST_ID}>
        <TextBody as="p">Tag</TextBody>
      </Tag>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveClass('roundedFull');
  });

  it('can set different color scheme', () => {
    render(
      <Tag colorScheme="red" testID={TEST_ID}>
        <TextBody as="p">Tag</TextBody>
      </Tag>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      background: '--background: rgb(var(--red0))', // red
    });
  });
});
