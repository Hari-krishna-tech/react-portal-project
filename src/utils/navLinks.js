export const navLinks = [
    {
      name: 'Report Scheduler',
      route: '/reportscheduler',
      subItems: [
        { name: 'Jobs', route: '/reportscheduler/jobs' },
        { name: 'Create Jobs', route: '/reportscheduler/create-jobs' },
      ],
    },
    {
      name: 'Seasonal Information',
      route: '/seasonalinfo',
    },
    {
      name: 'User Recertification',
      route: '/userrecertification',
      subItems: [
        { name: 'Create Job', route: '/userrecertification/create-job' },
        { name: 'Show Jobs', route: '/userrecertification/show-jobs' },
      ],
    },
    {
      name: 'Outage',
      route: '/outage',
      subItems: [
        { name: 'Create', route: '/outage/create' },
        { name: 'List', route: '/outage/list' },
      ],
    },
  ];