import { ListCellBaseProps } from './CellBaseProps';
import { CollapsibleBaseProps } from './CollapsibleBaseProps';
import { SharedProps } from './SharedProps';

export type AccordionBaseProps = {
  /**
   * Default active accordion item key.
   * If not specified or does not exist in the accordion items,
   * all items will be closed on mount
   */
  defaultActiveKey?: string;
  /**
   * Callback function fired when any of accordion items is pressed
   */
  onChange?: (key: string) => void;
  children:
    | React.ReactElement<AccordionItemBaseProps>[]
    | React.ReactElement<AccordionItemBaseProps>;
} & SharedProps;

export type AccordionItemBaseProps = Omit<
  AccordionHeaderBaseProps & AccordionPanelBaseProps,
  'collapsed'
>;

export type AccordionHeaderBaseProps = {
  /**
   * Callback function fired when the accordion item is pressed
   */
  onPress?: (key: string) => void;
} & AccordionCommonProps &
  AccordionMediaBaseProps &
  AccordionTitleBaseProps &
  AccordionIconBaseProps;

export type AccordionPanelBaseProps = Pick<CollapsibleBaseProps, 'collapsed' | 'children'> &
  AccordionCommonProps;

export type AccordionMediaBaseProps = Pick<ListCellBaseProps, 'media'>;
export type AccordionTitleBaseProps = {
  /**
   * Title of the accordion item
   */
  title: string;
  /**
   * Subtitle of the accordion item
   */
  subtitle?: string;
};
export type AccordionIconBaseProps = Pick<CollapsibleBaseProps, 'collapsed'>;

export type AccordionCommonProps = {
  /**
   * Key of the accordion item.
   * This should be unique inside the same Accordion
   * unless you want multiple items to be controlled at the same time.
   */
  itemKey: string;
} & SharedProps;
