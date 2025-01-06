import { ThemeVars } from '../new/vars';

import { type BoxBaseProps } from './BoxBaseProps';
import { type DotCountBaseProps } from './DotCountBaseProps';
import { type SetState } from './React';
import { type SharedProps } from './SharedProps';

type OnChange<T extends string | undefined = string> = ((tabId: T) => void) | SetState<T>;

/**
 * This is only used on the apps/website, not used by consumers as of Nov 29, 2023
 */
export type TabsProps<T extends string | undefined = string> = {
  /** The active tabId */
  value?: T;
  /** Use the onChange handler to deal with any side effects, ie event tracking or showing a tooltip */
  onChange?: OnChange<T>;
  /** Children should only be Tab's. If you only have one child, don't use tabs 🤪 */
  children: React.ReactElement[];
  /** Use the disableSwipe prop to prevent swiping to change tabs */
  disableSwipe?: boolean;
} & SharedProps;

export type TabProps<T extends string | undefined = string> = {
  /** The id should be a meaningful and useful identifier like "watchlist" or "forSale" */
  id: T;
  /** Define a label for this Tab */
  label: React.ReactNode;
  /** See the Tabs TDD to understand which variant should be used.
   *  @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** Disable interactions on the tab. */
  disabled?: boolean;
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Callback to fire when pressed */
  onPress?: (id: T) => void;
  /** Render a custom Component for the Tab */
  Component?: (props: CustomTabProps) => React.ReactElement;
} & Partial<Pick<DotCountBaseProps, 'count' | 'max'>> &
  SharedProps;

export type TabLabelProps = {
  /** Identify the active tab */
  active?: boolean;
  /** Display title to render as the TabLabel. */
  children: React.ReactNode;
  /** Callback to fire when pressed */
  onPress?: () => void;
} & Pick<TabProps, 'variant' | 'count' | 'accessibilityLabel' | 'max' | 'Component'> &
  SharedProps;

export type TabIndicatorProps = {
  /** The width of the active TabLabel. */
  width: number;
  /** The xPosition of the active TabLabel. */
  x: number;
  /** This should always match the background color of the parent container
   * @default: 'background'
   */
  background?: ThemeVars.Color;
} & SharedProps;

export type CustomTabProps = {
  /**
   * @default false
   * When true, used to surface an active state for the currently selected tab
   */
  active?: boolean;
} & Pick<TabProps, 'label' | 'id'>;

export type TabNavigationProps<T extends string | undefined = string> = {
  /** The active tabId
   *  @default tabs[0].id
   */
  value?: T;
  /** Children should be TabLabels. If you only have one child, don't use tabs 🤪 */
  tabs: TabProps[];
  /** Use the onChange handler to deal with any side effects, ie event tracking or showing a tooltip */
  onChange: OnChange<T>;
  /** This should always match the background color of the parent container
   * @default: 'background'
   */
  background?: ThemeVars.Color;
  /**
   * The spacing between Tabs
   * @default 4
   */
  gap?: ThemeVars.Space;
  /**
   * Used to generate a11y attributes for the Tabs
   * If TabNavigation is used to display options that will filter data, use `radiogroup`
   * If TabNavigation is used to display a list of pages or views, use `tablist`
   * @default tablist
   */
  role?: 'radiogroup' | 'tablist';
  /**
   * Web only. Accessibility label for the previous arrow paddle (skip to beginning).
   */
  previousArrowAccessibilityLabel?: string | undefined;
  /**
   * Web only. Accessibility label for the next arrow paddle (skip to end).
   */
  nextArrowAccessibilityLabel?: string | undefined;
  /**
   * Web only. Styling for the paddle icon buttons. Mobile does not have paddles.
   */
  paddleStyle?: React.CSSProperties;
} & Pick<TabProps, 'variant' | 'Component'> &
  BoxBaseProps &
  SharedProps;
