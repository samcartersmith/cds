import React from 'react';

import { PropsTable } from '../components/PropsTable';

import { mockData } from './mockData';

export const Basic = () => {
  return <PropsTable {...mockData} />;
};

export default {
  title: 'website/PropsTable',
  component: PropsTable,
};
