import Link from '@docusaurus/Link';
import type {
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import { isActiveSidebarItem } from '@docusaurus/theme-common';
import type { SpacingScale } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { CollapseArrow, Collapsible } from '@cbhq/cds-web/collapsible';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextBody, TextCaption } from '@cbhq/cds-web/typography';

export type DocSidebarItemProps = {
  activePath: string;
  index: number;
  item: PropSidebarItem;
  level: SpacingScale;
  parentLevel?: SpacingScale;
};

function addLevel(level: SpacingScale, increment: SpacingScale) {
  return (level + increment) as unknown as SpacingScale;
}

function SidebarItemLink({
  item,
  activePath,
}: DocSidebarItemProps & { item: PropSidebarItemLink }) {
  const isActive = isActiveSidebarItem(item, activePath);

  return (
    <VStack>
      <Pressable
        as={Link}
        key={item.label}
        transparentWhileInactive
        backgroundColor="background"
        borderRadius="popover"
        to={item.href}
        noScaleOnPress
      >
        <TextBody
          as="p"
          color={isActive ? 'primary' : 'foregroundMuted'}
          spacingHorizontal={2}
          spacingVertical={1}
        >
          {item.label}
        </TextBody>
      </Pressable>
    </VStack>
  );
}

function CollapsibleCategory({
  item,
  activePath,
  level,
  parentLevel = 0,
}: DocSidebarItemProps & { item: PropSidebarItemCategory }) {
  const [expanded, { toggle }] = useToggler(level === 1);
  const collapsed = !expanded;
  return (
    <VStack spacingHorizontal={0}>
      <Pressable
        backgroundColor="background"
        borderRadius="popover"
        onPress={toggle}
        noScaleOnPress
      >
        <HStack
          width="100%"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
          spacingHorizontal={2}
        >
          {parentLevel === 0 && level === 1 ? (
            <TextCaption as="p" spacingVertical={2} noWrap overflow="truncate">
              {item.label}
            </TextCaption>
          ) : (
            <TextBody as="p" color="foregroundMuted" spacingVertical={1} noWrap overflow="truncate">
              {item.label}
            </TextBody>
          )}
          <CollapseArrow collapsed={collapsed} degrees={90} />
        </HStack>
      </Pressable>
      <Collapsible collapsed={collapsed}>
        <VStack width="100%" spacingHorizontal={parentLevel}>
          {item.items.map((val, index) => (
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <DocSidebarItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${level}-${index}`}
              index={index}
              level={addLevel(level, 1)}
              parentLevel={level}
              activePath={activePath}
              item={val}
            />
          ))}
        </VStack>
      </Collapsible>
    </VStack>
  );
}

export default function DocSidebarItem({
  item,
  ...props
}: DocSidebarItemProps): JSX.Element | null {
  switch (item.type) {
    case 'category':
      return <CollapsibleCategory item={item} {...props} />;
    case 'html':
      return null;
    case 'link':
    default: {
      return item?.customProps?.hide ? null : <SidebarItemLink item={item} {...props} />;
    }
  }
}
