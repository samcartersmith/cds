import { useTooltip, UseTooltipParams } from './useTooltip';

interface TooltipProps extends UseTooltipParams {
  children: (
    props: React.HTMLAttributes<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.RefObject<any>
  ) => React.ReactNode;
}

export const Tooltip = ({ children, ...props }: TooltipProps) => {
  const { tooltipProps, tooltipRef, tooltip } = useTooltip(props);

  return (
    <>
      {children(tooltipProps, tooltipRef)}
      {tooltip}
    </>
  );
};
