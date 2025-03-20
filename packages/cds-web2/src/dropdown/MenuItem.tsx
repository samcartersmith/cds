import React, { forwardRef, memo, useCallback } from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { useSelectContext } from '../controls/selectContext';
import { SelectOptionProps } from '../controls/SelectOption';
import type { Polymorphic } from '../core/polymorphism';
import { insetFocusRing } from '../styles/focus';
import {
  Pressable,
  type PressableBaseProps,
  type PressableDefaultElement,
  type PressableProps,
} from '../system/Pressable';

export const menuitemDefaultElement = 'button';

export type MenuitemDefaultElement = typeof menuitemDefaultElement;

export type MenuitemBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'background'>,
  {
    children: NonNullable<React.ReactNode>;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
  } & Pick<SelectOptionProps, 'disableCloseOnOptionChange' | 'value' | 'tabIndex'>
>;

export type MenuitemProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  MenuitemBaseProps
>;

type MenuitemComponent = (<AsComponent extends React.ElementType = MenuitemDefaultElement>(
  props: MenuitemProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const MenuItem: MenuitemComponent = memo(
  forwardRef<React.ReactElement<MenuitemBaseProps>, MenuitemBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        background = 'transparent',
        children,
        value,
        onClick,
        disableCloseOnOptionChange,
        tabIndex = -1,
        ...props
      }: MenuitemProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? menuitemDefaultElement) satisfies React.ElementType;

      const { onChange, handleCloseMenu } = useSelectContext();

      const handleClick: NonNullable<PressableProps<PressableDefaultElement>['onClick']> =
        useCallback(
          (event) => {
            onClick?.(event);
            onChange?.(value);
            if (!disableCloseOnOptionChange) {
              handleCloseMenu?.();
            }
          },
          [disableCloseOnOptionChange, handleCloseMenu, onChange, onClick, value],
        );
      return (
        <Pressable
          ref={ref}
          noScaleOnPress
          as={Component}
          background={background}
          className={insetFocusRing}
          onClick={handleClick}
          role="menuitem"
          tabIndex={tabIndex}
          {...props}
        >
          {children}
        </Pressable>
      );
    },
  ),
);
