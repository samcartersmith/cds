import React, { useMemo } from 'react';
import { BaseAnnotations } from '@storybook/addons';
import { merge, omit, isObject } from 'lodash';
import { generateRandomId } from '@cbhq/cds-utils';
import { ArgTypes, Story, Parameters } from '@storybook/react';
import { Scale, Spectrum } from '@cbhq/cds-common/types';

const emptyObject = {};

export type StoryBuilderConfig<Args = unknown> = {
  args?: {
    frontier?: boolean;
    spectrum?: Spectrum;
    scale?: Scale;
  } & Args;
  argTypes?: ArgTypes;
  parameters?: Parameters & {
    stories?: Story[];
    wrapper?: React.ComponentType;
  };
};

const baseConfig = {
  args: {
    frontier: false,
    scale: 'large',
    spectrum: 'light',
  },
  argTypes: {
    // Global args for all stories built with storyBuilder
    frontier: {
      control: 'boolean',
      description: 'Toggle all Frontier feature flags at once',
    },
    scale: {
      options: ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge'],
      control: 'radio',
      description: 'Scale to pull sizes from',
    },
    spectrum: {
      options: ['light', 'dark'],
      control: 'radio',
      description: 'Spectrum to pull palette colors from',
    },
  },
  parameters: {
    // Percy specific params
    percy: {
      additionalSnapshots: [
        { prefix: '[Dark mode] ', args: { spectrum: 'dark' } },
        { prefix: '[xSmall scale] ', args: { scale: 'xSmall' } },
        { prefix: '[small mode] ', args: { scale: 'small' } },
        { prefix: '[medium mode] ', args: { scale: 'medium' } },
        { prefix: '[xLarge mode] ', args: { scale: 'xLarge' } },
        { prefix: '[xxxLarge mode] ', args: { scale: 'xxxLarge' } },
      ],
    },
  },
};

export function storyBuilder<StoryBuilderArgs>(
  builderConfig?: StoryBuilderConfig<StoryBuilderArgs>,
) {
  function builder<Props, PropsWithoutChildren extends Omit<Props, 'children'>>(
    Component: React.ComponentType<Props>,
    sharedConfig?: StoryBuilderConfig<PropsWithoutChildren>,
  ) {
    const storiesSet = new Set<Story>();
    const defaultConfig = merge({}, baseConfig, builderConfig);

    const build = (
      args?: PropsWithoutChildren,
      customConfig?: StoryBuilderConfig<PropsWithoutChildren>,
    ) => {
      const id = generateRandomId();
      const TemplateFn = (props: Props) => {
        const sanitizedProps = useMemo(() => {
          if (isObject(props)) {
            return omit(props, ['frontier', 'scale', 'spectrum']) as Props;
          }
          return emptyObject as Props;
        }, [props]);
        return <Component key={id} {...sanitizedProps} />;
      };
      const Template = TemplateFn.bind({}) as unknown as Story;
      const mergedConfig = merge(
        {},
        defaultConfig,
        sharedConfig,
        { args },
        customConfig,
      ) as unknown as BaseAnnotations<Props, Story>;
      Template.parameters = mergedConfig.parameters;
      Template.args = mergedConfig.args;
      Template.argTypes = mergedConfig.argTypes;
      storiesSet.add(Template);
      return Template;
    };

    const buildSheet = (
      args?:
        | PropsWithoutChildren
        | PropsWithoutChildren[]
        | Readonly<PropsWithoutChildren | PropsWithoutChildren[]>,
      config?: StoryBuilderConfig<PropsWithoutChildren>,
    ) => {
      let stories = Array.from(storiesSet.values());
      const StorySheet = () => null;
      const Template = StorySheet.bind({}) as unknown as Story;

      if (Array.isArray(args)) {
        const storiesOverride: Story[] = [];
        args.forEach((itemArgs) => {
          stories.forEach((StoryTemplate) => {
            const StoryTemplateCopy = StoryTemplate.bind({});
            StoryTemplateCopy.args = merge({}, StoryTemplate.args, itemArgs);
            StoryTemplateCopy.argTypes = StoryTemplate.argTypes;
            storiesOverride.push(StoryTemplateCopy);
          });
        });
        stories = storiesOverride;
      }

      const mergedConfig = merge({}, defaultConfig, sharedConfig, config);
      Template.args = Array.isArray(args) ? mergedConfig.args : args;
      Template.argTypes = merge({}, mergedConfig.argTypes, stories[0].argTypes);
      Template.parameters = {
        ...mergedConfig.parameters,
        stories,
      };
      return Template;
    };

    return { build, buildSheet };
  }
  return builder;
}
