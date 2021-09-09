// @ts-ignore

import * as React from 'react';

// @ts-ignore
import { Modal } from '@test/frontend/presentational/components';
// @ts-ignore
import { NavigationControl } from '@test/frontend/presentational/components/NavigationControl';
import { styled } from 'linaria/react';
import { Table, TableCell } from '@material-ui/core';
// @ts-ignore
import { Accordion } from '@test/frontend/presentational/components/Accordion';
import PresentationalTestDefaultExport, {
  TestPresentationAttribute,
} from './PresentationalTestDefaultExport';

export const CustomSvg1 = ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>;

// not a presentation component
export const CustomDiv = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export function CustomSvg2({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = 2;

  return <svg>{children}</svg>;
}

export const CustomSvg3 = React.memo(({ children }: { children: React.ReactNode }) => (
  <svg>{children}</svg>
));

export const CustomSvg4 = React.memo(({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = 1;

  return <svg>{children}</svg>;
});

export const CustomSvg5 = React.memo(({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = 1;

  return <svg>{children}</svg>;
});

const StyledCell = styled(TableCell)``;

const StyledTable = styled(Table)`
  border-color: red;
  background-color: red;
  border-radius: 12px;
`;

const StyledDiv = styled.div`
  background-color: red;
`;

export const TestComponentSvg = () => (
  <div>
    <CustomSvg1>Test</CustomSvg1>
    <CustomSvg2>Test</CustomSvg2>
    <CustomSvg3>Test</CustomSvg3>
    <CustomSvg4>Test</CustomSvg4>
    <CustomSvg5>Test</CustomSvg5>
    <CustomDiv>Test</CustomDiv>
    <PresentationalTestDefaultExport>Test</PresentationalTestDefaultExport>
    <TestPresentationAttribute>Test</TestPresentationAttribute>
    <Modal open={false}>
      <span>Test</span>
    </Modal>
    <TestPresentationAttribute>Test</TestPresentationAttribute>
    <TestPresentationAttribute>Test</TestPresentationAttribute>
    <NavigationControl />
    <TableCell />
    <StyledCell />
    <StyledTable />
    <Accordion>
      <div>Test</div>
    </Accordion>
    <StyledDiv>
      <div>abd</div>
    </StyledDiv>
  </div>
);
