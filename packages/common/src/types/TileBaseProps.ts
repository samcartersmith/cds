export type TileBaseProps = {
  title: string;
  /** Surfaces a DotCount around the content */
  count?: number;
  /** Reveals truncated title text */
  showOverflow?: boolean;
  children?: JSX.Element;
};
