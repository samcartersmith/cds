import { BrowserRouter as Router, Link as RRLink } from 'react-router-dom';

import * as Type from '../index';
import { Link } from '../Link';

const onClick = console.log;

export const Default = () => (
  <div>
    <Link to="https://www.google.com/">Default</Link>
    <br />
    <Link onClick={onClick}>As a button</Link>
  </div>
);

export const VariantBody = () => (
  <Link to="https://www.google.com/" variant="body">
    Body
  </Link>
);

export const NegativeColor = () => (
  <div>
    <Link color="negative" to="https://www.google.com/" variant="headline">
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
    <Link underline onClick={onClick}>
      As a button
    </Link>
    <br />
    <Link underline to="https://www.google.com/" variant="body">
      Body
    </Link>
    <br />
    <Link underline color="negative" to="https://www.google.com/" variant="headline">
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
      <Link to="https://www.coinbase.com" variant="title3">
        Title3
      </Link>
    </Type.TextBody>
  </div>
);

export const OpenWindowInExistingTab = () => (
  <div>
    <Link openInNewWindow to="https://www.google.com/" variant="title1">
      Default
    </Link>
  </div>
);

export const SetsRelToNorefferer = () => (
  <div>
    <Link rel="noreferrer" to="https://www.google.com/" variant="title2">
      Default
    </Link>
  </div>
);

export const SetsRelToNoopener = () => (
  <div>
    <Link rel="noopener" to="https://www.google.com/" variant="title3">
      Default
    </Link>
  </div>
);

export const OnClick = () => (
  <div>
    <Link onPress={onClick} rel="noopener" to="#tagname" variant="headline">
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
        color="primary"
        onPress={onClick}
        renderContainer={RenderContainerExample}
        to="#tagname"
        variant="body"
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
        color="negative"
        onPress={onClick}
        renderContainer={RenderContainerExample}
        to="#tagname"
        variant="label1"
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
