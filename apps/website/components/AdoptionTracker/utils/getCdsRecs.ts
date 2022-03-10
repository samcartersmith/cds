import { entries } from '@cbhq/cds-utils';
import { kebabCase, uniq } from 'lodash';
import { components as cdsComponents } from ':cds-website/data/componentsList';

const tags = {
  Container: ['HStack', 'VStack'],
  Illustration: [
    'Icon',
    'NavigationIcon',
    'HeroSquare',
    'Pictogram',
    'SpotRectangle',
    'SpotSquare',
  ],
  Placeholder: ['Fallback'],
  Skeleton: ['Fallback', 'ListCellFallback'],
  Animation: ['Lottie'],
  Chart: ['Sparkline', 'SparklineGradient'],
  Button: ['Pressable', 'PressableOpacity'],
  Toggle: ['Switch'],
  Anchor: ['Link'],
  Tap: ['Pressable', 'PressableOpacity'],
  Header: ['Text'],
  Body: ['Text'],
  Paragraph: ['Text'],
  Label: ['Text'],
  Column: ['VStack'],
  Row: ['HStack', 'ListCell'],
  Trigger: ['Pressable', 'PressableOpacity', 'Button'],
  Gap: ['Spacer'],
  div: ['HStack', 'VStack'],
} as const;

export function getCdsRecs(name: string) {
  const splitProductName = kebabCase(name).split('-');
  const matches: string[] = [];
  for (const cdsName of cdsComponents) {
    const splitCdsName = kebabCase(cdsName).split('-');
    for (const portion of splitProductName) {
      if ([cdsName, ...splitCdsName].includes(portion)) {
        matches.push(cdsName);
      }
    }
  }

  for (const [tagName, tagMatches] of entries(tags)) {
    for (const portion of splitProductName) {
      if (portion.match(tagName.toLowerCase())) {
        matches.push(...tagMatches);
      }
    }
  }

  return uniq(matches).sort();
}
