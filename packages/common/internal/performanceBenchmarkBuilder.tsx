import React from 'react';

export function performanceBenchmarkBuilder(
  CDSComponent: React.ComponentType<unknown>,
  HTMLComponent: React.ComponentType<unknown>,
) {
  function generateHTMLComponent(n: number) {
    const divs = [];

    for (let i = 0; i < n; i += 1) {
      divs.push(<HTMLComponent key={i} />);
    }

    return divs;
  }

  function generateComponents(n: number) {
    const components = [];

    for (let i = 0; i < n; i += 1) {
      components.push(<CDSComponent key={i} />);
    }

    return components;
  }

  const HundredCDSComponents = () => {
    return generateComponents(100);
  };

  const HundredHTMLComponent = () => {
    return generateHTMLComponent(100);
  };

  const ThousandCDSComponents = () => {
    return generateComponents(1000);
  };

  const ThousandHTMLComponent = () => {
    return generateHTMLComponent(1000);
  };

  return {
    HundredCDSComponents,
    HundredHTMLComponent,
    ThousandCDSComponents,
    ThousandHTMLComponent,
  };
}
