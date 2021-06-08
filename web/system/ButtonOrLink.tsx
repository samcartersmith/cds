import { Button } from 'reakit/Button';

export const ButtonOrLink = ({
  href,
  rel,
  target,
  type = 'button',
  ...props
}: React.AllHTMLAttributes<HTMLElement>) => {
  if (href) {
    return (
      <Button
        {...props}
        as="a"
        href={href}
        rel={!rel && target === '_blank' ? 'noopener noreferrer' : rel}
        target={target}
      />
    );
  }

  return <Button {...props} as="button" type={type as 'button'} />;
};
