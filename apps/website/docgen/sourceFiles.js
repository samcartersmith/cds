/**
 * A key:value pair, where the key is the sidebar item and the value is an array
 * of source files you want docgen to parse. This is useful when components are
 * cross-platform or have related sub-components/hooks which you want to consolidate
 * to a single page.
 */
module.exports = {
  accordion: ['accordion/Accordion.tsx', 'accordion/AccordionItem.tsx'],
  box: ['layout/Box.tsx', 'layout/HStack.tsx', 'layout/VStack.tsx', 'layout/Group.tsx'],
  button: [
    'buttons/Button.tsx',
    'buttons/ButtonGroup.tsx',
    'system/Pressable.tsx',
    'system/PressableOpacity.tsx',
  ],
  cell: [
    'cells/Cell.tsx',
    'cells/CellAccessory.tsx',
    'cells/CellDetail.tsx',
    'cells/CellMedia.tsx',
    'cells/ListCell.tsx',
    'cells/ListCellFallback.tsx',
    'cells/ContentCell.tsx',
    'cells/ContentCellFallback.tsx',
  ],
  checkbox: ['controls/Checkbox.tsx'],
  collapsible: ['collapsible/CollapseArrow.tsx', 'collapsible/Collapsible.tsx'],
  divider: ['layout/Divider.tsx'],
  dot: ['dots/DotCount.tsx', 'dots/DotStatusColor.tsx', 'dots/DotSymbol.tsx'],
  drawer: ['overlays/Drawer.tsx'],
  dropdown: ['dropdown/Dropdown.tsx'],
  skeleton: ['layout/Fallback.tsx'],
  iconButton: ['buttons/IconButton.tsx', 'buttons/NavigationIconButton.tsx'],
  illustration: [
    'illustrations/HeroSquare.tsx',
    'illustrations/Pictogram.tsx',
    'illustrations/SpotSquare.tsx',
    'illustrations/SpotRectangle.tsx',
  ],
  input: [
    'controls/InputIcon.tsx',
    'controls/InputIconButton.tsx',
    'controls/InputLabel.tsx',
    'controls/InputStack.tsx',
    'controls/NativeInput.tsx',
    'controls/NativeTextArea.tsx',
    'controls/TextInput.tsx',
    'controls/HelperText.tsx',
  ],
  navigation: [
    'navigation/NavLink.tsx',
    'navigation/NavigationBar.tsx',
    'navigation/NavigationTitle.tsx',
    'navigation/Sidebar.tsx',
    'navigation/SidebarItem.tsx',
  ],
  link: ['typography/Link.tsx'],
  lottie: [
    'animation/Lottie.tsx',
    'animation/LottieStatusAnimation.tsx',
    'animation/useLottie.ts',
    'animation/useLottieColorFilters.ts',
  ],
  logos: [
    'icons/LogoMark.tsx',
    'icons/LogoWordmark.tsx',
    'icons/SubBrandLogoMark.tsx',
    'icons/SubBrandLogoWordmark.tsx',
    'hooks/useSubBrandLogo.ts',
    'hooks/useLogo.ts',
  ],
  modal: [
    'overlays/Modal/Modal.tsx',
    'overlays/Modal/ModalHeader.tsx',
    'overlays/Modal/ModalBody.tsx',
    'overlays/Modal/ModalFooter.tsx',
    'overlays/Modal/FullscreenModal.tsx',
    'overlays/useModal.ts',
  ],
  searchInput: ['controls/SearchInput.tsx'],
  sparkline: [
    'visualizations/Sparkline.tsx',
    'visualizations/SparklineInteractive.tsx',
    'visualizations/SparklineInteractiveHeader.tsx',
    'visualizations/useSparklinePath.ts',
    'visualizations/useSparklineArea.ts',
    'visualizations/useSparklineCoordinates.ts',
  ],
};
