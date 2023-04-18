import { render, screen } from '@testing-library/react-native';

import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

const defaultSubHead = {
  percent: '20%',
  priceChange: '888.88',
  sign: 'positive',
  variant: 'positive',
} as const;

describe('SparklineInteractiveHeader.test', () => {
  it('renders text', () => {
    render(
      <SparklineInteractiveHeader
        defaultTitle="test title"
        defaultLabel="test label"
        defaultSubHead={defaultSubHead}
      />,
    );

    expect(screen.getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe(
      'test title',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderLabel').props.defaultValue).toBe(
      'test label',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHeadIcon').props.defaultValue).toBe(
      '+',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHead').props.defaultValue).toBe(
      '888.88 (20%)',
    );
  });

  it('renders without default label', () => {
    render(
      <SparklineInteractiveHeader defaultTitle="test title" defaultSubHead={defaultSubHead} />,
    );

    expect(screen.getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe(
      'test title',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHeadIcon').props.defaultValue).toBe(
      '+',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHead').props.defaultValue).toBe(
      '888.88 (20%)',
    );
  });

  it('renders without default subhead', () => {
    render(<SparklineInteractiveHeader defaultTitle="test title" defaultLabel="test label" />);

    expect(screen.getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe(
      'test title',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderLabel').props.defaultValue).toBe(
      'test label',
    );
  });
});
