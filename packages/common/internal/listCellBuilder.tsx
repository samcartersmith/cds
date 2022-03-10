import React from 'react';

import { selectCellSpacingConfig } from '../tokens/cell';
import type {
  ButtonBaseProps,
  CellMediaProps,
  ControlBaseProps,
  IconButtonBaseProps,
  IllustrationPictogramNames,
  ListCellBaseProps,
} from '../types';

import { assets } from './data/assets';

 
const onPressConsole = () => console.log('onPress');

export function listCellBuilder(
  ListCell: React.ComponentType<
    ListCellBaseProps & {
      onPress?: () => void;
      to?: string;
      disableMultilineTitle?: boolean;
    }
  >,
  CellMedia: React.ComponentType<CellMediaProps>,
  Button: React.ComponentType<ButtonBaseProps>,
  IconButton: React.ComponentType<IconButtonBaseProps>,
  Checkbox: React.ComponentType<ControlBaseProps<string> & { accessibilityLabel: string }>,
  Pictogram: React.ComponentType<{ name: IllustrationPictogramNames }>,
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

  const CompactContent = () => {
    return (
      <>
        <ListCell compact title="Title" />

        <ListCell compact title="Title" detail="Detail" />

        <ListCell compact title="Title" description="Description" />

        <ListCell compact title="Title" description="Description" detail="Detail" />

        <ListCell
          compact
          title="Title"
          description="Description"
          detail="Detail"
          subdetail="Neutral"
        />

        <ListCell compact title="Title" detail="Detail" subdetail="Neutral" />

        <ListCell
          compact
          title="Title"
          description="Description"
          detail="Detail"
          subdetail="+Positive"
          variant="positive"
        />

        <ListCell compact title="Title" subdetail="+Positive" variant="positive" />

        <ListCell
          compact
          title="Title"
          description="Description"
          detail="Detail"
          subdetail="-Negative"
          variant="negative"
        />

        <ListCell compact title="Title" detail="Detail" subdetail="-Negative" variant="negative" />
      </>
    );
  };

  const PressableContent = () => (
    <>
      <ListCell title="Title" onPress={onPressConsole} />

      <ListCell title="Title" subdetail="Neutral" onPress={onPressConsole} />

      <ListCell title="Title" description="Multi-line description" onPress={onPressConsole} />

      <ListCell
        title="Title"
        description="Multi-line description"
        onPress={onPressConsole}
        multiline
        selected
      />

      <ListCell
        title="Title"
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        multiline
      />

      <ListCell
        title="Title"
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        multiline
        selected
      />

      <ListCell title="Title" description="Description" detail="Detail" onPress={onPressConsole} />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={onPressConsole}
        reduceHorizontalSpacing
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={onPressConsole}
        selected
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={onPressConsole}
        disabled
        reduceHorizontalSpacing
      />

      <ListCell
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="+Postive"
        variant="positive"
        onPress={onPressConsole}
        selected
        disabled
      />
    </>
  );

  const CompactPressableContent = () => (
    <>
      <ListCell compact title="Title" onPress={onPressConsole} />

      <ListCell compact title="Title" subdetail="Neutral" onPress={onPressConsole} />

      <ListCell
        compact
        title="Title"
        description="Multi-line description"
        onPress={onPressConsole}
        multiline
      />

      <ListCell
        compact
        title="Title"
        description="Multi-line description"
        onPress={onPressConsole}
        multiline
        selected
      />

      <ListCell
        compact
        title="Title"
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        multiline
      />

      <ListCell
        compact
        title="Title"
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        multiline
        selected
      />

      <ListCell
        compact
        title="Title"
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
      />

      <ListCell
        compact
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={onPressConsole}
        reduceHorizontalSpacing
      />

      <ListCell
        compact
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={onPressConsole}
        selected
      />

      <ListCell
        compact
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        onPress={onPressConsole}
        disabled
        reduceHorizontalSpacing
      />

      <ListCell
        compact
        title="Title"
        description="Description"
        detail="Detail"
        subdetail="+Postive"
        variant="positive"
        onPress={onPressConsole}
        selected
        disabled
      />
    </>
  );

  const LongContent = () => (
    <>
      <ListCell
        title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
        description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
      />
      <ListCell
        title="disableMultilineTitle === undefined. Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
      />
      <ListCell
        title="disableMultilineTitle === true. Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
        disableMultilineTitle
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
      />
      <ListCell
        multiline
        selected
        title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
        description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
      />
    </>
  );

  const PriorityContent = () => (
    <>
      <ListCell
        title="Asset with a really long name"
        description="Some description of the asset"
        detail="$334,239.03"
        subdetail="+4.06%"
        variant="positive"
        intermediary={<CellMedia type="icon" name="chartLine" />}
        priority="start"
      />
      <ListCell
        title="Asset with a really long name"
        description="Some description of the asset"
        detail="$334,239.03"
        subdetail="+4.06%"
        variant="positive"
        intermediary={<CellMedia type="icon" name="chartLine" />}
        priority="middle"
      />
      <ListCell
        title="Asset with a really long name"
        description="Some description of the asset"
        detail="$334,239.03"
        subdetail="+4.06%"
        variant="positive"
        intermediary={<CellMedia type="icon" name="chartLine" />}
        priority="end"
      />
    </>
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
      <ListCell title="Icon" media={<CellMedia type="icon" name="email" />} />

      <ListCell
        title="Icon (pressable)"
        media={<CellMedia type="icon" name="email" />}
        onPress={onPressConsole}
      />

      <ListCell
        title="Icon"
        description="Description"
        media={<CellMedia type="icon" name="phone" />}
      />

      <ListCell
        title="Avatar"
        description="Description"
        detail="Detail"
        media={<CellMedia type="avatar" source={assets.eth.imageUrl} title="Title" />}
      />

      <ListCell
        title="Asset"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        media={<CellMedia type="asset" source={assets.eth.imageUrl} title="Title" />}
      />

      <ListCell
        title="Image"
        detail="Detail"
        media={<CellMedia type="image" source={assets.eth.imageUrl} title="Title" />}
      />

      <ListCell
        title="Pictogram"
        description="Description"
        media={<CellMedia type="pictogram" illustration={<Pictogram name="shield" />} />}
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

  const WithIntermediary = () => (
    <>
      <ListCell
        title="Title"
        description="Description"
        detail="$1,230"
        detailWidth={100}
        intermediary={<CellMedia type="icon" name="chartLine" />}
      />
      <ListCell
        title="Title"
        description="Description"
        detail="$44,130"
        detailWidth={100}
        intermediary={<CellMedia type="icon" name="chartLine" />}
      />
      <ListCell
        title="Title"
        description="Description"
        detail="$942,103"
        detailWidth={100}
        intermediary={<CellMedia type="icon" name="chartLine" />}
      />
      <ListCell
        title="Title"
        description="Description"
        detail="$530"
        detailWidth={100}
        intermediary={<CellMedia type="icon" name="chartLine" />}
      />
      <ListCell
        title="Title"
        description="Description"
        detail="$123K"
        detailWidth={100}
        intermediary={<CellMedia type="icon" name="chartLine" />}
      />
    </>
  );

  const CustomSpacing = () => (
    <>
      <ListCell
        title="Title"
        description="Description"
        detail="$1,230"
        detailWidth={100}
        onPress={onPressConsole}
        selected
        borderRadius="none"
        {...selectCellSpacingConfig}
      />
      <ListCell
        title="Title"
        description="Description"
        detail="$1,230"
        detailWidth={100}
        onPress={onPressConsole}
        borderRadius="none"
        {...selectCellSpacingConfig}
      />
    </>
  );

  return {
    Content,
    CompactContent,
    PressableContent,
    CompactPressableContent,
    LongContent,
    PriorityContent,
    WithAccessory,
    WithMedia,
    WithActions,
    WithIntermediary,
    CustomSpacing,
  };
}
