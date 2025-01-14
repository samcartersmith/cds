/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { type ComponentProps, useCallback, useEffect, useMemo } from 'react';
import Link from '@docusaurus/Link';
import {
  findFirstSidebarItemLink,
  isActiveSidebarItem,
  useDocSidebarItemsExpandedState,
} from '@docusaurus/plugin-content-docs/client';
import {
  Collapsible,
  ThemeClassNames,
  useCollapsible,
  usePrevious,
  useThemeConfig,
} from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { cx } from '@linaria/core';
import type { Props } from '@theme/DocSidebarItem/Category';
import DocSidebarItems from '@theme/DocSidebarItems';
import { IconName } from '@cbhq/cds-common2/types';
import { Icon } from '@cbhq/cds-web2/icons/Icon';
import { HStack } from '@cbhq/cds-web2/layout/HStack';
import { Pressable } from '@cbhq/cds-web2/system/Pressable';
import { Text } from '@cbhq/cds-web2/text/Text';

import styles from './styles.module.css';

// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (b: boolean) => void;
}) {
  const wasActive = usePrevious(isActive);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed]);
}

/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(item: Props['item']): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

function CollapseButton({
  collapsed,
  categoryLabel,
  onClick,
}: {
  collapsed: boolean;
  categoryLabel: string;
  onClick: ComponentProps<'button'>['onClick'];
}) {
  return (
    <button
      aria-expanded={!collapsed}
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
                description: 'The ARIA label to expand the sidebar category',
              },
              { label: categoryLabel },
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
                description: 'The ARIA label to collapse the sidebar category',
              },
              { label: categoryLabel },
            )
      }
      className="clean-btn menu__caret"
      onClick={onClick}
      type="button"
    />
  );
}

export default function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): JSX.Element {
  const { items, label, collapsible, className, href, customProps } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);

  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);

  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });

  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = useCallback(
    (toCollapsed = !collapsed) => {
      setExpandedItem(toCollapsed ? null : index);
      setCollapsed(toCollapsed);
    },
    [collapsed, index, setExpandedItem, setCollapsed],
  );
  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed });
  useEffect(() => {
    if (collapsible && expandedItem != null && expandedItem !== index && autoCollapseCategories) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  return (
    <li
      className={cx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        collapsed && 'menu__list-item--collapsed',
        className,
      )}
    >
      {level === 1 ? (
        <Pressable
          background="backgroundSecondary"
          borderRadius={600}
          onPress={
            collapsible
              ? (e) => {
                  onItemClick?.(item);
                  if (href) {
                    updateCollapsed(false);
                  } else {
                    e.preventDefault();
                    updateCollapsed();
                  }
                }
              : () => {
                  onItemClick?.(item);
                }
          }
          width="100%"
        >
          <HStack
            alignContent="center"
            alignItems="center"
            gap={1}
            justifyContent="space-between"
            paddingX={2}
            paddingY={1}
          >
            <HStack alignContent="center" alignItems="center" gap={1}>
              {typeof customProps?.icon === 'string' && (
                <Icon color="textForeground" name={customProps.icon as IconName} size="s" />
              )}
              <Text font="label1">{label}</Text>
            </HStack>
            <Icon
              color="textForeground"
              name={expandedItem === index ? 'minus' : 'add'}
              paddingRight={2}
              size="s"
            />
          </HStack>
        </Pressable>
      ) : (
        <div
          className={cx(
            'menu__list-item-collapsible',
            isCurrentPage && 'menu__list-item-collapsible--active',
            styles.menuListItemCollapsibleHover,
          )}
        >
          <Link
            aria-current={isCurrentPage ? 'page' : undefined}
            aria-expanded={collapsible && !href ? !collapsed : undefined}
            className={cx(
              'menu__link',
              collapsible && 'menu__link--sublist',
              isActive && 'menu__link--active',
              level === 1 && 'menu__link--collapsible',
            )}
            href={collapsible ? hrefWithSSRFallback ?? '#' : hrefWithSSRFallback}
            onClick={
              collapsible
                ? (e) => {
                    onItemClick?.(item);
                    if (href) {
                      updateCollapsed(false);
                    } else {
                      e.preventDefault();
                      updateCollapsed();
                    }
                  }
                : () => {
                    onItemClick?.(item);
                  }
            }
            role={collapsible && !href ? 'button' : undefined}
            {...props}
          >
            <HStack
              alignContent="center"
              alignItems="center"
              gap={1}
              justifyContent="space-between"
              paddingX={0.5}
              width="100%"
            >
              <Text color="textForeground" font="label2">
                {label}
              </Text>
              {level !== 1 && (
                <Icon
                  color="textForeground"
                  name={expandedItem === index ? 'caretUp' : 'caretDown'}
                  paddingRight={0}
                  size="s"
                />
              )}
            </HStack>
          </Link>
          {href && collapsible && (
            <CollapseButton
              categoryLabel={label}
              collapsed={collapsed}
              onClick={(e) => {
                e.preventDefault();
                updateCollapsed();
              }}
            />
          )}
        </div>
      )}

      <Collapsible
        lazy
        as="ul"
        className={cx('menu__list', styles.menuListCollapsible)}
        collapsed={collapsed}
      >
        <DocSidebarItems
          activePath={activePath}
          items={items}
          level={level + 1}
          onItemClick={onItemClick}
          tabIndex={collapsed ? -1 : 0}
        />
      </Collapsible>
    </li>
  );
}
