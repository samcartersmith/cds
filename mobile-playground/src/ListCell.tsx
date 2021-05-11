import { Button, IconButton } from '@cbhq/cds-mobile/buttons';
import { ListCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { Checkbox } from '@cbhq/cds-mobile/controls/Checkbox';

import { mockAsset } from './constants';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const ListCellScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Content only">
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
      </Example>

      <Example title="Pressable content">
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
      </Example>

      <Example title="Long content">
        <ListCell
          title="Title with a very long length that should wrap to 2 lines when there is no subtitle or description"
          description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
          detail="Detail also has a very long string"
          subdetail="Neutral also does too"
        />
      </Example>

      <Example title="With accessory">
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
      </Example>

      <Example title="With media">
        <ListCell title="Title" media={<CellMedia type="icon" name="email" />} />

        <ListCell
          title="Title"
          detail="Detail"
          media={<CellMedia type="image" source={mockAsset} />}
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
          media={<CellMedia type="photo" source={mockAsset} />}
        />

        <ListCell
          title="Title"
          description="Description"
          detail="Detail"
          subdetail="Neutral"
          media={<CellMedia type="asset" source={mockAsset} />}
        />
      </Example>

      <Example title="With actions">
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
      </Example>
    </ExamplesScreen>
  );
};

export default ListCellScreen;
