import { ReactNode, ReactElement } from 'react';
import { ListCellBaseProps } from './CellBaseProps';

export type AccordionBaseProps = {
  /**
   * Default active accordion item key
   * If not specified or doesn't exist in the accordion items,
   * all items will be closed on mount
   */
  defaultActiveKey?: string | undefined;
  /**
   * Callback function fired when any of accordion items is pressed
   */
  onItemPress?: (key: string) => void;
  children: ReactElement<AccordionItemBaseProps>[];
};

export type AccordionItemBaseProps = Omit<
  AccordionHeaderBaseProps & AccordionPanelBaseProps,
  'expanded'
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

export type AccordionPanelBaseProps = {
  /**
   * Content of the accordion item
   */
  children: ReactNode;
} & AccordionCommonProps;

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
export type AccordionIconBaseProps = Pick<AccordionCommonProps, 'expanded'>;

export type AccordionCommonProps = {
  /**
   * Key of the accordion item.
   * This should be unique inside the same Accordion
   * unless you want multiple items to be controlled at the same time.
   */
  itemKey: string;
  /**
   * Expand/collapse state of the accordion item.
   * @default false
   */
  expanded: boolean;
};
