import {
  ButtonBaseProps,
  CellMediaProps,
  ControlBaseProps,
  IconButtonBaseProps,
  ListCellProps,
} from '@cbhq/cds-common';

import { mockAsset } from './constants';

export function createStories(
  ListCell: React.ComponentType<ListCellProps>,
  CellMedia: React.ComponentType<CellMediaProps>,
  Button: React.ComponentType<ButtonBaseProps>,
  IconButton: React.ComponentType<IconButtonBaseProps>,
  Checkbox: React.ComponentType<ControlBaseProps<string> & { accessibilityLabel: string }>
) {
  const Content = () => {
    return (
      <>
        <ListCell title="Title" />

        <ListCell title="Title" detail="Detail" />

        <ListCell title="Title" description="Description" />

        <ListCell title="Title" description="Description" detail="Detail" />

        <ListCell title="Title" description="Description" detail="Detail" subdetail="Neutral" />

        <ListCell title="Title" detail="Detail" subdetail="Neutral" />

        <ListCell
          title="Title"
          description="Description"
          detail="Detail"
          subdetail="+Positive"
          variant="positive"
        />

        <ListCell title="Title" subdetail="+Positive" variant="positive" />

        <ListCell
          title="Title"
          description="Description"
          detail="Detail"
          subdetail="-Negative"
          variant="negative"
        />

        <ListCell title="Title" detail="Detail" subdetail="-Negative" variant="negative" />
      </>
    );
  };

  const PressableContent = () => (
    <>
      <ListCell title="Title" onPress={() => {}} />

      <ListCell title="Title" subdetail="Neutral" onPress={() => {}} />

      <ListCell title="Title" description="Description" detail="Detail" onPress={() => {}} />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={() => {}}
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={() => {}}
        selected
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={() => {}}
        disabled
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="+Postive"
        variant="positive"
        onPress={() => {}}
        selected
        disabled
      />
    </>
  );

  const LongContent = () => (
    <ListCell
      title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      detail="Detail also has a very long string"
      subdetail="Neutral also does too"
    />
  );

  const WithAccessory = () => (
    <>
      <ListCell title="Title" accessory="arrow" />

      <ListCell title="Title" detail="Detail" accessory="more" />

      <ListCell title="Title" description="Description" accessory="selected" />

      <ListCell title="Title" description="Description" detail="Detail" accessory="arrow" />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        accessory="more"
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="+Positive"
        variant="positive"
        accessory="selected"
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="-Negative"
        variant="negative"
        accessory="arrow"
      />
    </>
  );

  const WithMedia = () => (
    <>
      <ListCell title="Title" media={<CellMedia type="icon" name="email" />} />

      <ListCell
        title="Title"
        detail="Detail"
        media={<CellMedia type="image" source={mockAsset} title="Title" />}
      />

      <ListCell
        title="Title"
        description="Description"
        media={<CellMedia type="icon" name="phone" />}
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        media={<CellMedia type="avatar" source={mockAsset} title="Title" />}
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        media={<CellMedia type="asset" source={mockAsset} title="Title" />}
      />
    </>
  );

  const WithActions = () => (
    <>
      <ListCell title="Title" action={<Checkbox accessibilityLabel="Checkbox" checked />} />

      <ListCell title="Title" detail="Detail" action={<Button>Action</Button>} />

      <ListCell
        title="Title"
        description="Description"
        action={
          <Button compact variant="negative">
            Action
          </Button>
        }
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        action={<IconButton name="externalLink" />}
      />
    </>
  );

  return {
    Content,
    PressableContent,
    LongContent,
    WithAccessory,
    WithMedia,
    WithActions,
  };
}
