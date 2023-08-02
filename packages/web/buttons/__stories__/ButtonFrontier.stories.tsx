import { buttonBuilder } from '@cbhq/cds-common/internal/buttonBuilder';

import { Box } from '../../layout/Box';
import { Button } from '../Button';

const { build, buildSheet } = buttonBuilder(Button, { args: { frontier: true } });

export const Default = build();
export const All = buildSheet([
  { variant: 'secondary' },
  { variant: 'positive' },
  { variant: 'negative' },
  { block: true },
  { compact: true },
  { transparent: true },
  { disabled: true },
  { startIcon: 'backArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', block: true },
  { transparent: true, flush: 'start', compact: true, endIcon: 'forwardArrow' },
  { transparent: true, flush: 'end', compact: true, endIcon: 'forwardArrow' },
  { target: '_blank', href: 'https://coinbase.com' },
  { flush: 'start', compact: true, endIcon: 'forwardArrow' },
  { flush: 'end', compact: true, endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', compact: true },
  { startIcon: 'backArrow', compact: true },
  { endIcon: 'forwardArrow', compact: true },
]);

export const numberOfLines = build(
  {
    numberOfLines: 2,
    // @ts-expect-error We exclude children prop from types in storybuilder so that we don't have to repeat for each story, but we want to override for this use case.
    children:
      'Some really really really long button text that should get truncated after wrapping two lines',
  },
  {
    args: { frontier: true },
    parameters: { wrapper: Box, wrapperProps: { width: 300, spacing: 3 } },
  },
);

const ButtonBaseline = (props: JSX.IntrinsicElements['button']) => (
  <button type="button" {...props}>
    HTML button
  </button>
);

export const HtmlButton = buttonBuilder(ButtonBaseline).build({});

export default {
  title: 'Core Components/Buttons/Button (Frontier)',
  component: Button,
};
