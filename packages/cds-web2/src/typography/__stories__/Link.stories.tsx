import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Link as RRLink } from 'react-router-dom';
import { noop } from '@cbhq/cds-utils';

import * as Type from '../index';
import { Link } from '../Link';

export const Default = () => (
  <div>
    <Link to="https://www.google.com/">Default</Link>
    <br />
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link onClick={noop}>As a button</Link>
  </div>
);

export const VariantBody = () => (
  <Link font="body" to="https://www.google.com/">
    Body
  </Link>
);

export const NegativeColor = () => (
  <div>
    <Link color="fgNegative" font="headline" to="https://www.google.com/">
      Negative
    </Link>
  </div>
);

export const NoUnderline = () => (
  <div>
    <Link to="https://www.google.com/" underline={false}>
      Default
    </Link>
    <br />
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link onClick={noop} underline={false}>
      As a button
    </Link>
    <br />
    <Link font="body" to="https://www.google.com/" underline={false}>
      Body
    </Link>
    <br />
    <Link color="fgNegative" font="headline" to="https://www.google.com/" underline={false}>
      Negative
    </Link>
  </div>
);

export const InAParagraph = () => (
  <div>
    <Type.TextBody as="p">
      This is a paragraph, and we can include inline links{' '}
      <Link to="https://www.coinbase.com">with underlines</Link> by default. You dont have to do
      anything to get them!
    </Type.TextBody>
    <Type.TextBody as="p">
      {`This one however... It is a paragraph, but we can still set underline="false" to opt out of
      the a11y support`}
      <Link to="https://www.coinbase.com" underline={false}>
        without underlines
      </Link>
      . But why? Please dont do this
    </Type.TextBody>
  </div>
);

export const InheritParentTextStyles = () => (
  <div>
    <Type.TextBody as="span">
      Go here: <Link to="https://www.coinbase.com">Inherited</Link>
    </Type.TextBody>
  </div>
);

export const DifferentTextStyle = () => (
  <div>
    <Type.TextBody as="span">
      Go here:{' '}
      <Link font="title3" to="https://www.coinbase.com">
        Title3
      </Link>
    </Type.TextBody>
  </div>
);

export const OpenWindowInExistingTab = () => (
  <div>
    <Link openInNewWindow font="title1" to="https://www.google.com/">
      Default
    </Link>
  </div>
);

export const SetsRelToNorefferer = () => (
  <div>
    <Link font="title2" rel="noreferrer" to="https://www.google.com/">
      Default
    </Link>
  </div>
);

export const SetsRelToNoopener = () => (
  <div>
    <Link font="title3" rel="noopener" to="https://www.google.com/">
      Default
    </Link>
  </div>
);

export const OnClick = () => (
  <div>
    <Link font="headline" onClick={noop} rel="noopener" to="#tagname">
      Link onClick
    </Link>
  </div>
);

const RenderContainerExample = (props: React.HTMLAttributes<HTMLAnchorElement>) => (
  <RRLink {...props} to="/invoices" />
);
export const RenderContainer = () => (
  <div>
    <Router>
      <Link
        color="fgPrimary"
        font="body"
        onClick={noop}
        renderContainer={RenderContainerExample}
        to="#tagname"
      >
        Test renderContainer
      </Link>
    </Router>
  </div>
);

export const RenderContainerColor = () => (
  <div>
    <Router>
      <Link
        color="fgNegative"
        font="label1"
        onClick={noop}
        renderContainer={RenderContainerExample}
        to="#tagname"
      >
        Test renderContainer
      </Link>
    </Router>
  </div>
);

export default {
  title: 'Core Components/Link',
  component: Link,
};
