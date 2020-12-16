const path = require('path');

module.exports = {
  expandProps: 'end',
  // Wrap exported icon component in React.memo
  memo: true,
  replaceAttrValues: {
    '#1652F0': '{fill}',
    '#3453EB': '{fill}',
  },
  svgProps: {
    className: 'cds-icon',
    role: '{role}',
  },
  titleProp: true,
  svgo: true,
  prettier: true,
  typescript: true,
};
