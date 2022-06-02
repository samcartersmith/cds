import Link from '@docusaurus/Link';
import { isActiveSidebarItem } from '@docusaurus/theme-common';
import JSDocTag, { JSDocTagVariant } from '@theme/JSDocTag';
import type { SpacingScale } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { AnimatedCaret } from '@cbhq/cds-web/motion/AnimatedCaret';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextBody, TextCaption } from '@cbhq/cds-web/typography';

export type PropSidebarItem = PropSidebarItemLink | PropSidebarItemCategory;

// Makes all properties visible when hovering over the type
type Expand<T extends Record<string, unknown>> = { [P in keyof T]: T[P] };

type CustomProps = {
  hidden?: boolean;
  tag?: JSDocTagVariant;
};

type PropSidebarItemCategory = {
  type: 'category';
  label: string;
  collapsed: boolean;
  collapsible: boolean;
  items: PropSidebarItem[];
  href?: string;
  customProps?: CustomProps;
};

type PropSidebarItemLink = {
  docId?: string;
  type: 'link';
  href: string;
  label: string;
  customProps?: CustomProps;
};

export type DocSidebarItemProps = {
  activePath: string;
  index: number;
  item: PropSidebarItem;
  level: SpacingScale;
  parentLevel?: SpacingScale;
};

export type CollapsibleCategoryProps = Expand<
  DocSidebarItemProps & {
    item: PropSidebarItemCategory;
  }
>;

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
        <HStack gap={2} spacingHorizontal={2} alignItems="center" justifyContent="space-between">
          <TextBody as="p" color={isActive ? 'primary' : 'foregroundMuted'} spacingVertical={1}>
            {item.label}
          </TextBody>
          {typeof item.customProps?.tag === 'string' ? (
            <JSDocTag variant={item.customProps.tag} />
          ) : null}
        </HStack>
      </Pressable>
    </VStack>
  );
}

function CollapsibleCategory({
  item,
  activePath,
  level,
  parentLevel = 0,
}: CollapsibleCategoryProps) {
  const [expanded, { toggle }] = useToggler(level === 1);
  const collapsed = !expanded;
  return (
    <VStack spacingHorizontal={0}>
      <Pressable
        backgroundColor="background"
        borderRadius="popover"
        onPress={toggle}
        noScaleOnPress
        transparentWhileInactive
      >
        <HStack
          width="100%"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
          spacingHorizontal={2}
          flexWrap="wrap"
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
          <HStack gap={2} alignItems="center" justifyContent="space-between">
            {typeof item.customProps?.tag === 'string' ? (
              <JSDocTag variant={item.customProps.tag} />
            ) : null}
            <AnimatedCaret rotate={collapsed ? 90 : 180} />
          </HStack>
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
    case 'link':
    default: {
      return item.customProps?.hidden ? null : <SidebarItemLink item={item} {...props} />;
    }
  }
}
