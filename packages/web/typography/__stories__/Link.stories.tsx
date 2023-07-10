import { HTMLAttributes } from 'react';
import { BrowserRouter as Router, Link as RRLink } from 'react-router-dom';

import * as Type from '../index';
import { Link } from '../Link';

const onClick = console.log;

export const Default = () => (
  <div>
    <Link to="https://www.google.com/">Default</Link>
    <br />
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link onClick={onClick}>As a button</Link>
  </div>
);

export const VariantBody = () => (
  <Link variant="body" to="https://www.google.com/">
    Body
  </Link>
);

export const NegativeColor = () => (
  <div>
    <Link variant="headline" to="https://www.google.com/" color="negative">
      Negative
    </Link>
  </div>
);

export const Underline = () => (
  <div>
    <Link underline to="https://www.google.com/">
      Default
    </Link>
    <br />
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link underline onClick={onClick}>
      As a button
    </Link>
    <br />
    <Link underline variant="body" to="https://www.google.com/">
      Body
    </Link>
    <br />
    <Link underline variant="headline" to="https://www.google.com/" color="negative">
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
      <Link variant="title3" to="https://www.coinbase.com">
        Title3
      </Link>
    </Type.TextBody>
  </div>
);

export const OpenWindowInExistingTab = () => (
  <div>
    <Link variant="title1" to="https://www.google.com/" openInNewWindow>
      Default
    </Link>
  </div>
);

export const SetsRelToNorefferer = () => (
  <div>
    <Link variant="title2" to="https://www.google.com/" rel="noreferrer">
      Default
    </Link>
  </div>
);

export const SetsRelToNoopener = () => (
  <div>
    <Link variant="title3" to="https://www.google.com/" rel="noopener">
      Default
    </Link>
  </div>
);

export const OnClick = () => (
  <div>
    <Link variant="headline" to="#tagname" onPress={onClick} rel="noopener">
      Link onClick
    </Link>
  </div>
);

const RenderContainerExample = (props: HTMLAttributes<HTMLAnchorElement>) => (
  <RRLink {...props} to="/invoices" />
);
export const RenderContainer = () => (
  <div>
    <Router>
      <Link
        variant="body"
        to="#tagname"
        color="primary"
        onPress={onClick}
        renderContainer={RenderContainerExample}
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
        variant="label1"
        to="#tagname"
        color="negative"
        onPress={onClick}
        renderContainer={RenderContainerExample}
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
