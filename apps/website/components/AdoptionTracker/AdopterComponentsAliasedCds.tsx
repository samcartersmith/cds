import React, { memo, useCallback, useState } from 'react';
import { Icon } from '@cbhq/cds-web/icons';
import { Divider, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import { useGetGitLink } from ':cds-website/components/AdoptionTracker/hooks/useGetGitLink';
import { ComponentData } from ':cds-website/components/AdoptionTracker/types';
import { BetaCell } from ':cds-website/components/BetaCell';

export const AdopterComponentsAliasedCds = memo(
  ({ aliasedCdsComponents }: { aliasedCdsComponents: ComponentData['aliasedCdsComponents'] }) => {
    const getGitLink = useGetGitLink();

    const [activeProp, setActiveProp] = useState<string | undefined>();
    const handleOnPress = useCallback(
      (prop: string) => {
        return () => {
          setActiveProp(prop === activeProp ? undefined : prop);
        };
      },
      [activeProp],
    );

    const handleOnPropCallSite = useCallback(
      (callSite: string) => {
        return () => window?.open(getGitLink(callSite), '_blank');
      },
      [getGitLink],
    );

    const selectedContent = useCallback(
      (aliasPath: string, callSites: string[]) => {
        // TODO add source File with callsite header
        return (
          <VStack>
            <TextLabel1 as="p" spacingTop={2}>
              Source File
            </TextLabel1>
            <BetaCell
              priority="end"
              offsetHorizontal={1}
              onPress={handleOnPropCallSite(aliasPath)}
              start={
                <TextLabel2 as="p" overflow="truncate">
                  {aliasPath}
                </TextLabel2>
              }
              end={
                <TextLabel2 as="p" align="end">
                  1 file
                </TextLabel2>
              }
              endAccessory={<Icon size="s" name="externalLink" color="foregroundMuted" />}
            />

            <TextLabel1 as="p" spacingTop={2}>
              Call Sites
            </TextLabel1>
            {callSites.map((callSite) => (
              <BetaCell
                priority="end"
                offsetHorizontal={1}
                onPress={handleOnPropCallSite(callSite)}
                start={
                  <TextLabel2 as="p" overflow="truncate">
                    {callSite}
                  </TextLabel2>
                }
                end={
                  <TextLabel2 as="p" align="end">
                    1 file
                  </TextLabel2>
                }
                endAccessory={<Icon size="s" name="externalLink" color="foregroundMuted" />}
              />
            ))}

            <Divider spacingTop={2} spacingBottom={2} />
          </VStack>
        );
      },
      [handleOnPropCallSite],
    );

    const sortedAliasedComponents = aliasedCdsComponents?.sort(
      (c1, c2) => c2.callSites.length - c1.callSites.length,
    );

    return (
      <VStack>
        <TextHeadline as="h4" spacingBottom={1}>
          Aliased Components
        </TextHeadline>
        {sortedAliasedComponents?.map(({ aliasPath, callSites }) => {
          const callSiteCount = callSites.length;
          const selected = activeProp === aliasPath;
          const instancesText = callSiteCount === 1 ? 'instance' : 'instances';
          return (
            <>
              <BetaCell
                key={aliasPath}
                priority="end"
                offsetHorizontal={1}
                start={
                  <TextLabel2 as="p" overflow="truncate">
                    {aliasPath}
                  </TextLabel2>
                }
                end={
                  <TextLabel2 as="p" align="end">{`${callSiteCount} ${instancesText}`}</TextLabel2>
                }
                endAccessory={
                  <Icon
                    size="s"
                    name={selected ? 'caretUp' : 'caretDown'}
                    color={selected ? 'primary' : 'foregroundMuted'}
                  />
                }
                onPress={handleOnPress(aliasPath)}
                selected={selected}
              />
              {selected && selectedContent(aliasPath, callSites)}
            </>
          );
        })}
      </VStack>
    );
  },
);
