import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { ContentCard, ContentCardBody, ContentCardFooter, ContentCardHeader } from '..';

describe('ContentCard', () => {
  it('has no accessibility violations', () => {
    render(
      <ContentCard testID="content-card-test-id">
        <Text>Test Content</Text>
      </ContentCard>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders children', () => {
    render(
      <ContentCard>
        <Text>Test Content</Text>
      </ContentCard>,
    );
    expect(screen.getByText('Test Content')).toBeTruthy();
  });
});

describe('ContentCardHeader', () => {
  it('has no accessibility violations', () => {
    render(<ContentCardHeader testID="content-card-test-id" title="Test Title" />);
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders title', () => {
    render(<ContentCardHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders avatar', () => {
    render(<ContentCardHeader avatar={<Text>Test Avatar</Text>} title="Test Title" />);
    expect(screen.getByText('Test Avatar')).toBeTruthy();
  });

  it('renders meta', () => {
    render(<ContentCardHeader meta={<Text>Test Meta</Text>} title="Test Title" />);
    expect(screen.getByText('Test Meta')).toBeTruthy();
  });

  it('renders end', () => {
    render(<ContentCardHeader end={<Text>Test End</Text>} title="Test Title" />);
    expect(screen.getByText('Test End')).toBeTruthy();
  });
});

describe('ContentCardBody', () => {
  it('has no accessibility violations', () => {
    render(<ContentCardBody body="Test Body" label="Test Label" testID="content-card-test-id" />);
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders body and label', () => {
    render(<ContentCardBody body="Test Body" label="Test Label" />);
    expect(screen.getByText('Test Body')).toBeTruthy();
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('renders media', () => {
    render(<ContentCardBody media={<Text>Test Media</Text>} />);
    expect(screen.getByText('Test Media')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <ContentCardBody body="Test Body" label="Test Label">
        <Text>Test Children</Text>
      </ContentCardBody>,
    );
    expect(screen.getByText('Test Children')).toBeTruthy();
  });
});

describe('ContentCardFooter', () => {
  it('has no accessibility violations', async () => {
    render(
      <ContentCardFooter testID="content-card-test-id">
        <Text>Test Footer</Text>
      </ContentCardFooter>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders children', () => {
    render(
      <ContentCardFooter>
        <Text>Test Footer</Text>
      </ContentCardFooter>,
    );
    expect(screen.getByText('Test Footer')).toBeTruthy();
  });

  it('renders multiple children', () => {
    render(
      <ContentCardFooter>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </ContentCardFooter>,
    );
    expect(screen.getByText('Child 1')).toBeTruthy();
    expect(screen.getByText('Child 2')).toBeTruthy();
  });
});
