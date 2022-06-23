import React, { memo, useCallback, useContext } from 'react';
import useDocgenPluginData from '@theme/useDocgenPluginData';
import { usePaletteValueToRgbaString } from '@cbhq/cds-web/color/usePaletteValueToRgbaString';
import { useSpacingStyles } from '@cbhq/cds-web/hooks/useSpacingStyles';
import { HStack } from '@cbhq/cds-web/layout';
import { Pressable } from '@cbhq/cds-web/system';
import { TextHeadline } from '@cbhq/cds-web/typography';
import type { DocgenProjectMetadata } from '@cbhq/docusaurus-plugin-docgen';

import DocgenProjectContext from './DocgenProjectContext';

/**
 * This would be a selector for choosing one of the project entryPoints
 * defined in docusaurus.config.js > docgen config.
 *
 * For example a project would be: common, web or mobile.
 *
 * We don't know if we are going to use this at the Navbar level yet.
 * If we do, this will likely get converted to Dropdown component.
 */
const DocgenProjectSelector = memo(function DocgenProjectSelector() {
  const { projects } = useDocgenPluginData();
  const { project: activeProject, setProject } = useContext(DocgenProjectContext);
  const getOnPressHandler = useCallback(
    (project: DocgenProjectMetadata) => {
      return () => {
        setProject(project);
      };
    },
    [setProject],
  );

  const activeForeground = usePaletteValueToRgbaString('gray0');
  const spacingStyles = useSpacingStyles({
    spacingVertical: 0.5,
    spacingHorizontal: 2,
  });

  return (
    <HStack
      dangerouslySetClassName="docgen-project-selector-wrapper"
      borderRadius="roundedLarge"
      overflow="hidden"
      justifyContent="space-between"
      minWidth={175}
    >
      {projects.map((project) => {
        const isActive = project.label === activeProject?.label;
        return (
          <Pressable
            key={project.label}
            backgroundColor={isActive ? 'foreground' : 'background'}
            onPress={getOnPressHandler(project)}
            className={spacingStyles}
          >
            <TextHeadline as="span" dangerouslySetColor={isActive ? activeForeground : undefined}>
              {project.label}
            </TextHeadline>
          </Pressable>
        );
      })}
    </HStack>
  );
});

export default DocgenProjectSelector;
