import { lazy } from 'react';

export const menuItems = [
  {
    name: 'Report Scheduler',
    route: '/reportscheduler',
    component: lazy(() => import('../components/dashboard/ReportScheduler')),
    subItems: [
      { name: 'Jobs', route: '/reportscheduler/jobs' },
      { name: 'Create Jobs', route: '/reportscheduler/create-jobs' },
    ],
  },
  {
    name: 'Seasonal Information',
    route: '/seasonalinfo',
    component: lazy(() => import('../components/dashboard/SeasonalInformation')),
  },
  {
    name: 'User Recertification',
    route: '/userrecertification',
    component: lazy(() => import('../components/dashboard/UserRecertification')),
    subItems: [
      { name: 'Create Job', route: '/userrecertification/create-job' },
      { name: 'Show Jobs', route: '/userrecertification/show-jobs' },
    ],
  },
  {
    name: 'Outage',
    route: '/outage',
    component: lazy(() => import('../components/dashboard/Outage')),
    subItems: [
      { name: 'Create', route: '/outage/create' },
      { name: 'List', route: '/outage/list' },
    ],
  },
];