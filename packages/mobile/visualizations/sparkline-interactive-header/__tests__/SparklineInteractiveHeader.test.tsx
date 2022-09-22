import { render } from '@testing-library/react-native';

import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

const defaultSubHead = {
  percent: '20%',
  priceChange: '888.88',
  sign: '+',
  variant: 'positive',
} as const;

describe('SparklineInteractiveHeader.test', () => {
  it('renders text', () => {
    const { getByTestId } = render(
      <SparklineInteractiveHeader
        defaultTitle="test title"
        defaultLabel="test label"
        defaultSubHead={defaultSubHead}
      />,
    );

    expect(getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe('test title');
    expect(getByTestId('SparklineInteractiveHeaderLabel').props.defaultValue).toBe('test label');
    expect(getByTestId('SparklineInteractiveHeaderSubHeadIcon').props.defaultValue).toBe('+');
    expect(getByTestId('SparklineInteractiveHeaderSubHead').props.defaultValue).toBe(
      '888.88 (20%)',
    );
  });

  it('renders without default label', () => {
    const { getByTestId } = render(
      <SparklineInteractiveHeader defaultTitle="test title" defaultSubHead={defaultSubHead} />,
    );

    expect(getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe('test title');
    expect(getByTestId('SparklineInteractiveHeaderSubHeadIcon').props.defaultValue).toBe('+');
    expect(getByTestId('SparklineInteractiveHeaderSubHead').props.defaultValue).toBe(
      '888.88 (20%)',
    );
  });

  it('renders without default subhead', () => {
    const { getByTestId } = render(
      <SparklineInteractiveHeader defaultTitle="test title" defaultLabel="test label" />,
    );

    expect(getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe('test title');
    expect(getByTestId('SparklineInteractiveHeaderLabel').props.defaultValue).toBe('test label');
  });
});
