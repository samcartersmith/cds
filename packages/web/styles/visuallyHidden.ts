import { css } from 'linaria';

export const visuallyHidden = css`
  border: 0;
  clip: rect(0px, 0px, 0px, 0px);
  clippath: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);
  display: block;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  visibility: visible;
  whitespace: nowrap;
  width: 1px;
`;
