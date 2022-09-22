import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import CommunitySlider from '@react-native-community/slider';

import isAdjustable from '../isAdjustable';

jest.spyOn(console, 'error').mockImplementation();

const CustomSlider = () => <CommunitySlider minimumValue={1} maximumValue={100} />;

describe('isAdjustable tests', () => {
  it('identifies community Slider', () => {
    const renderedTree = TestRenderer.create(
      <CommunitySlider maximumValue={1} minimumValue={100} />,
    );

    const matcher = (node: ReactTestInstance) => isAdjustable(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(1);
  });

  it('identifies any slider component in a wrapper', () => {
    const renderedTree = TestRenderer.create(<CustomSlider />);

    const matcher = (node: ReactTestInstance) => isAdjustable(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(1);
  });
});
