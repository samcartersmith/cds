import { ContentCell, CellMedia } from '@cbhq/cds-mobile/cells';

import { mockAsset } from './constants';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const ContentCellScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Content only">
        <ContentCell title="Title" meta="Meta" />

        <ContentCell title="Title" subtitle="Subtitle" />

        <ContentCell title="Title" description="Description" meta="Meta" />

        <ContentCell title="Title" description="Description" subtitle="Subtitle" />

        <ContentCell subtitle="Subtitle" meta="Meta" />

        <ContentCell description="Description" subtitle="Subtitle" />

        <ContentCell description="Description" />
      </Example>

      <Example title="Pressable content">
        <ContentCell title="Title" onPress={() => {}} />

        <ContentCell title="Title" subtitle="Subtitle" onPress={() => {}} />

        <ContentCell
          title="Title"
          meta="Meta"
          description="Description"
          subtitle="Subtitle"
          onPress={() => {}}
        />

        <ContentCell description="Description" subtitle="Subtitle" onPress={() => {}} />

        <ContentCell
          title="Title"
          description="Description"
          meta="Meta"
          onPress={() => {}}
          selected
        />

        <ContentCell
          title="Title"
          description="Description"
          subtitle="Subtitle"
          onPress={() => {}}
          disabled
        />

        <ContentCell title="Title" subtitle="Subtitle" onPress={() => {}} selected disabled />
      </Example>

      <Example title="Long content">
        <ContentCell
          title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
          description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
        />

        <ContentCell
          title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
          subtitle="Subtitle is short lol"
          description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
          media={<CellMedia type="photo" source={mockAsset} />}
        />

        <ContentCell
          title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
          meta="Meta"
          media={<CellMedia type="photo" source={mockAsset} />}
        />
      </Example>

      <Example title="With accessory">
        <ContentCell title="Title" meta="Meta" accessory="arrow" />

        <ContentCell title="Title" subtitle="Subtitle" accessory="more" />

        <ContentCell title="Title" description="Description" accessory="selected" />

        <ContentCell
          title="Title"
          meta="Meta"
          description="Description"
          subtitle="Subtitle"
          accessory="arrow"
        />

        <ContentCell description="Description" subtitle="Subtitle" meta="Meta" accessory="more" />

        <ContentCell title="Title" description="Description" accessory="selected" />

        <ContentCell description="Description" accessory="arrow" />
      </Example>

      <Example title="With media">
        <ContentCell title="Title" media={<CellMedia type="icon" name="email" />} />

        <ContentCell
          title="Title"
          subtitle="Subtitle"
          meta="Meta"
          media={<CellMedia type="image" source={mockAsset} />}
        />

        <ContentCell
          title="Title"
          description="Description"
          media={<CellMedia type="icon" name="phone" />}
        />

        <ContentCell
          title="Title"
          description="Description"
          subtitle="Subtitle"
          media={<CellMedia type="photo" source={mockAsset} />}
        />

        <ContentCell
          title="Title"
          description="Description"
          meta="Meta"
          subtitle="Subtitle"
          media={<CellMedia type="asset" source={mockAsset} />}
        />
      </Example>
    </ExamplesScreen>
  );
};

export default ContentCellScreen;
