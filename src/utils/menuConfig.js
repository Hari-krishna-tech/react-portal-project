import { lazy } from 'react';

export const menuItems = [
  {
    name: 'Report Scheduler',
    route: '/reportscheduler',
    component: lazy(() => import('../components/dashboard/reportScheduler/ReportSchedulerLayout')),
    subItems: [
      { name: 'Jobs', route: '/reportscheduler/jobs' },
      { name: 'Create Jobs', route: '/reportscheduler/create-jobs' },
      { name: 'Update Job', route: '/reportscheduler/update-job/:id' },
    ],
  },
  {
    name: 'Seasonal Information',
    route: '/seasonalinfo',
    component: lazy(() => import('../components/dashboard/seasonalInformation/SeasonalInformationLayout')),
    subItems: [
      { name: 'List Seasonal Information', route: '/seasonalinfo/list' },
      { name: 'Seasonal Information Logs', route: '/seasonalinfo/logs' }
    ],
  },
  {
    name: 'User Recertification',
    route: '/userrecertification',
    component: lazy(() => import('../components/dashboard/userRecertification/UserRecertification')),
    subItems: [
      { name: 'Create Job', route: '/userrecertification/create-job' },
      { name: 'Show Jobs', route: '/userrecertification/show-jobs' },
    ],
  },
  {
    name: 'Outage',
    route: '/outage',
    component: lazy(() => import('../components/dashboard/outage/Outage')),
    subItems: [
      { name: 'Create', route: '/outage/create' },
      { name: 'List', route: '/outage/list' },
    ],
  }, 
  {
    name: 'Settings',
    route: '/settings',
    component: lazy(() => import('../components/dashboard/settings/SettingLayout')),
    subItems: [
      { name: 'Database Settings', route: '/settings/database-settings' },
      { name: 'Database Settings List', route: '/settings/database-settings/list' },
      { name: 'Update Database Settings', route: '/settings/update-database-settings/:id' },
      
    ],
  },
];