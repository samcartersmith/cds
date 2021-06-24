import { ContentCellBaseProps, CellMediaProps } from '@cbhq/cds-common';

import { mockAsset } from './constants';

export function createStories(
  ContentCell: React.ComponentType<
    ContentCellBaseProps & {
      onPress?: () => void;
      to?: string;
    }
  >,
  CellMedia: React.ComponentType<CellMediaProps>
) {
  const Content = () => (
    <>
      <ContentCell title="Title" meta="Meta" />

      <ContentCell title="Title" subtitle="Subtitle" />

      <ContentCell title="Title" description="Description" meta="Meta" />

      <ContentCell title="Title" description="Description" subtitle="Subtitle" />

      <ContentCell subtitle="Subtitle" meta="Meta" />

      <ContentCell description="Description" subtitle="Subtitle" />

      <ContentCell description="Description" />
    </>
  );

  const PressableContent = () => (
    <>
      <ContentCell title="Title" to="#" onPress={() => {}} />

      <ContentCell title="Title" subtitle="Subtitle" onPress={() => {}} />

      <ContentCell
        title="Title"
        meta="Meta"
        description="Description"
        subtitle="Subtitle"
        onPress={() => {}}
        to="#"
        reduceHorizontalSpacing
      />

      <ContentCell description="Description" subtitle="Subtitle" onPress={() => {}} />

      <ContentCell
        title="Title"
        description="Description"
        meta="Meta"
        onPress={() => {}}
        reduceHorizontalSpacing
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
    </>
  );

  const LongContent = () => (
    <>
      <ContentCell
        title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
        description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      />

      <ContentCell
        title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
        subtitle="Subtitle is short lol"
        description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
        media={<CellMedia type="avatar" source={mockAsset} title="Title" />}
        accessory="more"
      />

      <ContentCell
        title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
        meta="Long meta title"
        media={<CellMedia type="avatar" source={mockAsset} title="Title" />}
      />
    </>
  );

  const WithAccessory = () => (
    <>
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
    </>
  );

  const WithMedia = () => (
    <>
      <ContentCell title="Title" media={<CellMedia type="icon" name="email" />} />

      <ContentCell
        title="Title"
        subtitle="Subtitle"
        meta="Meta"
        media={<CellMedia type="image" source={mockAsset} title="Title" />}
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
        media={<CellMedia type="avatar" source={mockAsset} title="Title" />}
      />

      <ContentCell
        title="Title"
        description="Description"
        meta="Meta"
        subtitle="Subtitle"
        media={<CellMedia type="asset" source={mockAsset} title="Title" />}
      />
    </>
  );

  return {
    Content,
    PressableContent,
    LongContent,
    WithAccessory,
    WithMedia,
  };
}
