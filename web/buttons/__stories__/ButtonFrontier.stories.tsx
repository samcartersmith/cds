import { buttonBuilder } from '@cbhq/cds-common/internal/buttonBuilder';

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
]);

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
