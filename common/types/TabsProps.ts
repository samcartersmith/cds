import { PropsWithChildren, ReactElement } from 'react';
import { SetState } from './React';
import { SharedProps } from './SharedProps';

type OnChange<T extends string | undefined = string> = ((tabId: T) => void) | SetState<T>;
export type TabsProps<T extends string | undefined = string> = {
  /** The active tabId */
  value?: T;
  /** Use the onChange handler to deal with any side effects, ie event tracking or showing a tooltip */
  onChange?: OnChange<T>;
  /** Children should only be Tab's. If you only have one child, don't use tabs 🤪 */
  children: ReactElement[];
  /** Use the disableSwipe prop to prevent swiping to change tabs */
  disableSwipe?: boolean;
} & SharedProps;

export type TabProps<T extends string | undefined = string> = PropsWithChildren<{
  /** The id should be a meaningful and useful identifier like "watchlist" or "forSale" */
  id: T;
  /** Define a label for this Tab */
  label: string;
  /** See the Tabs TDD to understand which variant should be used.
   *  @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Callback to fire when pressed */
  onPress?: (id: T) => void;
}> &
  SharedProps;

export type TabLabelProps = {
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Identify the active tab */
  active?: boolean;
  /** Select a tab variant.
   *  @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** Display title to render as the TabLabel. */
  children: string;
  /** Callback to fire when pressed */
  onPress?: () => void;
} & SharedProps;

export type TabIndicatorProps = {
  /** The width of the active TabLabel. */
  width: number;
  /** The xPosition of the active TabLabel. */
  x: number;
} & SharedProps;

export type TabNavigationProps<T extends string | undefined = string> = {
  /** The active tabId
   *  @default tabs[0].id
   */
  value?: T;
  /** Children should be TabLabels. If you only have one child, don't use tabs 🤪 */
  tabs: Omit<TabProps, 'children'>[];
  /** Use the onChange handler to deal with any side effects, ie event tracking or showing a tooltip */
  onChange: OnChange<T>;
  /** See the Tabs TDD to understand which variant should be used.
   *  @default 'primary'
   */
  variant?: 'primary' | 'secondary';
} & SharedProps;
