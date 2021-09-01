import * as React from 'react';
import PresentationalTestDefaultExport, {TestPresentationAttribute} from './PresentationalTestDefaultExport';

export const CustomSvg1 = ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>;

export function CustomSvg2({ children }: { children: React.ReactNode }) {
  const a = 2;

  return <svg>{children}</svg>;
}

export const TestComponentSvg = () => (
  <>
    <CustomSvg1>Test</CustomSvg1>
    <CustomSvg2>Test</CustomSvg2>
    <PresentationalTestDefaultExport>Test</PresentationalTestDefaultExport>
    <TestPresentationAttribute>Test</TestPresentationAttribute>
  </>
);
