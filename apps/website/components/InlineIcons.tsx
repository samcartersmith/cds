import { Icon } from '@cbhq/cds-web/icons/Icon';
import { IconProps } from '@cbhq/cds-web/icons/IconProps';

export const InlineIcon = ({ size = 's', ...props }: IconProps) => {
  const style: React.CSSProperties = {
    display: 'inline-flex',
  };

  return (
    <div style={style}>
      <Icon size={size} {...props} />
    </div>
  );
};

export const UnknownIcon = ({ size = 'xs' }: Pick<IconProps, 'size'>) => {
  return <InlineIcon name="unknown" size={size} />;
};
