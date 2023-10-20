import React, { forwardRef, Fragment, memo, useMemo } from 'react';
import KBarListCell from '@theme/KBarListCell';
import { KBarResultItemProps } from '@theme/KBarResultItem';
import { Pictogram, SpotSquare } from '@cbhq/cds-web/illustrations';
import { HStack } from '@cbhq/cds-web/layout';
import { RemoteImage } from '@cbhq/cds-web/media';

const cellOuterSpacing = { spacingVertical: 0, spacingBottom: 1 } as const;

const KBarResultItem = memo(
  forwardRef(
    (
      { action, active, currentRootActionId }: KBarResultItemProps,
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const ancestors = useMemo(() => {
        if (!currentRootActionId) return action.ancestors;
        const index = action.ancestors.findIndex((ancestor) => ancestor.id === currentRootActionId);
        // +1 removes the currentRootAction; e.g.
        // if we are on the "Set theme" parent action,
        // the UI should not display "Set theme… > Dark"
        // but rather just "Dark"
        return action.ancestors.slice(index + 1);
      }, [action.ancestors, currentRootActionId]);

      const shortcut = useMemo(() => {
        return action.shortcut?.length ? (
          <div aria-hidden style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                style={{
                  padding: '4px 6px',
                  background: 'rgba(0 0 0 / .1)',
                  borderRadius: '4px',
                  fontSize: 14,
                }}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null;
      }, [action.shortcut]);

      const searchPrefix = useMemo(() => {
        if (ancestors.length > 0) {
          return ancestors.map((ancestor) => (
            <Fragment key={ancestor.id}>
              <span
                style={{
                  opacity: 0.5,
                  marginRight: 8,
                }}
              >
                {ancestor.name}
              </span>
              <span
                style={{
                  marginRight: 8,
                }}
              >
                &rsaquo;
              </span>
            </Fragment>
          ));
        }
        return null;
      }, [ancestors]);

      const title = useMemo(() => {
        return (
          <HStack>
            {searchPrefix}
            {action.name}
          </HStack>
        );
      }, [action.name, searchPrefix]);

      const media = useMemo(() => {
        if (action.spotSquare) {
          return <SpotSquare name={action.spotSquare} />;
        }

        if (action.pictogram) {
          return <Pictogram name={action.pictogram} />;
        }

        if (action.image) {
          return <RemoteImage alt={action.name} size="xl" source={action.image} />;
        }
        return undefined;
      }, [action.image, action.name, action.pictogram, action.spotSquare]);

      return (
        <KBarListCell
          ref={ref}
          compact
          accessory={active ? '↩' : undefined}
          action={shortcut}
          description={action.subtitle}
          media={media}
          outerSpacing={cellOuterSpacing}
          selected={active}
          title={title}
        />
      );
    },
  ),
);

export default KBarResultItem;
