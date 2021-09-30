import { Icon } from '@cbhq/cds-web/icons/Icon';
import { IconSize } from '@cbhq/cds-common';

export const UnknownIcon = (props: { size: IconSize }) => {
  const style: React.CSSProperties = {
    display: 'inline-flex',
  };

  return (
    <div style={style}>
      <Icon name="unknown" size={props.size ?? 'xs'} />
    </div>
  );
};
