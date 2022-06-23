import React from 'react';
import startCase from 'lodash/startCase';
import { tagStories } from '@cbhq/cds-common/internal/tagBuilder';
import { generateRandomId } from '@cbhq/cds-utils/string';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Tag } from '../Tag';

const TagScreen = () => {
  return (
    <ExampleScreen>
      {Object.entries(tagStories).map(([key, story]) => (
        <Example key={key} inline title={startCase(key)}>
          {story.map((props) => {
            const id = generateRandomId('tag');
            // @ts-expect-error the type union is confusing when mapping over all possible options
            return <Tag key={id} {...props} />;
          })}
        </Example>
      ))}
    </ExampleScreen>
  );
};

export default TagScreen;
