import React, { forwardRef, Fragment, memo, useMemo } from 'react';
import { ActionImpl } from 'kbar';
import { PictogramName } from '@cbhq/cds-common2';
import { Cell } from '@cbhq/cds-web2/cells/Cell';
import { Icon } from '@cbhq/cds-web2/icons/Icon';
import { Pictogram } from '@cbhq/cds-web2/illustrations/Pictogram';
import { HStack, VStack } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/typography/Text';

type KBarResultItemProps = {
  action: ActionImpl & {
    pictogram?: PictogramName;
  };
  active: boolean;
  currentRootActionId?: string | null | undefined;
};

const cellSpacingProps = {
  innerSpacing: { paddingX: 2, paddingY: 1 },
  outerSpacing: { paddingX: 1, paddingBottom: 1, paddingTop: 0 },
} as const;

const KBarResultItem = memo(
  forwardRef(
    (
      { action, active, currentRootActionId }: KBarResultItemProps,
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const ancestors = useMemo(() => {
        if (!currentRootActionId) return action.ancestors;
        const index = action.ancestors.findIndex((ancestor) => ancestor.id === currentRootActionId);
        return action.ancestors.slice(index + 1);
      }, [action.ancestors, currentRootActionId]);

      const title = useMemo(() => {
        return (
          <HStack gap={1}>
            {ancestors?.map((ancestor) => (
              <Fragment key={ancestor.id}>
                <Text as="span" color="fgMuted">
                  {ancestor.name}
                </Text>
                <Text as="span" color="fgMuted">
                  &rsaquo;
                </Text>
              </Fragment>
            ))}
            <Text as="span" color={active ? 'fgPrimary' : 'fg'}>
              {action.name}
            </Text>
          </HStack>
        );
      }, [action.name, ancestors, active]);

      const media = useMemo(() => {
        if (action.pictogram) {
          return <Pictogram name={action.pictogram} />;
        }
        return (
          <HStack alignItems="center" height={24}>
            <Icon name="compass" size="s" color={active ? 'fgPrimary' : 'fg'} />
          </HStack>
        );
      }, [action, active]);

      return (
        <HStack
          gap={1.5}
          background={active ? 'bgSecondary' : 'bg'}
          paddingX={3}
          paddingY={1}
          ref={ref}
          style={{
            cursor: 'pointer',
          }}
        >
          {media}
          <VStack>
            {title}
            {!!action.subtitle && (
              <Text as="div" color="fgMuted" font="body" overflow="truncate">
                {action.subtitle}
              </Text>
            )}
          </VStack>
        </HStack>
      );
    },
  ),
);

export default KBarResultItem;
