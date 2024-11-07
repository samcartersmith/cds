import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import { isActiveSidebarItem } from '@docusaurus/theme-common/lib';
import JSDocTag, { JSDocTagVariant } from '@theme/JSDocTag';
import type { Expand, SpacingScale } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { AnimatedCaret } from '@cbhq/cds-web/motion/AnimatedCaret';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextBody, TextCaption } from '@cbhq/cds-web/typography';

export type PropSidebarItem = PropSidebarItemLink | PropSidebarItemCategory;

export type SidebarItemCustomProps = {
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
  customProps?: SidebarItemCustomProps;
};

type PropSidebarItemLink = {
  docId?: string;
  type: 'link';
  href: string;
  label: string;
  customProps?: SidebarItemCustomProps;
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
        key={item.label}
        noScaleOnPress
        transparentWhileInactive
        as={Link}
        background="background"
        borderRadius="roundedLarge"
        to={item.href}
      >
        <HStack alignItems="center" gap={2} justifyContent="space-between" spacingHorizontal={2}>
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
  const isActive = isActiveSidebarItem(item, activePath);
  const [collapsed, { toggle, toggleOff }] = useToggler(isActive ? false : item.collapsed);

  // expand if corresponding page is active
  useEffect(() => {
    if (isActive) {
      toggleOff();
    }
  }, [isActive, toggleOff]);

  return (
    <VStack spacingHorizontal={0}>
      <Pressable
        noScaleOnPress
        transparentWhileInactive
        background="background"
        borderRadius="roundedLarge"
        onPress={toggle}
      >
        <HStack
          alignItems="center"
          flexWrap="wrap"
          gap={1}
          justifyContent="space-between"
          spacingHorizontal={2}
          width="100%"
        >
          {parentLevel === 0 && level === 1 ? (
            <TextCaption noWrap as="p" overflow="truncate" spacingVertical={2}>
              {item.label}
            </TextCaption>
          ) : (
            <TextBody noWrap as="p" color="foregroundMuted" overflow="truncate" spacingVertical={1}>
              {item.label}
            </TextBody>
          )}
          <HStack alignItems="center" gap={2} justifyContent="space-between">
            {typeof item.customProps?.tag === 'string' ? (
              <JSDocTag variant={item.customProps.tag} />
            ) : null}
            <AnimatedCaret rotate={collapsed ? 90 : 180} />
          </HStack>
        </HStack>
      </Pressable>
      <Collapsible collapsed={collapsed}>
        <VStack spacingHorizontal={parentLevel} width="100%">
          {item.items.map((val, index) => (
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <DocSidebarItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${level}-${index}`}
              activePath={activePath}
              index={index}
              item={val}
              level={addLevel(level, 1)}
              parentLevel={level}
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
      return item.customProps?.hidden ? null : <CollapsibleCategory item={item} {...props} />;
    case 'link':
    default: {
      return item.customProps?.hidden ? null : <SidebarItemLink item={item} {...props} />;
    }
  }
}
