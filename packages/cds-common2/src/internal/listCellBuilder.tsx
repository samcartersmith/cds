import React from 'react';

import { selectCellSpacingConfig } from '../tokens/select';
import type {
  ButtonBaseProps,
  CellMediaProps,
  CellPriority,
  CellSpacing,
  IconButtonBaseProps,
  IllustrationPictogramNames,
  ListCellBaseProps,
} from '../types';

import { assets } from './data/assets';

const onPressConsole = () => console.log('onPress');

/** @deprecated don't use creator pattern in v8 */
export function listCellBuilder(
  ListCell: React.ComponentType<
    React.PropsWithChildren<
      ListCellBaseProps & {
        onPress?: () => void;
        disableMultilineTitle?: boolean;
      }
    >
  >,
  CellMedia: React.ComponentType<React.PropsWithChildren<CellMediaProps>>,
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps>>,
  IconButton: React.ComponentType<React.PropsWithChildren<IconButtonBaseProps>>,
  // Checkbox?: React.ComponentType<
  //   React.PropsWithChildren<ControlBaseProps<string> & { accessibilityLabel: string }>
  // >,
  Pictogram: React.ComponentType<React.PropsWithChildren<{ name: IllustrationPictogramNames }>>,
) {
  const Content = () => {
    return (
      <>
        <ListCell title="Title" />

        <ListCell detail="Detail" title="Title" />

        <ListCell description="Description" title="Title" />

        <ListCell description="Description" detail="Detail" title="Title" />

        <ListCell description="Description" detail="Detail" subdetail="Neutral" title="Title" />

        <ListCell detail="Detail" subdetail="Neutral" title="Title" />

        <ListCell
          description="Description"
          detail="Detail"
          subdetail="+Positive"
          title="Title"
          variant="positive"
        />

        <ListCell subdetail="+Positive" title="Title" variant="positive" />

        <ListCell
          description="Description"
          detail="Detail"
          subdetail="-Negative"
          title="Title"
          variant="negative"
        />

        <ListCell detail="Detail" subdetail="-Negative" title="Title" variant="negative" />

        <ListCell detail="Detail" subdetail="Warning" title="Title" variant="warning" />
      </>
    );
  };

  const CompactContent = () => {
    return (
      <>
        <ListCell compact title="Title" />

        <ListCell compact detail="Detail" title="Title" />

        <ListCell compact description="Description" title="Title" />

        <ListCell compact description="Description" detail="Detail" title="Title" />

        <ListCell
          compact
          description="Description"
          detail="Detail"
          subdetail="Neutral"
          title="Title"
        />

        <ListCell compact detail="Detail" subdetail="Neutral" title="Title" />

        <ListCell
          compact
          description="Description"
          detail="Detail"
          subdetail="+Positive"
          title="Title"
          variant="positive"
        />

        <ListCell compact subdetail="+Positive" title="Title" variant="positive" />

        <ListCell
          compact
          description="Description"
          detail="Detail"
          subdetail="-Negative"
          title="Title"
          variant="negative"
        />

        <ListCell compact detail="Detail" subdetail="-Negative" title="Title" variant="negative" />

        <ListCell compact detail="Detail" subdetail="Warning" title="Title" variant="warning" />
      </>
    );
  };

  const innerSpacingConfig: CellSpacing = { paddingX: 1 };

  const PressableContent = () => (
    <>
      <ListCell onPress={onPressConsole} title="Title" />

      <ListCell onPress={onPressConsole} subdetail="Neutral" title="Title" />

      <ListCell description="Multi-line description" onPress={onPressConsole} title="Title" />

      <ListCell
        multiline
        selected
        description="Multi-line description"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        disableSelectionAccessory
        multiline
        selected
        description="Multi-line description"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        multiline
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        multiline
        selected
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell description="Description" detail="Detail" onPress={onPressConsole} title="Title" />

      <ListCell
        description="Description"
        detail="Detail"
        innerSpacing={innerSpacingConfig}
        onPress={onPressConsole}
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        selected
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        disabled
        description="Description"
        detail="Detail"
        innerSpacing={innerSpacingConfig}
        onPress={onPressConsole}
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        disabled
        selected
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
        subdetail="+Postive"
        title="Title"
        variant="positive"
      />

      <ListCell
        disabled
        selected
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );

  const CompactPressableContent = () => (
    <>
      <ListCell compact onPress={onPressConsole} title="Title" />

      <ListCell compact onPress={onPressConsole} subdetail="Neutral" title="Title" />

      <ListCell
        compact
        multiline
        description="Multi-line description"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        compact
        multiline
        selected
        description="Multi-line description"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        compact
        multiline
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        compact
        multiline
        selected
        description="Multi-line description goes here with really long text"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        compact
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
        title="Title"
      />

      <ListCell
        compact
        description="Description"
        detail="Detail"
        innerSpacing={innerSpacingConfig}
        onPress={onPressConsole}
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        compact
        selected
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        compact
        disabled
        description="Description"
        detail="Detail"
        innerSpacing={innerSpacingConfig}
        onPress={onPressConsole}
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        compact
        disabled
        selected
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
        subdetail="+Postive"
        title="Title"
        variant="positive"
      />

      <ListCell
        compact
        disabled
        selected
        description="Description"
        detail="Detail"
        onPress={onPressConsole}
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );

  const LongContent = () => (
    <>
      <ListCell
        description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
        title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
      />
      <ListCell
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
        title="disableMultilineTitle === undefined. Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
      />
      <ListCell
        disableMultilineTitle
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
        title="disableMultilineTitle === true. Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
      />
      <ListCell
        multiline
        selected
        description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
        detail="Detail also has a very long string"
        subdetail="Neutral also does too"
        title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
      />
    </>
  );

  const cellPriorities: CellPriority[] = ['middle', 'end'];

  const PriorityContent = () => (
    <>
      <ListCell
        description="Some description of the asset"
        detail="$334,239.03"
        intermediary={<CellMedia name="chartLine" type="icon" />}
        priority="start"
        subdetail="+4.06%"
        title="Asset with a really long name"
        variant="positive"
      />
      <ListCell
        description="Some description of the asset"
        detail="$334,239.03"
        intermediary={<CellMedia name="chartLine" type="icon" />}
        priority="middle"
        subdetail="+4.06%"
        title="Asset with a really long name"
        variant="positive"
      />
      <ListCell
        description="Some description of the asset"
        detail="$334,239.03"
        intermediary={<CellMedia name="chartLine" type="icon" />}
        priority="end"
        subdetail="+4.06%"
        title="Asset with a really long name"
        variant="positive"
      />
      <ListCell
        description="Some description of the asset"
        detail="$334,239.03"
        intermediary={<CellMedia name="chartLine" type="icon" />}
        priority={cellPriorities}
        subdetail="+4.06%"
        title="Asset with a really long name"
        variant="positive"
      />
      <ListCell
        description="Some description of the asset"
        detail="$334,239.03"
        intermediary={<CellMedia name="chartLine" type="icon" />}
        priority={cellPriorities}
        subdetail="+4.06%"
        title="Asset with a really long name"
        variant="warning"
      />
    </>
  );

  const WithAccessory = () => (
    <>
      <ListCell accessory="arrow" title="Title" />

      <ListCell accessory="more" detail="Detail" title="Title" />

      <ListCell accessory="selected" description="Description" title="Title" />

      <ListCell accessory="arrow" description="Description" detail="Detail" title="Title" />

      <ListCell
        selected
        accessory="arrow"
        description="Description"
        detail="Detail"
        title="Title"
      />

      <ListCell
        disableSelectionAccessory
        selected
        accessory="arrow"
        description="Description"
        detail="Detail"
        title="Title"
      />

      <ListCell
        accessory="more"
        description="Description"
        detail="Detail"
        subdetail="Neutral"
        title="Title"
      />

      <ListCell
        accessory="selected"
        description="Description"
        detail="Detail"
        subdetail="+Positive"
        title="Title"
        variant="positive"
      />

      <ListCell
        accessory="arrow"
        description="Description"
        detail="Detail"
        subdetail="-Negative"
        title="Title"
        variant="negative"
      />

      <ListCell
        accessory="arrow"
        description="Description"
        detail="Detail"
        subdetail="Warning"
        title="Title"
        variant="warning"
      />
    </>
  );

  const WithMedia = () => (
    <>
      <ListCell media={<CellMedia name="email" type="icon" />} title="Icon" />

      <ListCell
        media={<CellMedia name="email" type="icon" />}
        onPress={onPressConsole}
        title="Icon (pressable)"
      />

      <ListCell
        description="Description"
        media={<CellMedia name="phone" type="icon" />}
        title="Icon"
      />

      <ListCell
        description="Description"
        detail="Detail"
        media={<CellMedia source={assets.eth.imageUrl} type="avatar" />}
        title="Avatar"
      />

      <ListCell
        description="Description"
        detail="Detail"
        media={<CellMedia source={assets.eth.imageUrl} type="asset" />}
        subdetail="Neutral"
        title="Asset"
      />

      <ListCell
        detail="Detail"
        media={<CellMedia source={assets.eth.imageUrl} type="image" />}
        title="Image"
      />

      <ListCell
        description="Description"
        media={<CellMedia illustration={<Pictogram name="shield" />} type="pictogram" />}
        title="Pictogram"
      />
    </>
  );

  const WithActions = () => (
    <>
      {/* <ListCell action={<Checkbox checked accessibilityLabel="Checkbox" />} title="Title" /> */}
      <ListCell action={<Button>Action</Button>} detail="Detail" title="Title" />

      <ListCell
        action={
          <Button compact variant="negative">
            Action
          </Button>
        }
        description="Description"
        title="Title"
      />

      <ListCell
        action={<IconButton accessibilityLabel="External link" name="externalLink" />}
        description="Description"
        detail="Detail"
        title="Title"
      />
    </>
  );

  const WithIntermediary = () => (
    <>
      <ListCell
        description="Description"
        detail="$1,230"
        detailWidth={100}
        intermediary={<CellMedia name="chartLine" type="icon" />}
        title="Title"
      />
      <ListCell
        description="Description"
        detail="$44,130"
        detailWidth={100}
        intermediary={<CellMedia name="chartLine" type="icon" />}
        title="Title"
      />
      <ListCell
        description="Description"
        detail="$942,103"
        detailWidth={100}
        intermediary={<CellMedia name="chartLine" type="icon" />}
        title="Title"
      />
      <ListCell
        description="Description"
        detail="$530"
        detailWidth={100}
        intermediary={<CellMedia name="chartLine" type="icon" />}
        title="Title"
      />
      <ListCell
        description="Description"
        detail="$123K"
        detailWidth={100}
        intermediary={<CellMedia name="chartLine" type="icon" />}
        title="Title"
      />
    </>
  );

  const CustomSpacing = () => (
    <>
      <ListCell
        selected
        borderRadius={0}
        description="Description"
        detail="$1,230"
        detailWidth={100}
        onPress={onPressConsole}
        title="Title"
        {...selectCellSpacingConfig}
      />
      <ListCell
        borderRadius={0}
        description="Description"
        detail="$1,230"
        detailWidth={100}
        onPress={onPressConsole}
        title="Title"
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
