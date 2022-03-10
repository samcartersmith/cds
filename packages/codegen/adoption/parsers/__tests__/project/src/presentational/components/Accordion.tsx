/* istanbul ignore file */
import * as React from 'react';
import { Accordion as MUIAccordion, AccordionProps } from '@material-ui/core';
import { styled } from 'linaria/react';

const StyledAccordion = styled(MUIAccordion)`
  background-color: transparent;

  &.Mui-expanded {
    margin: 0;
  }
`;

export const Accordion = (props: AccordionProps) => (
  <StyledAccordion elevation={0} {...props}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.children}
  </StyledAccordion>
);
