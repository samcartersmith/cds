import { Button } from '@cbhq/cds-web/buttons/Button';
import { ButtonGroup } from '@cbhq/cds-web/buttons';

const variants = ['primary', 'secondary', 'positive', 'negative'] as const;

export const ButtonSheet = () => {
  return (
    <ButtonGroup accessibilityLabel="button group" block>
      {variants.map((item) => (
        <Button key={item} variant={item}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </ButtonGroup>
  );
};
