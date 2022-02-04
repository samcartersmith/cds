import { IconSize } from '@cbhq/cds-common';
import { Icon } from '@cbhq/cds-web/icons/Icon';

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
