// @ts-nocheck
import React from 'react';
import { Slider as DeprecatedRNSlider } from 'react-native';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import CommunitySlider from '@react-native-community/slider';

import isAdjustable from './isAdjustable';

jest.spyOn(console, 'error').mockImplementation();

const CustomSlider = () => <CommunitySlider minimumValue={1} maximumValue={100} />;

const cases = [
  ['deprecated react-native Slider', DeprecatedRNSlider, 1],
  ['community Slider', CommunitySlider, 1],
  ['any slider component in a wrapper', CustomSlider, 1],
];

test.each(cases)(`identifies %p`, (_, Component, numOfMatches) => {
  const renderedTree = TestRenderer.create(<Component maximumValue={10} minimumValue={1} />);

  const matcher = (node: ReactTestInstance) => isAdjustable(node);
  const matched = renderedTree.root.findAll(matcher);

  expect(matched).toHaveLength(numOfMatches);
});
