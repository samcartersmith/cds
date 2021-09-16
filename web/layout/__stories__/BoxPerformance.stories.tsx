import { Box } from '@cbhq/cds-web/layout';
import { withPerformance } from 'storybook-addon-performance';

export default {
  component: Box,
  title: 'Core Components/Box/Performance',
  decorators: [withPerformance],
};

export const SingleBox = () => (
  <Box alignItems="center" justifyContent="space-between">
    <div>Left</div>
    <div>Right</div>
  </Box>
);

export const SingleDiv = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div>Left</div>
    <div>Right</div>
  </div>
);

function generateDivs(n: number) {
  const divs = [];

  for (let i = 0; i < n; i += 1) {
    divs.push(<SingleDiv key={i} />);
  }

  return <>{divs}</>;
}

function generateBoxes(n: number) {
  const boxes = [];

  for (let i = 0; i < n; i += 1) {
    boxes.push(<SingleBox key={i} />);
  }

  return <>{boxes}</>;
}

export const HundredBoxes = () => {
  return generateBoxes(100);
};

export const HundredDivs = () => {
  return generateDivs(100);
};

export const ThousandBoxes = () => {
  return generateBoxes(1000);
};

export const ThousandDivs = () => {
  return generateDivs(1000);
};
