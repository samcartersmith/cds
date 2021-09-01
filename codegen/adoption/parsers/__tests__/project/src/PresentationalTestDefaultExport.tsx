import * as React from 'react';

export default ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>;

export const TestPresentationAttribute = ({ children }: { children: React.ReactNode }) => <div className="abc">{children}</div>;
