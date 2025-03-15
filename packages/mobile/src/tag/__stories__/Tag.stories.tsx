import React from 'react';
import startCase from 'lodash/startCase';
import { tagStories } from '@cbhq/cds-common/internal/tagBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Tag } from '../Tag';

const TagScreen = () => {
  return (
    <ExampleScreen>
      {Object.entries(tagStories).map(([key, story]) => (
        <Example key={key} inline title={startCase(key)}>
          {story.map((props, idx) => {
            return <Tag key={`${props.children}-${idx}`} {...props} />;
          })}
        </Example>
      ))}
    </ExampleScreen>
  );
};

export default TagScreen;
