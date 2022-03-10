import { palette } from '@cbhq/cds-web/tokens';

type ColorTileProps = { color: string; size: number };

export const ColorTile = ({ color, size }: ColorTileProps) => {
  const styles = {
    background: color,
    height: size,
    width: size,
    border: `1px solid ${palette.lineHeavy}`,
  };
  return <div style={styles} />;
};
