import { DropdownPositionConfig } from '../types/PopoverMenuBaseProps';

/** this is a constant that comes from design: https://www.figma.com/file/DtFp2UPypfc5FSeFYsyKgZ/CDS-Select-Dropdown-%2B-Trays?node-id=37%3A12218 */
export const menuGutter = 4;

/** keys used to "select" or choose an option */
export const selectKeys = [' ', 'Spacebar', 'Enter'];

export const dropdownMaxHeight = 300;

export const defaultDropdownPositionConfig: DropdownPositionConfig = {
  offset: [0, menuGutter],
  placement: 'bottom-start',
};

export const sidebarMenuMinWidth = 240;
export const sidebarMenuMaxWidth = 327;
