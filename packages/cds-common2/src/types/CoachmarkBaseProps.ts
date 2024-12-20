import { DimensionValue } from './DimensionStyles';
import { SharedProps } from './SharedProps';

export type CoachmarkBaseProps = {
  /**
   * Title of the Coachmark. Text or ReactNode
   */
  title: React.ReactNode;
  /**
   * Content of the Coachmark. Text or ReactNode to be rendered below the title
   */
  content: React.ReactNode;
  /**
   * Checkbox component to be rendered below the content
   */
  checkbox?: React.ReactNode;
  /**
   * Media of the Coachmark
   */
  media?: React.ReactNode;
  /**
   * Callback function fired when close button is pressed
   */
  onClose?: () => void;
  /**
   * Action button for next step or ending the tour
   */
  action: React.ReactNode;
  /**
   * Desired width of the Coachmark with respect to max width of windowWidth - spacing2 * 2
   */
  width?: DimensionValue;
  /**
   * a11y label of the close button
   */
  closeButtonAccessibilityLabel?: string;
} & SharedProps;
