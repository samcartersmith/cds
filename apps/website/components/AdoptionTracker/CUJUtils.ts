/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { useMemo } from 'react';

import { cujs } from '../../data/__generated__/adoption/cujs';

import { AdopterProjectInfo, AdopterStats, CUJSummaryReport } from './types';

export type ProjectProps = { id: string };
export type SummaryProps = { id: string };

// Get cuj projects by pillar
export const getCUJProjects = (pillar?: string) => {
  return cujs.filter((cuj) => cuj.pillar === pillar || !pillar);
};

// Get Total CUJ Summary Report
export const getCUJSummaryReport = () => {
  return require(`@site/static/data/__generated__/adoption/cuj/summary/cujSummaryReport.json`) as CUJSummaryReport;
};

// Get individual cuj stats for each project
export const getIndividualCUJStats = (project: ProjectProps) => {
  return require(`@site/static/data/__generated__/adoption/cuj/${project.id}/stats.json`) as AdopterStats;
};

// Get individual cuj info for each project
export const getIndividualCUJInfo = (project: ProjectProps) => {
  return require(`@site/static/data/__generated__/adoption/cuj/${project.id}/info.json`) as AdopterProjectInfo;
};

// Get summary cuj stats for each project
export const getSummaryCUJStats = (summary: ProjectProps) => {
  // summary is using coreUserJourneyConfig category id from config
  return require(`@site/static/data/__generated__/adoption/cuj/summary/${summary.id}/stats.json`) as AdopterStats;
};

export function useCUJProject(id: string) {
  const cujStats =
    require(`@site/static/data/__generated__/adoption/cuj/summary/${id}/stats.json`) as AdopterStats;
  return useMemo(() => ({ cujStats }), [cujStats]);
}
